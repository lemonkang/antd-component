import type { ComponentType, FC, ReactNode } from "react";
import { isValidElement } from "react";
import { testPermission } from "@/packages/rbac-tools/index";
import type { Role } from "@/global-types";
import type { PermissionRules } from "@/packages/rbac-tools/testPermission";

const withPermission =
  (role: Role) =>
  (rules: PermissionRules) =>
  <P extends Record<string, unknown>>(
    Component: ComponentType<P> | ReactNode
  ): FC<P> => {
    function WrapComponent(props: P) {
      const isPermission = testPermission(role)(rules);
      if (isPermission) {
        if (isValidElement(Component)) {
          return Component;
        } else if (typeof Component === "function") {
          return <Component {...props} />;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    return WrapComponent;
  };

export default withPermission;
