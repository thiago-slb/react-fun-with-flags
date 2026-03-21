import { useMemo, useState } from 'react';
import {
  Feature,
  FeatureFlagsProvider,
  useFeature,
  type FeatureFlagsMap,
} from '../../../src';

const CheckoutButton = () => {
  const enabled = useFeature('checkoutV2');
  return (
    <button
      style={{
        padding: '10px 14px',
        borderRadius: 8,
        border: 0,
        background: enabled ? '#0f766e' : '#334155',
        color: '#fff',
      }}
    >
      {enabled ? 'Novo checkout' : 'Checkout clássico'}
    </button>
  );
};

export const App = () => {
  const [checkoutV2, setCheckoutV2] = useState(false);
  const [newHeader, setNewHeader] = useState(true);

  const flags = useMemo<FeatureFlagsMap>(
    () => ({
      checkoutV2,
      newHeader,
    }),
    [checkoutV2, newHeader]
  );

  return (
    <FeatureFlagsProvider flags={flags}>
      <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1>react-fun-with-flags playground</h1>

        <label style={{ display: 'block', marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={checkoutV2}
            onChange={(event) => setCheckoutV2(event.target.checked)}
          />{' '}
          checkoutV2
        </label>

        <label style={{ display: 'block', marginBottom: 20 }}>
          <input
            type="checkbox"
            checked={newHeader}
            onChange={(event) => setNewHeader(event.target.checked)}
          />{' '}
          newHeader
        </label>

        <Feature name="newHeader" fallback={<h2>Header legado</h2>}>
          <h2>Header novo</h2>
        </Feature>

        <CheckoutButton />
      </main>
    </FeatureFlagsProvider>
  );
};
