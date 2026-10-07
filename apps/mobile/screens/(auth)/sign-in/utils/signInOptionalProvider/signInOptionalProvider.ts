type SignInResult = { error?: { message?: string } | null };
type SignInClient = {
	social: (input: {
		provider: "gitlab";
		callbackURL: string;
	}) => Promise<SignInResult>;
	oauth2: (input: {
		providerId: string;
		callbackURL: string;
	}) => Promise<SignInResult>;
};
export async function signInOptionalProvider(
	provider: "gitlab" | "authentik",
	client: SignInClient,
): Promise<void> {
	const result =
		provider === "gitlab"
			? await client.social({ provider, callbackURL: "/" })
			: await client.oauth2({ providerId: provider, callbackURL: "/" });
	if (result.error) {
		throw new Error(result.error.message);
	}
}
