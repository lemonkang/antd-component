import { atom } from "jotai";
import type { BasicInfo } from "@apis/user";
import type { ApplicationStatus } from "@apis/product";
import { Notification, Role } from "@/global-types";
import { atomWithImmer } from "jotai-immer";

export const isLogin = atom(false);
export const basicInfo = atomWithImmer<BasicInfo | undefined>(undefined);
export const applicationInfo = atom<ApplicationStatus | undefined>(undefined);
export const notificationSetting = atomWithImmer<Record<Notification, boolean>>(
  {
    [Notification.email]: false,
    [Notification.sms]: false,
    [Notification.whatsapp]: false,
  }
);

export const hasCard = atom((get) => {
  const application = get(applicationInfo);
  if (!application) return false;
  return Boolean(
    application.hasStandard ??
      application.hasBooster ??
      application.hasCashback ??
      (application.hasKAccountKyc && application.role === Role.owner)
  );
});

export const role = atom((get) => get(applicationInfo)?.role ?? Role.member);

export const phoneWithCode = atom((get) => {
  const info = get(basicInfo);
  if (!info?.phone) {
    return "";
  }
  return `${info.phoneAreaCode} ${info.phone}`.trim();
});

export const userUuid = atom((get) => {
  return get(basicInfo)?.uuid;
});
