import { atomWithImmer } from "jotai-immer";
import type { PayoutUserAuth } from "@apis/payout";
import { atom } from "jotai";

export const basicAccess = atomWithImmer<PayoutUserAuth | undefined>(undefined);

export const hasCheckPermission = atom((get) => {
  const access = get(basicAccess);
  return Boolean(access?.payoutCheck);
});
