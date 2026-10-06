# GitLab review follow-ups

Source-reviewed feedback on [#8235](https://github.com/superset-sh/superset/pull/8235) and [#8232](https://github.com/superset-sh/superset/pull/8232). Duplicate findings are grouped. These are contribution review findings; no merge or production acceptance is claimed.

## Corrected in the existing feature PR

At `f5f9389a4627f0e08ba6ab1ec65ad099d1f691b8`:

- OAuth initiation is an origin-checked, organization-admin POST. GET returns 405; signed callback state and PKCE remain.
- Manual hook reconciliation rejects malformed JSON, null, arrays and scalar bodies before selecting a connection or making provider writes; intentional `{}` bulk requests remain.
- Production and preview web deployment forward the configured GitLab issuer at runtime. API forwarding was already present.

Focused route/lifecycle/state/form tests passed. API and web typechecks passed. The full 42-task typecheck graph, lint and strict compilation of 17 translated catalogs were recorded for the prior feature head; they were not rerun in full for this amendment. Screenshots use that prior feature head plus the unmodified additive migration in an isolated local stack.

## Highest priority before cloud parity or landing

| Concern | Source-backed follow-up |
|---|---|
| Native cloud API authentication | [C3](https://github.com/superset-sh/superset/pull/8235#discussion_r4200577494): the intentional GitHub-token host restriction leaves native GitLab calls without authentication in cloud workers. Add project-scoped broker transport; preserve the restriction. |
| Broker search and logs | [G61](https://github.com/superset-sh/superset/pull/8235#discussion_r4200603029), [G62](https://github.com/superset-sh/superset/pull/8235#discussion_r4200603040): allow the bounded fields/read paths required by native MR review filters, and handle selected-project job traces as bounded text rather than JSON. Keep cross-project and unknown-path denial. |
| Linked-issue delivery and recovery | [C2](https://github.com/superset-sh/superset/pull/8235#discussion_r4200577484), [C13](https://github.com/superset-sh/superset/pull/8235#discussion_r4200577622): revalidate issue provenance when changing host, and recover canonical workspace identity after uncertain delivery without replaying the prompt. The real local screenshot also exposes a legacy GitHub label/body-fetch path for a GitLab issue; attaching a pill is not proof of successful agent dispatch. |
| Schema foundation | #8232 contains generated metadata while matching source declarations are in #8235. Coordinate an atomic/source-complete foundation before generating again; add three missing covering FK indexes through the normal generation workflow. Do not hand-edit generated SQL or snapshots. |

## Further grouped correctness work

- Repository identity and target ownership: multiple remote URLs, SSH versus custom HTTPS authorities, mobile cross-provider links, escaped namespace segments, cached remote changes, and loading/paused metadata.
- Read and write state: merged timestamps, mobile write synchronization, offline cached history, background-refetch errors, author/review filter limitations, and more than 100 selected repositories.
- Automation safety: explicitly selected nonempty project scopes, duplicate hook reconciliation under concurrency, bounded queue/delivery recovery, and a real webhook-to-agent acceptance run.
- Async selection: preserve created workspaces and branch drafts after selection changes, avoid stale environment/project promotion, and keep retry actions bound to the validated native target.
- UX and scope: provider-specific icons/labels, readable merge-status strings, safe external links, compact mobile layout, repository search debounce, and fixture-only Postgres dependency placement.

## Disproved or incomplete review claims

API runtime issuer forwarding was already correct; the web omission was the actual defect. GitLab availability independent of analytics flags is intentional and tested; entitlement gates still apply. CodeRabbit skipped the feature PR because its selected-file count exceeded the review limit, so no completed CodeRabbit review is claimed. Historical #5353 suggestions target a superseded generalized-table design and must not be copied into the current project-scoped architecture.

Real desktop/web reads use one authorized disposable public GitLab project. A localhost webhook warning is shown honestly: GitLab declined that callback URL, so webhook delivery is not accepted. OAuth button visibility does not prove an OAuth round trip. Native cloud provisioning, mixed deployed-version compatibility, full branch tests/upstream CI, physical-device review flows and adverse mobile lifecycle coverage remain separate acceptance gates.
