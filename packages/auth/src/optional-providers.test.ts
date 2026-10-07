import { expect, test } from "bun:test";
import { getAuthentikConfig, getGitlabProvider } from "./optional-providers";

test("GitLab registration needs both credentials and no self-host configuration", () => {
	expect(getGitlabProvider({})).toEqual({});
	expect(getGitlabProvider({ GITLAB_CLIENT_ID: "id" })).toEqual({});
	expect(
		getGitlabProvider({
			GITLAB_CLIENT_ID: "id",
			GITLAB_CLIENT_SECRET: "secret",
		}),
	).toEqual({ gitlab: { clientId: "id", clientSecret: "secret" } });
});
test("GitLab preserves a configured issuer including HTTPS port", () => {
	expect(
		getGitlabProvider({
			GITLAB_CLIENT_ID: "id",
			GITLAB_CLIENT_SECRET: "secret",
			GITLAB_ISSUER: "https://gitlab.example.com:8443",
		}),
	).toEqual({
		gitlab: {
			clientId: "id",
			clientSecret: "secret",
			issuer: "https://gitlab.example.com:8443",
		},
	});
});
test("the real GitLab SDK uses the issuer and caller callback", async () => {
	const { gitlab } = await import("better-auth/social-providers");
	const config = getGitlabProvider({
		GITLAB_CLIENT_ID: "id",
		GITLAB_CLIENT_SECRET: "secret",
		GITLAB_ISSUER: "https://gitlab.example.com:8443",
	});
	if (!config.gitlab) throw new Error("GitLab was not registered");
	const url = await gitlab(config.gitlab).createAuthorizationURL({
		state: "state",
		codeVerifier: "verifier",
		redirectURI: "https://api.example.com/api/auth/callback/gitlab",
	});
	expect(url.origin).toBe("https://gitlab.example.com:8443");
	expect(url.pathname).toBe("/oauth/authorize");
	expect(url.searchParams.get("redirect_uri")).toBe(
		"https://api.example.com/api/auth/callback/gitlab",
	);
	expect(url.searchParams.get("state")).toBe("state");
});

test("Authentik requires complete configuration", () => {
	expect(getAuthentikConfig({})).toEqual([]);
	expect(
		getAuthentikConfig({
			AUTHENTIK_ISSUER: "https://sso.example.com/application/o/superset/",
			AUTHENTIK_CLIENT_ID: "id",
		}),
	).toEqual([]);
});
test("Authentik discovery retains issuer path and enables PKCE", () => {
	expect(
		getAuthentikConfig({
			AUTHENTIK_ISSUER: "https://sso.example.com/application/o/superset/",
			AUTHENTIK_CLIENT_ID: "id",
			AUTHENTIK_CLIENT_SECRET: "secret",
		}),
	).toEqual([
		{
			providerId: "authentik",
			clientId: "id",
			clientSecret: "secret",
			discoveryUrl:
				"https://sso.example.com/application/o/superset/.well-known/openid-configuration",
			scopes: ["openid", "profile", "email"],
			pkce: true,
		},
	]);
});
test("Authentik rejects whitespace-only credentials without trimming a meaningful secret", () => {
	const complete = {
		AUTHENTIK_ISSUER: "https://id.example.test/application/o/app",
		AUTHENTIK_CLIENT_ID: "client",
		AUTHENTIK_CLIENT_SECRET: " secret ",
	};
	for (const key of ["AUTHENTIK_CLIENT_ID", "AUTHENTIK_CLIENT_SECRET"])
		expect(getAuthentikConfig({ ...complete, [key]: "  " })).toEqual([]);
	expect(getAuthentikConfig(complete)[0]?.clientSecret).toBe(" secret ");
});

test("optional server providers independently enable from one combined configuration", () => {
	const config = {
		GITLAB_CLIENT_ID: "gitlab-client",
		GITLAB_CLIENT_SECRET: "gitlab-secret",
		GITLAB_ISSUER: "https://git.fixture.test:8443",
		AUTHENTIK_ISSUER: "https://sso.fixture.test/application/o/superset",
		AUTHENTIK_CLIENT_ID: "authentik-client",
		AUTHENTIK_CLIENT_SECRET: "authentik-secret",
	};
	expect(getGitlabProvider(config).gitlab?.clientId).toBe("gitlab-client");
	expect(getAuthentikConfig(config)[0]?.providerId).toBe("authentik");
	expect(
		getGitlabProvider({ ...config, GITLAB_CLIENT_SECRET: undefined }),
	).toEqual({});
	expect(
		getAuthentikConfig({ ...config, GITLAB_CLIENT_SECRET: undefined }),
	).toHaveLength(1);
	expect(
		getAuthentikConfig({ ...config, AUTHENTIK_CLIENT_SECRET: " " }),
	).toEqual([]);
	expect(
		getGitlabProvider({ ...config, AUTHENTIK_CLIENT_SECRET: " " }).gitlab
			?.issuer,
	).toBe(config.GITLAB_ISSUER);
});

test("GitLab rejects whitespace-only credentials while retaining meaningful original bytes", () => {
	const complete = {
		GITLAB_CLIENT_ID: " client ",
		GITLAB_CLIENT_SECRET: " secret ",
		GITLAB_ISSUER: "https://git.fixture.test:8443",
	};
	for (const key of ["GITLAB_CLIENT_ID", "GITLAB_CLIENT_SECRET"])
		expect(getGitlabProvider({ ...complete, [key]: "  " })).toEqual({});
	expect(getGitlabProvider(complete)).toEqual({
		gitlab: {
			clientId: " client ",
			clientSecret: " secret ",
			issuer: "https://git.fixture.test:8443",
		},
	});
});
