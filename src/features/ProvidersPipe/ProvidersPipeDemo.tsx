import type { FunctionComponent, ReactNode } from "react";
import { ProvidersPipe } from "@/features/ProvidersPipe/ProvidersPipe";

type Provider = { children: ReactNode };
const P1: FunctionComponent<Provider> = ({ children }) => {
  return (
    <div>
      <div>1</div>
      {children}
    </div>
  );
};
const P2: FunctionComponent<Provider> = ({ children }) => {
  return (
    <div>
      <div>2</div>
      {children}
    </div>
  );
};
const Name = ({ text }: { text: string }) => {
  return <p>name: {text}</p>;
};
const Test = ProvidersPipe(P1, P2)(Name);

export const ProvidersPipeDemo = () => {
  return <Test text={"vito"} />;
};
