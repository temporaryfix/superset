import { expect, test } from "bun:test";
import path from "node:path";

const cwd = path.resolve(import.meta.dir, "../..");
const cases = [
	{ key: undefined, enabled: false, flag: true },
	{ key: "", enabled: false, flag: true },
	{ key: "build", enabled: false, flag: true },
	{ key: "unused", enabled: false, flag: true },
	{ key: "phc_local_dev_disabled", enabled: false, flag: true },
	{ key: "phc_test_configured", enabled: true, flag: true },
	{ key: "phc_test_configured", enabled: true, flag: false },
] as const;

for (const { key, enabled, flag } of cases) {
	test(`all cloud consumers honor analytics capability ${String(key)} and flag ${flag}`, () => {
		const script = `
import {mock} from "bun:test";
import assert from "node:assert/strict";
import path from "node:path";
import React from "react";
import {renderToString} from ${JSON.stringify(path.resolve(cwd, "../desktop/node_modules/react-dom/server"))};
const query = await import("@tanstack/react-query");
const realUseQuery=query.useQuery;
const queryEnabled=[],fetchStatuses=[],sdkCalls=[],warnings=[];
let requests=0;
globalThis.fetch=async()=>{throw Error("Cloud hook fixture network denied")};
console.warn=(...args)=>warnings.push(args);
const sdkFeatureFlag=(name)=>{sdkCalls.push(name);return ${flag}};
mock.module("posthog-react-native",()=>({useFeatureFlag:sdkFeatureFlag,usePostHog:()=>({})}));
mock.module(path.resolve("lib/env.ts"),()=>({env:{EXPO_PUBLIC_POSTHOG_KEY:${JSON.stringify(key)}}}));
mock.module(path.resolve("lib/posthog/client.ts"),()=>({posthog:{capture:()=>{}}}));
mock.module(path.resolve("lib/auth/client.ts"),()=>({useSession:()=>({data:{session:{activeOrganizationId:"owned-fixture-org"}}})}));
const queryCall=async()=>{requests++;return []};
mock.module(path.resolve("lib/trpc/client.ts"),()=>({apiClient:{environment:{list:{query:queryCall}},cloudWorkspace:{list:{query:queryCall},repositories:{query:queryCall}}}}));
mock.module(path.resolve("lib/realtime/index.ts"),()=>({useRealtimeConnected:()=>true}));
mock.module(path.resolve("lib/sandbox-access/index.ts"),()=>({pruneSandboxAccess:()=>{}}));
mock.module(path.resolve("hooks/useOrgHosts/index.ts"),()=>({useOrgHosts:()=>({query:{isSuccess:true,data:[]}})}));
mock.module(path.resolve("screens/(authenticated)/(home)/home/stores/workspacesFilterStore/index.ts"),()=>({useWorkspacesFilterStore:(select)=>select({scope:"host"})}));
mock.module("@tanstack/react-query",()=>({...query,useQuery:(options)=>{queryEnabled.push(options.enabled);const result=realUseQuery(options);fetchStatuses.push(result.fetchStatus);return result}}));
const hooks=await import(path.resolve("lib/posthog/hooks.ts"));
assert.equal(hooks.useFeatureFlag===sdkFeatureFlag,${enabled});
const {useArchivedCloudWorkspaces}=await import(path.resolve("hooks/useArchivedCloudWorkspaces/useArchivedCloudWorkspaces.ts"));
const {useCloudEnvironments}=await import(path.resolve("hooks/useCloudEnvironments/useCloudEnvironments.ts"));
const {useCloudWorkspaces}=await import(path.resolve("hooks/useCloudWorkspaces/useCloudWorkspaces.ts"));
const {useCloudRepos}=await import(path.resolve("screens/(authenticated)/(home)/home/hooks/useCloudRepos/useCloudRepos.ts"));
const {useWorkspaceScope}=await import(path.resolve("screens/(authenticated)/(home)/hooks/useWorkspaceScope/useWorkspaceScope.ts"));
function Probe(){
 const environments=useCloudEnvironments();
 const workspaces=useCloudWorkspaces();
 const archived=useArchivedCloudWorkspaces();
 const repos=useCloudRepos();
 const scope=useWorkspaceScope();
 assert.deepEqual(workspaces.workspaces,[]);assert.deepEqual(archived.workspaces,[]);assert.equal(repos.size,0);
 assert.equal(environments.fetchStatus,${JSON.stringify(enabled && flag ? "fetching" : "idle")});
 return React.createElement("span",null,scope);
}
const client=new query.QueryClient();
assert.equal(renderToString(React.createElement(query.QueryClientProvider,{client},React.createElement(Probe))),${JSON.stringify(`<span>${enabled && flag ? "cloud" : "host"}</span>`)});
assert.deepEqual(queryEnabled,[${Array(4)
			.fill(enabled && flag)
			.join(",")}]);
assert.deepEqual(fetchStatuses,Array(4).fill(${JSON.stringify(enabled && flag ? "fetching" : "idle")}));
assert.equal(sdkCalls.length,${enabled ? 5 : 0});
assert.equal(requests,0);assert.deepEqual(warnings,[]);
client.clear();
`;
		const result = Bun.spawnSync(
			[process.execPath, "--no-env-file", "-e", script],
			{
				cwd,
				env: { PATH: process.env.PATH, NODE_ENV: "test" },
				stdout: "pipe",
				stderr: "pipe",
				timeout: 5000,
			},
		);
		expect(result.stderr.toString()).toBe("");
		expect(result.exitCode).toBe(0);
	});
}
