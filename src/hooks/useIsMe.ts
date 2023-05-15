import { useAtomValue } from "jotai";
import atoms from "@/atoms";

export const useIsMe = (uuid?: string) => {
  const basicInfo = useAtomValue(atoms.user.basicInfo);
  const isMe = (uuid?: string) => basicInfo?.uuid === uuid;
  return {
    isMe,
    isMeFlag: isMe(uuid),
  };
};
