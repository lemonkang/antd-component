import { permission as KAccountPermission } from "./kAccount";
import type { Role } from "@/global-types";

export const getPermissions = (role: Role) => {
  const kAccount = KAccountPermission[role];
  return { kAccount };
};
