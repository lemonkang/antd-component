import { testPermission, withPermission } from "@/packages/rbac-tools";
import { useAtom } from "jotai";
import atoms from "@/atoms";
import type { PermissionRules } from "@/packages/rbac-tools/testPermission";

export function usePermission(rules: PermissionRules) {
  const [role] = useAtom(atoms.user.role);
  const withPermissionWrap = withPermission(role)(rules);
  const isPermission = testPermission(role)(rules);
  return { withPermissionWrap, isPermission };
}
