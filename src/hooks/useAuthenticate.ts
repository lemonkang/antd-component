import { useAtom, useSetAtom } from "jotai";
import atoms from "@/atoms";
import apis from "@/apis";
import { Role } from "@/global-types";

export const useAuthenticate = () => {
  const [, setInit] = useAtom(atoms.system.systemInitialing);
  const setUserInfo = useSetAtom(atoms.user.basicInfo);
  const setApplicationStatus = useSetAtom(atoms.user.applicationInfo);
  const setProductInfo = useSetAtom(atoms.company.productInfo);
  const setNotificationSetting = useSetAtom(atoms.user.notificationSetting);
  const setPayoutAccess = useSetAtom(atoms.payout.basicAccess);
  return async () => {
    setInit(true);
    try {
      const userInfo = await apis.user.getUserInfo();
      setUserInfo(userInfo);
      if (userInfo.companyId ?? userInfo.joinCompany) {
        const applicationStatus = await apis.product.getApplicationStatus();
        setApplicationStatus(applicationStatus);
        const notificationData = await apis.user.getDetailInfo();
        setNotificationSetting(notificationData);
        const payoutAuthData = await apis.payout.basicAccess();
        setPayoutAccess(payoutAuthData);
        if (applicationStatus.role !== Role.member) {
          const productInfo = await apis.company.getProductInfo();
          setProductInfo(productInfo);
        }
      }
    } catch (e) {
      window.location.href = "/sign-in";
    } finally {
      setInit(false);
    }
  };
};
