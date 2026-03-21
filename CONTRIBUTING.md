# Contributing

Thanks for contributing to `react-fun-with-flags`.

## Development setup

```bash
npm install
npm run lint
npm run test
npm run build
npm run typecheck
npm run type-test
```

## Branch and PR workflow

1. Create a branch from `main`.
2. Make your changes with tests.
3. Add a changeset for user-facing changes:

```bash
npm run changeset
```

4. Open a PR with a clear summary and testing notes.

## Pull request checklist

- [ ] Tests added or updated
- [ ] Docs updated when behavior/API changed
- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run type-test` passes
- [ ] Changeset added (if needed)

## Commit style

Use clear, imperative commit messages, for example:

- `feat: add async flag loader`
- `fix: handle missing provider error message`
- `docs: add migration guide`

## Release flow

Releases are handled through Changesets and GitHub Actions.

- Merged changesets are collected into a version PR.
- Merging the version PR publishes to npm (requires `NPM_TOKEN` secret).
