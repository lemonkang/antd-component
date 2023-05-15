import type { ReactElement } from "react";
import utils from "@/utils";
import { useAtom } from "jotai";
import atoms from "@/atoms";
import { useMount } from "ahooks";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import type { AxiosError } from "axios";

export const Bootstrap = ({ children }: { children: ReactElement }) => {
  const [systemInitialing] = useAtom(atoms.system.systemInitialing);
  useBootstrap();
  if (systemInitialing) {
    return <div>init...</div>;
  }
  return children;
};

const useBootstrap = () => {
  const [, setSystemInitialing] = useAtom(atoms.system.systemInitialing);
  const [, setIsLogin] = useAtom(atoms.user.isLogin);
  const authenticate = useAuthenticate();

  useMount(() => {
    const bootstrap = async () => {
      setSystemInitialing(true);
      try {
        const hasToken = await utils.jwtToken.refreshToken();
        if (hasToken) {
          setIsLogin(true);
          await authenticate();
        }
      } catch (e) {
        if ((e as AxiosError).status === 401) {
          setIsLogin(false);
          utils.jwtToken.remove();
        }
      }
      setSystemInitialing(false);
    };
    bootstrap().then();
  });
};
