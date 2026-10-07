import { expect, test } from "bun:test";
import { FEATURE_FLAGS } from "@superset/shared/constants";
import { mobileCloudFixture, runMobileM2Child } from "./testFixture.test";

if (process.env.TEST_MOBILE_M2 !== "1") {
	for (const [key, flag] of [
		[undefined, "true"],
		["", "true"],
		["build", "true"],
		["unused", "true"],
		["phc_local_dev_disabled", "true"],
		["phc_mobile_fixture", "true"],
		["phc_mobile_fixture", "false"],
		["phc_mobile_fixture", "unknown"],
	] as const) {
		test(`cloud selection honors analytics key ${String(key)} and flag ${flag}`, () =>
			runMobileM2Child(import.meta.path, {
				...(key === undefined ? {} : { TEST_MOBILE_ANALYTICS_KEY: key }),
				TEST_MOBILE_CLOUD_FLAG: flag,
			}));
	}
} else {
	const key = process.env.TEST_MOBILE_ANALYTICS_KEY;
	const configured = key === "phc_mobile_fixture";
	const flag = process.env.TEST_MOBILE_CLOUD_FLAG;
	const enabled = configured && flag === "true";
	const f = await mobileCloudFixture({ analyticsKey: key });
	f.featureFlags.cloudEnabled =
		flag === "unknown" ? undefined : flag === "true";
	let output: ReturnType<typeof f.selection.useCloudCreateSelection>;
	function Probe() {
		output = f.selection.useCloudCreateSelection();
		return null;
	}
	test("actual quiet wrapper controls requests and native readiness", async () => {
		const warnings: unknown[] = [];
		const originalWarn = console.warn;
		console.warn = (...args: unknown[]) => warnings.push(args);
		try {
			await f.render(Probe);
			expect(output.gitlab).toEqual(
				enabled
					? {
							...f.project,
							organizationId: "org-a",
							environmentId: "environment-a",
						}
					: null,
			);
			expect(
				f.state.requests.filter((r) => r.method === "environments"),
			).toHaveLength(enabled ? 1 : 0);
			if (configured) {
				expect(f.featureFlags.reads.length).toBeGreaterThan(0);
				expect(new Set(f.featureFlags.reads)).toEqual(
					new Set([FEATURE_FLAGS.CLOUD_WORKSPACES]),
				);
			} else {
				expect(f.featureFlags.reads).toEqual([]);
			}
			expect(warnings).toEqual([]);
		} finally {
			console.warn = originalWarn;
			await f.cleanup();
		}
	});
}
