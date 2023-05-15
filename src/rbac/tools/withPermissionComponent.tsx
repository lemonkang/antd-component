import { useAtom } from "jotai";
import atoms from "@/atoms";
import { withPermission } from "@/packages/rbac-tools";
import type { PermissionRules } from "@/packages/rbac-tools/testPermission";
import type { FC, ReactNode } from "react";
import { createElement } from "react";

type TWithPermissionComponent = {
  rules: PermissionRules;
  component: FC<any> | ReactNode;
};

const WithPermissionComponent = ({
  rules,
  component,
}: TWithPermissionComponent) => {
  const [role] = useAtom(atoms.user.role);
  const WrappedComponent = withPermission(role)(rules)(component);
  return createElement(WrappedComponent);
};

export default WithPermissionComponent;
