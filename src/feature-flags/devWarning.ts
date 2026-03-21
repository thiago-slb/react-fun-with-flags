const warnedFlags = new Set<string>();

const isDev = typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';

export const warnMissingFeature = (featureName: string): void => {
  if (!isDev || warnedFlags.has(featureName)) {
    return;
  }

  warnedFlags.add(featureName);
  console.warn(
    `[react-fun-with-flags] Feature flag "${featureName}" was requested but is missing in FeatureFlagsProvider.`
  );
};

export const resetWarningsForTests = (): void => {
  warnedFlags.clear();
};
