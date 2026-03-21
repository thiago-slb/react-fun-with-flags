import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type {
  FeatureFlagsMap,
  FeatureFlagsProviderProps,
  FeatureFlagsProviderState,
} from './types';

interface FeatureFlagsContextValue {
  flags: FeatureFlagsMap;
  warnOnMissing: boolean;
  state: FeatureFlagsProviderState;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | null>(null);

export const FeatureFlagsProvider = ({
  flags: controlledFlags,
  initialFlags = {},
  loadFlags,
  refreshIntervalMs,
  onLoadError,
  children,
  warnOnMissing = true,
}: FeatureFlagsProviderProps) => {
  const [flags, setFlags] = useState<FeatureFlagsMap>(controlledFlags ?? initialFlags);
  const [state, setState] = useState<FeatureFlagsProviderState>({
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!controlledFlags) {
      return;
    }

    setFlags(controlledFlags);
  }, [controlledFlags]);

  useEffect(() => {
    if (!loadFlags) {
      return;
    }

    let active = true;

    const run = async () => {
      setState((previous) => ({ ...previous, isLoading: true, error: null }));

      try {
        const nextFlags = await loadFlags();
        if (!active) {
          return;
        }

        setFlags(nextFlags);
        setState({ isLoading: false, error: null });
      } catch (error) {
        if (!active) {
          return;
        }

        setState({ isLoading: false, error });
        if (onLoadError) {
          onLoadError(error);
        }
      }
    };

    run();

    if (!refreshIntervalMs || refreshIntervalMs <= 0) {
      return () => {
        active = false;
      };
    }

    const intervalId = setInterval(run, refreshIntervalMs);
    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, [loadFlags, onLoadError, refreshIntervalMs]);

  const value = useMemo(
    () => ({ flags, warnOnMissing, state }),
    [flags, warnOnMissing, state]
  );

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlagsContext = (): FeatureFlagsContextValue => {
  const context = useContext(FeatureFlagsContext);

  if (!context) {
    throw new Error(
      'useFeature and <Feature /> must be used inside <FeatureFlagsProvider />.'
    );
  }

  return context;
};

export const useFeatureFlagsState = (): FeatureFlagsProviderState => {
  return useFeatureFlagsContext().state;
};
