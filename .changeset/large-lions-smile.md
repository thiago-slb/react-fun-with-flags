---
"react-fun-with-flags": minor
---

Prepare library for production/open source use:

- add async flag loading options (`loadFlags`, `refreshIntervalMs`, `onLoadError`) and `useFeatureFlagsState`
- expand tests to cover runtime updates, nested gates, and async loading/error
- add type tests with `tsd`
- harden package/release setup (peer deps, pack checks, Changesets, release workflow)
- add governance docs and improve README with SSR/migration/FAQ guidance
- upgrade CI to matrix + lint/type + pack/audit checks
