import { createElement } from 'react';
import { expectAssignable, expectType } from 'tsd';
import {
  Feature,
  FeatureFlagsProvider,
  useFeature,
  useFeatureFlagsState,
  type FeatureFlagsMap,
  type FeatureFlagsProviderProps,
  type UseFeatureOptions,
} from '../src';

expectAssignable<FeatureFlagsMap>({ checkoutV2: true });

expectAssignable<UseFeatureOptions>({ defaultValue: true });
expectAssignable<FeatureFlagsProviderProps>({
  children: null,
  flags: { checkoutV2: false },
  warnOnMissing: true,
});

expectAssignable<ReturnType<typeof createElement>>(
  createElement(
    FeatureFlagsProvider,
    { flags: { checkoutV2: true } },
    createElement(Feature, { name: 'checkoutV2' }, 'enabled')
  )
);

expectType<boolean>(useFeature('checkoutV2'));
expectType<boolean>(useFeature('missing', { defaultValue: true }));

expectType<{ isLoading: boolean; error: unknown | null }>(useFeatureFlagsState());
