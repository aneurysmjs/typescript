/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/**
 * @see https://gist.github.com/phatnguyenuit/68122170e317d13e7148c7563be021b6
 */
import type { ComponentType, FC, JSX, PropsWithChildren } from 'react';

interface Provider<TProps> {
  Component: ComponentType<PropsWithChildren<TProps>>;
  props?: Omit<TProps, 'children'>;
}

export function createProvider<TProps>(
  Component: ComponentType<PropsWithChildren<TProps>>,
  props?: Omit<TProps, 'children'>,
): Provider<TProps> {
  return { Component, props };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function composeProviders<TProviders extends Provider<any>[]>(
  providers: TProviders,
): ComponentType<PropsWithChildren> {
  const Provider: FC<PropsWithChildren> = ({ children }) => {
    const initialJSX = <>{children}</>;

    return providers.reduceRight<JSX.Element>(
      (prevJSX, { Component: CurrentProvider, props = {} }) => (
        <CurrentProvider {...props}>{prevJSX}</CurrentProvider>
      ),
      initialJSX,
    );
  };

  return Provider;
}
