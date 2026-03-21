import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { FeatureFlagsProvider, useFeatureFlagsState } from './context';
import { Feature } from './Feature';
import { useFeature } from './useFeature';
import { resetWarningsForTests } from './devWarning';

const HookProbe = ({
  featureName,
  defaultValue,
  warnOnMissing,
}: {
  featureName: string;
  defaultValue?: boolean;
  warnOnMissing?: boolean;
}) => {
  const enabled = useFeature(featureName, { defaultValue, warnOnMissing });
  return <span data-testid="hook-value">{String(enabled)}</span>;
};

const ProviderStateProbe = () => {
  const state = useFeatureFlagsState();
  return (
    <span data-testid="provider-state">{`${String(state.isLoading)}:${String(Boolean(state.error))}`}</span>
  );
};

describe('feature flags API', () => {
  beforeEach(() => {
    resetWarningsForTests();
    vi.restoreAllMocks();
  });

  it('returns true when feature is enabled', () => {
    render(
      <FeatureFlagsProvider flags={{ checkoutV2: true }}>
        <HookProbe featureName="checkoutV2" />
      </FeatureFlagsProvider>
    );

    expect(screen.getByTestId('hook-value').textContent).toBe('true');
  });

  it('updates when controlled flags change at runtime', () => {
    const { rerender } = render(
      <FeatureFlagsProvider flags={{ checkoutV2: false }}>
        <HookProbe featureName="checkoutV2" />
      </FeatureFlagsProvider>
    );

    expect(screen.getByTestId('hook-value').textContent).toBe('false');

    rerender(
      <FeatureFlagsProvider flags={{ checkoutV2: true }}>
        <HookProbe featureName="checkoutV2" />
      </FeatureFlagsProvider>
    );

    expect(screen.getByTestId('hook-value').textContent).toBe('true');
  });

  it('renders fallback when feature is disabled', () => {
    render(
      <FeatureFlagsProvider flags={{ betaHeader: false }}>
        <Feature name="betaHeader" fallback={<span>Old Header</span>}>
          <span>New Header</span>
        </Feature>
      </FeatureFlagsProvider>
    );

    expect(screen.getByText('Old Header')).toBeTruthy();
    expect(screen.queryByText('New Header')).toBeNull();
  });

  it('supports nested <Feature /> gates', () => {
    render(
      <FeatureFlagsProvider flags={{ outer: true, inner: false }}>
        <Feature name="outer" fallback={<span>Outer Off</span>}>
          <Feature name="inner" fallback={<span>Inner Off</span>}>
            <span>Inner On</span>
          </Feature>
        </Feature>
      </FeatureFlagsProvider>
    );

    expect(screen.getByText('Inner Off')).toBeTruthy();
    expect(screen.queryByText('Inner On')).toBeNull();
    expect(screen.queryByText('Outer Off')).toBeNull();
  });

  it('uses defaultValue for missing feature', () => {
    render(
      <FeatureFlagsProvider flags={{}}>
        <HookProbe featureName="missingFeature" defaultValue warnOnMissing={false} />
      </FeatureFlagsProvider>
    );

    expect(screen.getByTestId('hook-value').textContent).toBe('true');
  });

  it('warns once in dev when a flag is missing', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(
      <FeatureFlagsProvider flags={{}}>
        <>
          <HookProbe featureName="missingFeature" />
          <Feature name="missingFeature">Visible only if enabled</Feature>
        </>
      </FeatureFlagsProvider>
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain('missingFeature');
  });

  it('loads flags asynchronously when loadFlags is provided', async () => {
    const loadFlags = vi.fn().mockResolvedValue({ checkoutV2: true });

    render(
      <FeatureFlagsProvider flags={{ checkoutV2: false }} loadFlags={loadFlags}>
        <HookProbe featureName="checkoutV2" />
        <ProviderStateProbe />
      </FeatureFlagsProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('hook-value').textContent).toBe('true');
    });

    expect(loadFlags).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('provider-state').textContent).toBe('false:false');
  });

  it('exposes loading error state when async loader fails', async () => {
    const onLoadError = vi.fn();
    const loadFlags = vi.fn().mockRejectedValue(new Error('load failed'));

    render(
      <FeatureFlagsProvider flags={{}} loadFlags={loadFlags} onLoadError={onLoadError}>
        <ProviderStateProbe />
      </FeatureFlagsProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('provider-state').textContent).toBe('false:true');
    });

    expect(onLoadError).toHaveBeenCalledTimes(1);
  });

  it('throws when used without provider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => render(<HookProbe featureName="checkoutV2" />)).toThrow(
      'useFeature and <Feature /> must be used inside <FeatureFlagsProvider />.'
    );

    errorSpy.mockRestore();
  });
});
