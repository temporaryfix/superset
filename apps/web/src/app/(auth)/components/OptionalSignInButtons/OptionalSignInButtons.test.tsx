import { expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";

test("actual optional web buttons retain provider gates, transport and resolved-error handling", () => {
	const cwd = mkdtempSync("/tmp/superset-combined-web-auth-");
	const component = JSON.stringify(
		new URL("./OptionalSignInButtons.tsx", import.meta.url).pathname,
	);
	const environment = JSON.stringify(
		new URL("../../../../env.ts", import.meta.url).pathname,
	);
	const script = `
import {mock} from "bun:test";
import assert from "node:assert/strict";
import React from ${JSON.stringify(import.meta.resolve("react"))};
import {renderToStaticMarkup} from ${JSON.stringify(import.meta.resolve("react-dom/server"))};
globalThis.fetch=Object.assign(async()=>{throw Error("Unexpected auth fixture network")},{preconnect:()=>{}});
const environment={NEXT_PUBLIC_AUTH_PROVIDERS:"gitlab,authentik"};
const calls=[];let refused=false;let rejected=false;
const send=async(method,input)=>{calls.push({method,input});if(rejected)throw Error("Fixture network refusal");return refused?{error:{message:"Fixture refusal"}}:{error:null};};
mock.module("@superset/auth/client",()=>({authClient:{signIn:{social:input=>send("social",input),oauth2:input=>send("oauth2",input)}}}));
mock.module("@lingui/react/macro",()=>({Trans:({children})=>children,useLingui:()=>({t:({message})=>message})}));
mock.module(${environment},()=>({env:environment}));
const {OptionalSignInButtons}=await import(${component});
const pending=[];const errors=[];const props={callbackURL:"https://web.fixture.test/after-auth",disabled:false,onPending:value=>pending.push(value),onError:value=>errors.push(value)};
for(const flags of [undefined,"","unknown","gitlab","authentik","authentik,gitlab"]){
 environment.NEXT_PUBLIC_AUTH_PROVIDERS=flags;const buttons=OptionalSignInButtons(props);const html=renderToStaticMarkup(React.createElement(React.Fragment,null,...buttons));
 assert.equal(html.includes("Continue with GitLab"),!!flags?.includes("gitlab"));assert.equal(html.includes("Continue with Authentik"),!!flags?.includes("authentik"));
}
environment.NEXT_PUBLIC_AUTH_PROVIDERS="authentik,gitlab";
for(const provider of ["gitlab","authentik"]){
 const button=OptionalSignInButtons(props).find(button=>button.key===provider);assert.ok(button);await button.props.onClick();
 assert.deepEqual(calls.pop(),{method:provider==="gitlab"?"social":"oauth2",input:provider==="gitlab"?{provider,callbackURL:props.callbackURL}:{providerId:provider,callbackURL:props.callbackURL}});assert.equal(pending.pop(),true);assert.equal(errors.pop(),null);
 for(const kind of ["resolved","rejected"]){refused=kind==="resolved";rejected=kind==="rejected";pending.length=0;errors.length=0;await button.props.onClick();assert.deepEqual(pending,[true,false]);assert.deepEqual(errors,[null,"Failed to sign in. Please try again."]);}
 refused=false;rejected=false;
}
assert.ok(OptionalSignInButtons({...props,disabled:true}).every(button=>button.props.disabled===true));
`;
	try {
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
	} finally {
		rmSync(cwd, { recursive: true, force: true });
	}
});
