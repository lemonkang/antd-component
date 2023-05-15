import { useRequest } from "ahooks";
import utils from "@/utils";
import apis from "@/apis";
import { message } from "antd";

export const useLogout = () => {
  return useRequest(
    async () => {
      const token = utils.jwtToken.get();
      await apis.auth.logout(token ?? "");
    },
    {
      manual: true,
      onSuccess() {
        utils.jwtToken.remove();
        window.location.reload();
      },
      onError(e) {
        message.error(e.message).then();
      },
    }
  );
};
