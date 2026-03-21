import type { FeatureProps } from './types';
import { useFeature } from './useFeature';

export const Feature = ({
  name,
  children,
  fallback = null,
  defaultValue,
  warnOnMissing,
}: FeatureProps) => {
  const enabled = useFeature(name, { defaultValue, warnOnMissing });

  return <>{enabled ? children : fallback}</>;
};
