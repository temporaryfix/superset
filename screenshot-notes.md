# Screenshot provenance and limits

These images show real web, Electron and iOS app screens in a disposable local development stack. The GitLab project is an authorized public demo repository, [testicle321/superset-gitlab-review-demo](https://gitlab.com/testicle321/superset-gitlab-review-demo). The app user and organization are seeded dummy Local Admin records. No private repositories or production accounts were imported.

Web and desktop captures use GitLab source `4eea55d3f4197e6cf363980df2076e39bc606da5`, before the three review amendments in `f5f9389a4627f0e08ba6ab1ec65ad099d1f691b8`. The original generated schema migration from #8232 was applied unchanged to the disposable database; PostgreSQL 18 was used for local upstream migration compatibility. An existing account-shell test override supplied an isolated shell and demo-only credential configuration so the host could authenticate without reading an operator's shell profile or credential helper. It does not mock GitLab API responses or replace the app UI.

Web is captured at 1440 CSS pixels wide; desktop at its normal development window size (1998×1248 screenshot pixels). Later desktop captures use a 1440×900 CSS viewport with the native window's pixel scale. Mobile uses a fresh iOS simulator at 402×874 points with an existing compatible dev-client shell loading the current JavaScript bundle. Mobile input goes through Maestro, desktop/web input through CDP mouse and keyboard events. Development buttons and menus identify the captures as development builds.

## What was observed

- GitLab sign-in actions render on web, desktop and mobile. They are optional-provider layout evidence; no completed GitLab OAuth round trip is claimed.
- Web has one GitLab integration entry and both OAuth and token connection methods. A token connection to the demo project succeeds. The connected screenshot retains the webhook warning because GitLab rejects a localhost callback; hook delivery is not proven.
- The desktop native GitLab picker fetches the demo repository; its clone completes. GitLab issue and merge-request lists, native summary data and changed-file diff render using real GitLab reads.
- The linked-issue pill appears after Add to workspace, but a legacy GitHub label/body-fetch path remains visible. The screenshot is a reproduced follow-up, not accepted prompt delivery.
- Automation screenshots show the GitLab event menu and selection of the demo project in the editor. They do not prove an event was delivered or an agent ran; the edit was discarded after capture.
- Mobile signs in through the local API, sees the dummy organization and registered local host. Home initially hides the cloned project when it has no workspaces; real relay reads confirm the project exists. After fixture workspace creation, Home displays the actual project, branch and workspace. A no-agent workspace on the demo branch is created through the real host service as fixture setup for later navigation.

In cloud screenshots, the existing cloud flag is supplied by an explicitly local fixture service through the SDK's HTTP protocol. This is a feature-visibility fixture, not proof of managed analytics or sandbox provisioning. The desktop editor fetched the real demo GitLab project and saved its environment metadata through the local API; the reopened edit dialog confirms the selection. No cloud agent or paid sandbox was started. Native GitLab cloud API authentication and broker search/log paths have known remaining review gaps.

The screenshot set is a visual contribution walkthrough. Full mobile adverse lifecycle, locale, large-text, physical-device and Release checks, mixed deployed-client compatibility, real webhook automation, cloud provisioning, native storage and packaging acceptance remain separate. Backend adapters and client tooling are described in the source-based Mermaid overview; that diagram is not a runtime screenshot.

Mobile MR, checks and reviewers routes were opened with the existing real app deep links because the no-session fixture hides their discovery controls. The checks and reviewer screenshots show actual empty states, not pipeline/log or approval acceptance. Merge/rebase were not invoked. Mobile cloud selection reads the real locally saved environment under the same explicit flag fixture.
