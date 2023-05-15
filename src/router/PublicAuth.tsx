import { Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import atoms from "@/atoms";

export function PublicAuth() {
  const [isLogin] = useAtom(atoms.user.isLogin);
  if (isLogin) {
    return <Navigate to={"/dashboard"} />;
  }
  return <Outlet />;
}
