# Original screenshot provenance

The 24 linked images are the existing public assets associated with [tracking issue #8241](https://github.com/superset-sh/superset/issues/8241), pinned to asset commit `b8e8205f5eace7c4c141ce4bea4f145d9a0e4eb0`. This replacement walkthrough reuses them without recapture or image alteration.

The captures show real web, Electron and iOS development screens against a disposable local stack, seeded dummy app records and one authorized public GitLab demo repository. No private repository or production account was imported. Web and desktop ran GitLab feature source `4eea55d3f4197e6cf363980df2076e39bc606da5`, before the completion fixes. The original generated schema migration was applied unchanged to the disposable PostgreSQL 18 database.

Web captures are 1440 CSS pixels wide. Desktop captures retain native scale at 2880×1800 or 3420×2136 pixels. Mobile used a fresh iOS simulator at 402×874 points, producing 1206×2622 images, with a compatible development shell loading the demo JavaScript bundle. Web/desktop input used CDP; mobile input used Maestro.

The isolated host test setup supplied a demo-only shell and credentials without loading an operator’s shell profile or credential helper. GitLab API responses and app UI were real. The desktop picker fetched and cloned the demo repository; issue/MR content and diffs rendered. One no-agent workspace was created through the real host service for mobile navigation. Deep links opened MR/check/reviewer routes because the zero-session fixture hid their discovery strip.

Cloud chooser/editor frames used an explicit local feature-flag response fixture. The editor fetched the real project, saved environment metadata through the local API and reopened with that selection; branch choosers fetched the real public branches. No cloud agent or paid sandbox was started.

Frame 05 retains GitLab’s refusal of the local webhook callback. Frame 08 retains the earlier linked-issue label/body-fetch defect. Frame 15 retains a development analytics toast. Frame 16 precedes fixture workspace creation. Frames 19–20 display the real demo’s empty CI/reviewer states. These observed states are preserved in the gallery captions; later corrections and tests are described separately in the completion overview.

The current [verification overview](README.md#verification) records the later regression, actual database/storage and native ownership checks. The single shared external-acceptance/provenance statement is in [tracking issue #8241](https://github.com/superset-sh/superset/issues/8241); backend adapters and client tooling are detailed in the [self-host overview](selfhost-visual-overview.md).
