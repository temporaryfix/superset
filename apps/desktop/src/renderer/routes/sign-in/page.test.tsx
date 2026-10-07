import { expect, test } from "bun:test";

test("configured desktop GitLab and Authentik actions retain last-used state across remounts", () => {
	const cwd = new URL("../../../../", import.meta.url).pathname;
	const source = (path: string) =>
		JSON.stringify(new URL(path, import.meta.url).pathname);
	const script = `
import {mock} from "bun:test";
import assert from "node:assert/strict";
import {GlobalRegistrator} from "@happy-dom/global-registrator";
GlobalRegistrator.register();
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
globalThis.fetch=Object.assign(async()=>{throw Error("Unexpected auth fixture network")},{preconnect:()=>{}});
const React=await import("react");
const {render,fireEvent,cleanup}=await import("@testing-library/react");
const environment={NODE_ENV:"production",NEXT_PUBLIC_AUTH_PROVIDERS:"gitlab,authentik",SKIP_ENV_VALIDATION:false};
const calls=[];
mock.module("@lingui/react/macro",()=>({Trans:({children})=>children}));
mock.module("@tanstack/react-router",()=>({createFileRoute:()=>options=>({options}),useNavigate:()=>async()=>{},useRouter:()=>({})}));
mock.module(${source("../../../../src/renderer/env.renderer.ts")},()=>({env:environment}));
mock.module(${source("../../../../src/renderer/lib/auth-client.ts")},()=>({setAuthToken:()=>{}}));
mock.module(${source("../../../../src/renderer/lib/electron-trpc.ts")},()=>({electronTrpc:{auth:{signIn:{useMutation:()=>({isPending:false,mutate:input=>calls.push(input)})},persistToken:{useMutation:()=>({mutateAsync:async()=>{}})}}}}));
mock.module(${source("../../../../src/renderer/lib/analytics.ts")},()=>({track:()=>{}}));
mock.module(${source("./hooks/useSessionRecovery/index.ts")},()=>({useSessionRecovery:()=>({hasLocalToken:false,isPending:false,session:null})}));
const {Route}=await import(${source("./page.tsx")});
for(const value of ["authentik","gitlab","github","unsupported"]){
 window.localStorage.setItem("superset-last-auth-method",value);
 const view=render(React.createElement(Route.options.component));
 for(const provider of ["authentik","gitlab"]){const button=view.getByText(provider==="gitlab"?"Continue with GitLab":"Continue with Authentik").closest("button");assert.ok(button);assert.equal(button.textContent.includes("Last used"),value===provider);}
 assert.equal(view.queryAllByText("Last used").length,value==="unsupported"?0:1);
 cleanup();
}
for(const provider of ["gitlab","authentik"]){
 window.localStorage.removeItem("superset-last-auth-method");
 const view=render(React.createElement(Route.options.component));fireEvent.click(view.getByText(provider==="gitlab"?"Continue with GitLab":"Continue with Authentik"));
 assert.deepEqual(calls.pop(),{provider});assert.equal(window.localStorage.getItem("superset-last-auth-method"),provider);cleanup();
 const remount=render(React.createElement(Route.options.component));assert.ok(remount.getByText(provider==="gitlab"?"Continue with GitLab":"Continue with Authentik").closest("button").textContent.includes("Last used"));cleanup();
}
for(const flags of [undefined,"","unknown","gitlab","authentik","authentik,gitlab"]){
 environment.NEXT_PUBLIC_AUTH_PROVIDERS=flags;
 const view=render(React.createElement(Route.options.component));
 assert.equal(!!view.queryByText("Continue with GitLab"),!!flags?.includes("gitlab"));assert.equal(!!view.queryByText("Continue with Authentik"),!!flags?.includes("authentik"));
 assert.ok(view.getByText("Continue with GitHub"));assert.ok(view.getByText("Continue with Google"));cleanup();
}
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
