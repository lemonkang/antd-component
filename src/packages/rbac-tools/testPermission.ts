import type { Role } from "@/global-types";
import { getPermissions } from "@/rbac";
import { getPath } from "@/packages/rbac-tools/util";

export type PermissionRules = string | string[];

export const testPermission = (role: Role) => (rules: PermissionRules) => {
  const rolePermissionTree = getPermissions(role);
  rules = Array.isArray(rules) ? rules : [rules];
  return rules.every((rule) => !!getPath(rolePermissionTree, rule));
};
