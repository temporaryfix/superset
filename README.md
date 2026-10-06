# Superset: GitLab and self-host contribution walkthrough

Seven ready-for-review proposals, each with one commit on upstream `34ce41f5b2`. All public proposals and this gallery are published from `temporaryfix`. Screenshots use a disposable local stack and one authorized public GitLab demo project.

## Review order

| PR | Purpose | Dependencies / acceptance |
|---|---|---|
| [#8229](https://github.com/superset-sh/superset/pull/8229) | Wait for reconnect open in the client test | Independent; 12 focused tests passed. |
| [#8230](https://github.com/superset-sh/superset/pull/8230) | Allow the Git fixture setup deadline | Independent; 12 focused tests passed; reconcile current timeout policy. |
| [#8231](https://github.com/superset-sh/superset/pull/8231) | Configured storage origins in desktop CSP | Independent; 17 tests and Turbo input-hash proof passed; live upload acceptance remains. |
| [#8233](https://github.com/superset-sh/superset/pull/8233) | PostgreSQL 18 development volume and rollback guidance | Independent; offline Compose checks and a fresh disposable local stack succeeded; existing-data transfer remains. |
| [#8232](https://github.com/superset-sh/superset/pull/8232) | Additive GitLab metadata foundation | Coordinate matching declarations from #8235 and covering indexes before landing/generating again. No production migration acceptance claimed. |
| [#8235](https://github.com/superset-sh/superset/pull/8235) | GitLab repositories, issues/MRs, optional sign-in, integration, automation and cloud metadata/UI | Depends on the schema foundation. Local reads are shown below; native cloud auth/search/log gaps remain. |
| [#8237](https://github.com/superset-sh/superset/pull/8237) | Configurable self-host services and local client packaging | Combine with #8231; coordinate optional GitLab reconciliation with #8235. Focused review fixes pass; native service/package acceptance remains. |

## Full visual gallery

Images are original app captures. Each caption states what was observed and what remains unverified. Backend-only functionality has a [source-based visual overview](selfhost-visual-overview.md).

### Web: optional GitLab sign-in

The configured GitLab action renders. A completed OAuth round trip is not claimed.

![Web: optional GitLab sign-in](screenshots/01-web-gitlab-sign-in.png)

### Desktop: optional GitLab sign-in

The real Electron sign-in screen renders the GitLab action.

![Desktop: optional GitLab sign-in](screenshots/02-desktop-gitlab-sign-in.png)

### Web: one GitLab integration

One entry covers the provider connection and its automation capabilities.

![Web: one GitLab integration](screenshots/03-integrations-single-gitlab.png)

### Web: OAuth and token connections

The organization connection dialog shows both methods; credential fields are blank.

![Web: OAuth and token connections](screenshots/04-gitlab-connection-methods.png)

### Web: connected demo project

A real token connection succeeds. GitLab rejects the localhost webhook URL, so the warning is retained; hook delivery is unverified.

![Web: connected demo project](screenshots/05-gitlab-project-connected.png)

### Desktop: GitLab repository picker

The picker fetches the authorized public demo repository. The selected repository was subsequently cloned through the app.

![Desktop: GitLab repository picker](screenshots/06-desktop-gitlab-repository-picker.png)

### Desktop: GitLab issues

The actual demo issue appears with the workspace action.

![Desktop: GitLab issues](screenshots/07-desktop-gitlab-issues.png)

### Desktop: linked issue follow-up

The linked issue appears, but a legacy GitHub label/body-fetch path remains. This is a reproduced defect, not accepted issue-prompt delivery.

![Desktop: linked issue follow-up](screenshots/08-desktop-linked-gitlab-issue.png)

### Desktop: native merge request summary

Actual GitLab MR data renders. The demo has no pipeline; the external-link icon still needs provider polish. Merge was not invoked.

![Desktop: native merge request summary](screenshots/09-desktop-gitlab-merge-request.png)

### Desktop: merge request diff

The real changed-file view shows the eight added lines in the demo review document.

![Desktop: merge request diff](screenshots/10-desktop-gitlab-diff.png)

### Desktop: connected GitLab account

The integration screen shows only the supplied public demo account.

![Desktop: connected GitLab account](screenshots/11-desktop-gitlab-integration.png)

### Desktop: GitLab automation events

The real editor lists GitLab MR, note, push, issue and pipeline event choices. No event dispatch is claimed.

![Desktop: GitLab automation events](screenshots/12-desktop-gitlab-automation-events.png)

### Desktop: project-scoped automation editor

The public project is selected for the merge-request-opened event. The edit was discarded; no automation or agent ran.

![Desktop: project-scoped automation editor](screenshots/13-desktop-gitlab-automation-scope.png)

### Desktop: GitLab cloud environment metadata

Fixture flags reveal the existing editor. It fetched the real project and saved metadata through the local API; this reopened dialog confirms selection. No cloud sandbox was started.

![Desktop: GitLab cloud environment metadata](screenshots/14-desktop-gitlab-cloud-environment.png)

### Mobile: optional GitLab sign-in

The actual iOS development app renders GitLab sign-in. This is action layout evidence, not a completed GitLab OAuth round trip. The frame retains a development analytics-configuration error toast.

![Mobile: optional GitLab sign-in](screenshots/15-mobile-gitlab-sign-in.png)

### Mobile: empty-project discoverability follow-up

The real relay reports a cloned project, but Home hides projects with zero workspaces. The empty state is captured as a follow-up.

![Mobile: empty-project discoverability follow-up](screenshots/16-mobile-home-host.png)

### Mobile: GitLab project and workspace

After no-agent fixture workspace creation through the real host service, Home shows the public project, branch and workspace.

![Mobile: GitLab project and workspace](screenshots/17-mobile-gitlab-workspace.png)

### Mobile: native GitLab merge request

The real MR route reads GitLab data through the registered local host. A deep link opened the route because this zero-session fixture hides its discovery strip. Merge and rebase were not invoked.

![Mobile: native GitLab merge request](screenshots/18-mobile-gitlab-merge-request.png)

### Mobile: merge request checks

The real checks sheet shows the empty state. The demo has no CI jobs; job-log retrieval and pipeline execution are not verified.

![Mobile: merge request checks](screenshots/19-mobile-gitlab-checks.png)

### Mobile: merge request reviewers

The real reviewers sheet shows the empty state; this MR has no assigned reviewers. Approval mutation is unverified.

![Mobile: merge request reviewers](screenshots/20-mobile-gitlab-reviewers.png)

### Mobile: cloud/host selection

The actual chooser shows Cloud and the online demo host using explicitly local SDK flag responses. This is UI evidence, not cloud provisioning.

![Mobile: cloud/host selection](screenshots/21-mobile-cloud-scope.png)

### Mobile: GitLab cloud environment selection

The actual cloud chooser reads the saved GitLab environment from the local API. Fixture flags only; no cloud workspace or paid sandbox was created.

![Mobile: GitLab cloud environment selection](screenshots/22-mobile-gitlab-environment-picker.png)

### Mobile: GitLab cloud branch selection

Normal chooser navigation fetches the real public project branches, with main selected by default. Fixture flags only; no branch write or cloud workspace creation.

![Mobile: GitLab cloud branch selection](screenshots/23-mobile-gitlab-cloud-branches.png)

### Desktop: GitLab cloud branch selection

With fixture flags, the real API reads the public project branches in the cloud workspace form. No Start agent or cloud checkout was invoked.

![Desktop: GitLab cloud branch selection](screenshots/24-desktop-gitlab-cloud-branches.png)

## Review feedback and evidence

- [GitLab/schema feedback: fixed and remaining](gitlab-review-feedback.md)
- [Self-host and smaller PR feedback: fixed and remaining](review-feedback.md)
- [Screenshot source, fixtures and limits](screenshot-notes.md)

The substantial feature proposals are offered for design and integration review. Ready for review does not mean all acceptance gates have passed. No full branch/upstream CI success, live cloud parity, OAuth completion, webhook dispatch, native storage authorization, packaged runtime, updater installation or physical-device acceptance is asserted here.
