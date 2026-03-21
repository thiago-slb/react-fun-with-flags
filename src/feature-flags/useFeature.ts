import { warnMissingFeature } from './devWarning';
import { useFeatureFlagsContext } from './context';
import type { UseFeatureOptions } from './types';

export const useFeature = (
  name: string,
  options: UseFeatureOptions = {}
): boolean => {
  const { flags, warnOnMissing: providerWarnOnMissing } = useFeatureFlagsContext();

  const {
    defaultValue = false,
    warnOnMissing = providerWarnOnMissing,
  } = options;

  const hasFeature = Object.prototype.hasOwnProperty.call(flags, name);

  if (!hasFeature) {
    if (warnOnMissing) {
      warnMissingFeature(name);
    }

    return defaultValue;
  }

  return Boolean(flags[name]);
};
