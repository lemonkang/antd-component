import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import atoms from "@/atoms";
import type { ReactElement } from "react";

export const PrivateAuth = ({ children }: { children: ReactElement }) => {
  const [isLogin] = useAtom(atoms.user.isLogin);
  if (!isLogin) {
    return <Navigate to={"/sign-in"} />;
  }
  return children;
};
