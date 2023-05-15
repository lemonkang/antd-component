import { Role } from "@/global-types";

type KAccountPermission = {
  entry: boolean;
  statements: boolean;
  updateLimit: boolean;
  userList: boolean;
  companyInfo: boolean;
};

export const permission: Record<Role, KAccountPermission> = {
  [Role.owner]: {
    entry: true,
    statements: true,
    updateLimit: true,
    userList: true,
    companyInfo: true,
  },
  [Role.admin]: {
    entry: true,
    statements: true,
    updateLimit: false,
    userList: true,
    companyInfo: true,
  },
  [Role.accountant]: {
    entry: true,
    statements: false,
    updateLimit: false,
    userList: false,
    companyInfo: false,
  },
  [Role.member]: {
    entry: true,
    statements: false,
    updateLimit: false,
    userList: false,
    companyInfo: false,
  },
};
