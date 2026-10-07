import { expect, test } from "bun:test";
import {
	mobileAuthProviders,
	optionalAuthProviders,
} from "./optional-auth-providers";

test("optional sign-in buttons stay absent by default", () => {
	expect(optionalAuthProviders()).toEqual([]);
});
test("operator flags expose only registered extension names", () => {
	expect(
		optionalAuthProviders("github,gitlab,authentik,invalid,gitlab"),
	).toEqual(["gitlab", "authentik"]);
});

for (const value of [undefined, "", "  "]) {
	test(`mobile hosted defaults for ${JSON.stringify(value)}`, () => {
		expect(mobileAuthProviders(value)).toEqual(["apple", "github", "google"]);
	});
}
test("mobile provider capabilities accept only registered providers", () => {
	expect(mobileAuthProviders("unknown,unregistered")).toEqual([]);
	expect(mobileAuthProviders("gitlab")).toEqual(["gitlab"]);
	expect(mobileAuthProviders("authentik")).toEqual(["authentik"]);
	expect(mobileAuthProviders("google,authentik,google,unknown")).toEqual([
		"google",
		"authentik",
	]);
	expect(
		mobileAuthProviders(" GITHUB, gitlab, APPLE, google, Authentik, gitlab "),
	).toEqual(["apple", "github", "google", "gitlab", "authentik"]);
	expect(
		mobileAuthProviders(" GOOGLE, gitlab, google, APPLE, github "),
	).toEqual(["apple", "github", "google", "gitlab"]);
});
