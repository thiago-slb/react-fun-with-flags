# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-21

### Added

- Initial release
- Feature flags API:
  - `FeatureFlagsProvider`
  - `useFeature`
  - `<Feature />`
  - `useFeatureFlagsState`
- Optional async flag loading with `loadFlags`, `refreshIntervalMs`, and `onLoadError`.
- Development warning for missing feature flags (warns once per flag name).
- Full TypeScript types for provider, hook, options, and component props.
- Unit tests covering provider usage, runtime flag updates, nested `<Feature />`, async loading/error state, missing-flag warning, and provider guard.
- Public type tests with `tsd`.
- Vite playground example in `playground/example` for interactive local testing.
- GitHub Actions CI with Node 18/20/22 matrix, lint/type checks, package dry-run, and production dependency audit.
- Automated release workflow with Changesets (`changeset`, version PR, publish).
- Build clean step (`npm run clean`) before bundling.
- Documentation updates with design decisions, SSR/hydration notes, migration guide, and FAQ.
- Open source governance docs: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and `SUPPORT.md`.
- Project upgraded to React `19.2.x` with aligned ecosystem dependencies.
- `peerDependencies` requiring React `>=19.2.0 <20`.
- React moved to peer + dev dependencies (no runtime dependency duplication).
- Package hardening: `sideEffects: false`, `engines.node >= 18`, improved keywords, and pack checks.
- TypeScript build excluding test declaration output (`src/**/*.test.ts(x)`).
- ESLint and Prettier configuration.
- MIT License.
