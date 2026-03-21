import type { ReactNode } from 'react';

export type FeatureFlagsMap = Record<string, boolean>;
export type FeatureFlagsLoader = () => Promise<FeatureFlagsMap>;

export interface FeatureFlagsProviderState {
  isLoading: boolean;
  error: unknown | null;
}

export interface FeatureFlagsProviderProps {
  flags?: FeatureFlagsMap;
  initialFlags?: FeatureFlagsMap;
  loadFlags?: FeatureFlagsLoader;
  refreshIntervalMs?: number;
  onLoadError?: (error: unknown) => void;
  children?: ReactNode;
  warnOnMissing?: boolean;
}

export interface UseFeatureOptions {
  defaultValue?: boolean;
  warnOnMissing?: boolean;
}

export interface FeatureProps extends UseFeatureOptions {
  name: string;
  children?: ReactNode;
  fallback?: ReactNode;
}
