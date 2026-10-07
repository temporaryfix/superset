# GitLab and self-host contribution walkthrough

[Tracking issue #8241](https://github.com/superset-sh/superset/issues/8241) follows seven one-commit proposals based on upstream `2dda82c314606aaa099b8626150c61450d66b629`. All 119 supplied review findings have dispositions: 63 GitLab/schema and 56 self-host findings, separating corrections, verified existing behavior, duplicates and disproved premises. This walkthrough connects current behavior and measured acceptance to the 24 original app captures.

The one-commit combined source on [review/verified-composition-20261007](https://github.com/temporaryfix/superset/tree/review/verified-composition-20261007) ([ef1ac91f](https://github.com/temporaryfix/superset/commit/ef1ac91f4632f7ed26f822d80e787d3adac41e3f)) integrates all seven proposals for reproduction without another PR. Shared graph evidence applies to that composition; focused proposal checks are recorded separately.

## Review order

| Proposal | Resulting change |
|---|---|
| [#8229](https://github.com/superset-sh/superset/pull/8229) | Reconnect tests wait for the client connection to open. |
| [#8230](https://github.com/superset-sh/superset/pull/8230) | The desktop Git fixture setup gets 60 seconds; individual deadlines remain unchanged. |
| [#8231](https://github.com/superset-sh/superset/pull/8231) | Desktop CSP admits configured storage origins; build inputs invalidate the relevant output. |
| [#8232](https://github.com/superset-sh/superset/pull/8232) | Matching GitLab declarations, generated migrations, covering indexes and complete DB tests land together. |
| [#8233](https://github.com/superset-sh/superset/pull/8233) | PostgreSQL 18 development storage preserves the old volume and has verified transfer/rollback guidance. |
| [#8235](https://github.com/superset-sh/superset/pull/8235) | Native GitLab repositories, issues, MRs, integration, automation and cloud flows. |
| [#8237](https://github.com/superset-sh/superset/pull/8237) | Optional native services, separate public/private storage, Authentik and local client tooling. |

## Resulting behavior

Native GitLab cloud requests use the existing project-bound credential broker; the host receives no GitLab token. Explicit review search and bounded plain-text traces support selected-project reads and verified fork-source CI. Repository/MR identity includes provider, instance, project, namespace and number. Native Git 4 resolve/push/raw tasks pass the resolved environment at client construction through the existing guard.

Issue prompts retain their source across destination changes. Uncertain enqueue, failed settlement and partial launch recover the canonical workspace through bounded reads and block whole-create replay. Stale callbacks cannot write to a different workspace/MR; late create navigation keeps the original workspace. Capability queries batch large project lists, bounded caches preserve usable selection, and complete hook reconciliation serializes per connection with explicit event/project validation. Mobile exposes projects without workspaces and wraps environment names.

Self-hosting preserves managed defaults while adding native PostgreSQL, Redis, SMTP, public/private S3 storage, durable queue/scheduler services and Worker/client tooling. Actual native DB transactions and locks, Worker tickets/page/file access, Garage key retention, queue/lifecycle behavior and configuration boundaries have executable acceptance. Combined auth preserves GitLab and Authentik, five mobile providers with matching Apple entitlement, scrollable content and quiet analytics. A faithful Bun backport of [Expo fix #51040](https://github.com/expo/expo/pull/51040) preserves the pinned 57.1.1 package's Swift factory ownership.

## Verification

| Check | Recorded acceptance |
|---|---|
| Schema/database | Full 146-migration chain; six FKs/three new indexes; Drizzle check and clean regeneration. Schema+tRPC acceptance passed 42 cases/226 assertions with zero skips/failures and repeated with clean state. |
| Native PostgreSQL | Actual exported clients executed queries, committed/rolled back transactions and serialized advisory locks. Combined-source DB package passed 35 cases/212 assertions with zero skips/failures. |
| Native Redis | Actual pinned Valkey passed seven cases/69 assertions with zero skips/failures in 427 ms. Five native cases made zero HTTP requests, covering serialization, TTL, conditional set, GET/delete, 16 concurrent reads/writes and `NOSCRIPT` recovery; 12 rate-limit calls admitted exactly three. Two managed-provider cases passed; the disposable container was removed. |
| Native Git/worker | Resolved-environment regressions passed 102 isolated task/project/MR-dispatch/binding cases. Production-defined Node 22 worker used physical disposable repositories with network/dotenv reads denied, verifying responsiveness, uncertain-mutation quarantine and no replay. |
| Caller/client fixtures | tRPC create/update/promote passed 36 actual caller cases/187 assertions. Latest desktop controls passed 20 React/transport cases plus 68 surrounding cases. Combined mobile fixtures passed 38 outer cases, including actual quiet-wrapper enabled/disabled/unknown behavior; auth/config fixtures passed 41 outer and 90 genuine app-config cases. Counts overlap. |
| Storage/Worker | The candidate image built in 49.4 seconds; actual Garage/Worker acceptance passed three page/ticket/file-range cases/49 assertions; runtime UID 1001 and cleanup verified. Garage retained-key mismatch/rotation and Docker-context positive/negative controls passed. |
| PostgreSQL transfer | 1,000 PostgreSQL17.11→18.6 rows retained identical ordered checksums, including Unicode JSON and large integers. Restarted old data stayed intact; new writes did not change it. |
| Expo ownership | Genuine installed 57.1.1 header/dispatch/retain-release and escaped Swift owner copies passed one native case/19 assertions under `-Onone`/`-O` with AddressSanitizer. Incorrect-unretained control failed ownership checks. |
| Final scoped/combined checks | Proposal-focused checks: All seven proposal-focused checks passed; the exact #8237 container passed three real storage/page cases, #8232 passed eight real-DDL schema cases and clean Drizzle regeneration, #8233 passed the PostgreSQL 17→18 transfer/rollback rehearsal, and current configured storage/cache and reconnect/Git-fixture regressions passed.. Combined declaration/consumer/catalog checks: All 42 compiler/declaration/catalog tasks passed, with 17 fully translated shipping catalogs (6,184 messages each); repository-wide lint passed 9,927 files. Changed-test acceptance across all 17 groups passed 2290 cases with zero unresolved failures, including API 185, desktop 290, mobile 102, host 696 and tRPC 399. The native Node 22 worker and installed glab cases ran; all five optional native Redis cases also passed separately against disposable Valkey (seven total Redis cases/69 assertions, zero skips). Counts are outer cases; nested caller/component cases are recorded separately.. |

## Original capture provenance

The 24 unchanged images come from the original disposable web/Electron/iOS demo stack and authorized public GitLab project, before the completion fixes. Project/MR/branch reads were real; cloud visibility used local flag responses. [screenshot-notes.md](screenshot-notes.md) pins capture source, dimensions and fixtures. The single shared external-acceptance/provenance statement is in [tracking issue #8241](https://github.com/superset-sh/superset/issues/8241).

## Full visual gallery

### Web: optional GitLab sign-in

The web sign-in screen offers the configured optional GitLab provider.

![Web: optional GitLab sign-in](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/01-web-gitlab-sign-in.png)

### Desktop: optional GitLab sign-in

The Electron sign-in screen offers the same optional GitLab provider.

![Desktop: optional GitLab sign-in](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/02-desktop-gitlab-sign-in.png)

### Web: one GitLab integration

One GitLab integration entry covers repository connections and automation.

![Web: one GitLab integration](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/03-integrations-single-gitlab.png)

### Web: OAuth and token connections

The organization connection dialog offers OAuth and token methods with blank credential fields.

![Web: OAuth and token connections](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/04-gitlab-connection-methods.png)

### Web: connected demo project

The demo token connection selected its public project. The frame preserves the warning from GitLab rejecting the local webhook callback.

![Web: connected demo project](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/05-gitlab-project-connected.png)

### Desktop: GitLab repository picker

The native repository picker fetched the public demo repository; cloning subsequently completed through the app.

![Desktop: GitLab repository picker](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/06-desktop-gitlab-repository-picker.png)

### Desktop: GitLab issues

The demo issue appears with its workspace action.

![Desktop: GitLab issues](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/07-desktop-gitlab-issues.png)

### Desktop: linked issue follow-up

This original frame shows the linked issue and the earlier GitHub label/body-fetch defect. The completion now reads native issue context from its verified source host/project, including after switching the destination to Cloud.

![Desktop: linked issue follow-up](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/08-desktop-linked-gitlab-issue.png)

### Desktop: native merge request summary

The native summary renders real MR data. The completion now persists merge/ready/reopen state and displays readable merge status.

![Desktop: native merge request summary](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/09-desktop-gitlab-merge-request.png)

### Desktop: merge request diff

The changed-file view renders the demo document’s eight added lines.

![Desktop: merge request diff](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/10-desktop-gitlab-diff.png)

### Desktop: connected GitLab account

The desktop integration screen displays the connected demo GitLab account.

![Desktop: connected GitLab account](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/11-desktop-gitlab-integration.png)

### Desktop: GitLab automation events

The automation editor lists merge-request, note, push, issue and pipeline events.

![Desktop: GitLab automation events](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/12-desktop-gitlab-automation-events.png)

### Desktop: project-scoped automation editor

The merge-request-opened editor selects the demo project. The completion requires an explicit nonempty project scope and exposes filters supported by each event. The captured draft was discarded.

![Desktop: project-scoped automation editor](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/13-desktop-gitlab-automation-scope.png)

### Desktop: GitLab cloud environment metadata

The existing cloud environment editor fetched the real demo project and saved environment metadata through the local API. Reopening retained that selection.

![Desktop: GitLab cloud environment metadata](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/14-desktop-gitlab-cloud-environment.png)

### Mobile: optional GitLab sign-in

The iOS development app renders the optional GitLab action. The original frame retains its development analytics-configuration toast.

![Mobile: optional GitLab sign-in](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/15-mobile-gitlab-sign-in.png)

### Mobile: empty-project discoverability follow-up

Original Home state before fixture workspace creation: the cloned project has no visible workspace. This frame records the original empty state.

![Mobile: empty-project discoverability follow-up](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/16-mobile-home-host.png)

### Mobile: GitLab project and workspace

After creating a no-agent fixture workspace through the real host service, Home displays its project, branch and workspace.

![Mobile: GitLab project and workspace](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/17-mobile-gitlab-workspace.png)

### Mobile: native GitLab merge request

The native MR route reads real GitLab data through the registered local host. A deep link opened this zero-session fixture.

![Mobile: native GitLab merge request](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/18-mobile-gitlab-merge-request.png)

### Mobile: merge request checks

The checks sheet displays the demo’s actual empty CI state. Fork-source pipeline and text-log behavior is covered by the completion regressions above.

![Mobile: merge request checks](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/19-mobile-gitlab-checks.png)

### Mobile: merge request reviewers

The reviewers sheet displays the demo’s actual empty reviewer state.

![Mobile: merge request reviewers](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/20-mobile-gitlab-reviewers.png)

### Mobile: cloud/host selection

The real chooser displays Cloud and the online demo host under local feature-flag responses.

![Mobile: cloud/host selection](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/21-mobile-cloud-scope.png)

### Mobile: GitLab cloud environment selection

The cloud chooser reads the GitLab environment saved through the local API.

![Mobile: GitLab cloud environment selection](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/22-mobile-gitlab-environment-picker.png)

### Mobile: GitLab cloud branch selection

Normal cloud chooser navigation fetches the public project’s branches and selects main by default.

![Mobile: GitLab cloud branch selection](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/23-mobile-gitlab-cloud-branches.png)

### Desktop: GitLab cloud branch selection

The desktop cloud form reads the public project’s branches through the real API.

![Desktop: GitLab cloud branch selection](https://raw.githubusercontent.com/temporaryfix/superset/b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0/screenshots/24-desktop-gitlab-cloud-branches.png)

## Review detail

- [GitLab completion and finding coverage](gitlab-review-feedback.md)
- [Small proposals, schema/database evidence and external CI](review-feedback.md)
- [Self-host capabilities and acceptance evidence](selfhost-visual-overview.md)
- [Screenshot provenance](screenshot-notes.md)
