import type {
  ComponentProps,
  ComponentType,
  FunctionComponent,
  ReactNode,
} from "react";
import { createElement } from "react";

type TProviders = Array<FunctionComponent<{ children: ReactNode }>>;
export const ProvidersPipe = (...Providers: TProviders) => {
  return <T extends Record<string, unknown>>(Component: ComponentType<T>) => {
    return (props?: ComponentProps<typeof Component>) => {
      return createWrapper<T>(Component, Providers, props);
    };
  };
};

const createWrapper = <T extends Record<string, unknown>>(
  Component: ComponentType<T>,
  Providers: TProviders,
  props?: ComponentProps<typeof Component>
): JSX.Element => {
  if (Providers.length < 1) {
    return createElement<T>(Component, props);
  }
  const TheOuterProvider = Providers[0];
  const remainingProviders = Providers.slice(1);
  return createElement(TheOuterProvider, {
    children: createWrapper(Component, remainingProviders, props),
  });
};
