# react-fun-with-flags

A lightweight React + TypeScript library for feature flags with provider, hook, and declarative component APIs.

## Installation

```bash
npm install react-fun-with-flags
```

## Core API

- `FeatureFlagsProvider`
- `useFeature`
- `<Feature />`
- `useFeatureFlagsState`

## Quick Start

```tsx
import { FeatureFlagsProvider, Feature } from 'react-fun-with-flags';

export function App() {
  return (
    <FeatureFlagsProvider flags={{ checkoutV2: true }}>
      <Feature name="checkoutV2" fallback={<p>Old checkout</p>}>
        <p>New checkout</p>
      </Feature>
    </FeatureFlagsProvider>
  );
}
```

## Async Flag Loading

```tsx
import { FeatureFlagsProvider, useFeatureFlagsState } from 'react-fun-with-flags';

const loadFlags = async () => {
  const response = await fetch('/api/flags');
  return response.json();
};

function Status() {
  const { isLoading, error } = useFeatureFlagsState();
  if (isLoading) return <p>Loading flags...</p>;
  if (error) return <p>Failed to load flags.</p>;
  return null;
}

export function App() {
  return (
    <FeatureFlagsProvider
      initialFlags={{ checkoutV2: false }}
      loadFlags={loadFlags}
      refreshIntervalMs={60_000}
    >
      <Status />
    </FeatureFlagsProvider>
  );
}
```

## API

### `FeatureFlagsProvider`

Props:

- `flags?: Record<string, boolean>`
- `initialFlags?: Record<string, boolean>`
- `loadFlags?: () => Promise<Record<string, boolean>>`
- `refreshIntervalMs?: number`
- `onLoadError?: (error: unknown) => void`
- `warnOnMissing?: boolean`

### `useFeature(name, options?)`

Options:

- `defaultValue?: boolean`
- `warnOnMissing?: boolean`

### `<Feature name="..." />`

Props:

- `name: string`
- `fallback?: ReactNode`
- `defaultValue?: boolean`
- `warnOnMissing?: boolean`

### `useFeatureFlagsState()`

Returns:

- `{ isLoading: boolean; error: unknown | null }`

## Dev Warning Behavior

In development, missing flags emit one warning per flag name:

- `[react-fun-with-flags] Feature flag "<name>" was requested but is missing in FeatureFlagsProvider.`

You can disable warnings globally (`warnOnMissing={false}`) or per hook/component call.

## Design Decisions

- Missing flags default to `false` unless `defaultValue` is provided.
- Missing-flag warnings are development-only and deduplicated.
- Flags are plain objects (`Record<string, boolean>`) for transport simplicity.
- Async loading is optional and opt-in via `loadFlags`.

## SSR and Hydration

For SSR frameworks, provide `initialFlags` that match the server-rendered payload to avoid hydration mismatches.

Recommended pattern:

1. Resolve flags on server.
2. Serialize flags into HTML payload.
3. Pass same object into `initialFlags` on the client.

## Migration Guide

### From old `Flag` component API

This library no longer ships country flag rendering (`Flag`, `FlagProps`).

Replace old usage with feature-gating APIs:

- `Flag` -> `<Feature />`
- direct checks -> `useFeature`
- app-level config -> `FeatureFlagsProvider`

## FAQ

### Should `react` and `react-dom` be dependencies?

For libraries, they should be peer dependencies. This package uses peers and keeps React in dev dependencies only for local development/testing.

### Does this work with React 19?

Yes. Current peer range is `>=19.2.0 <20`.

### Can I update flags at runtime?

Yes. Pass new `flags` props or use `loadFlags` with optional `refreshIntervalMs`.

## Local Development

```bash
npm install
npm run lint
npm run test
npm run build
npm run typecheck
npm run type-test
```

## Playground (Vite)

```bash
npm run playground
```

## Release Process

This project uses Changesets.

```bash
npm run changeset
```

CI creates/updates the version PR and publishes on merge (with `NPM_TOKEN` configured).

## License

MIT
