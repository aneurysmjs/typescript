import type { FC, PropsWithChildren } from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { composeProviders, createProvider } from './providerUtils';

// Mock components for testing
const MockProviderA: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="provider-a">{children}</div>
);
const MockProviderB: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="provider-b">{children}</div>
);
const MockProviderC: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="provider-c">{children}</div>
);

describe('providerUtils', () => {
  describe('createProvider', () => {
    it('should create a provider with the given component and props', () => {
      const provider = createProvider(MockProviderA, { someProp: 'value' });

      expect(provider.Component).toBe(MockProviderA);
      expect(provider.props).toEqual({ someProp: 'value' });
    });

    it('should create a provider without props', () => {
      const provider = createProvider(MockProviderB);

      expect(provider.Component).toBe(MockProviderB);
      expect(provider.props).toBeUndefined();
    });
  });

  describe('composeProviders', () => {
    it('should compose multiple providers and render children', () => {
      const providers = [
        createProvider(MockProviderA, { someProp: 'valueA' }),
        createProvider(MockProviderB, { someProp: 'valueB' }),
        createProvider(MockProviderC, { someProp: 'valueC' }),
      ];

      const ComposedProvider = composeProviders(providers);

      const { getByTestId } = render(
        <ComposedProvider>
          <div data-testid="child">Child Component</div>
        </ComposedProvider>,
      );

      // Check if the child is rendered
      expect(getByTestId('child')).toBeInTheDocument();

      // Check if the providers are rendered in the correct order
      const providerC = getByTestId('provider-c');
      const providerB = getByTestId('provider-b');
      const providerA = getByTestId('provider-a');

      expect(providerC).toBeInTheDocument();
      expect(providerB).toBeInTheDocument();
      expect(providerA).toBeInTheDocument();

      // Check the nesting
      expect(providerC).toContainElement(getByTestId('child'));
      expect(providerB).toContainElement(providerC);
      expect(providerA).toContainElement(providerB);
    });

    it('should handle an empty array of providers', () => {
      const ComposedProvider = composeProviders([]);

      const { getByText } = render(
        <ComposedProvider>
          <div data-testid="child">Child Component</div>
        </ComposedProvider>,
      );

      // Check if the child is rendered without any providers
      expect(getByText('Child Component')).toBeInTheDocument();
    });
  });
});
