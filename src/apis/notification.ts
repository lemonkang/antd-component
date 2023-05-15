import request from "@apis/request/request";
import { Notification } from "@/global-types";
import utils from "@/utils";

export const switchNotificationSetting = async ({
  isOn,
  channel = Notification.email,
}: {
  isOn: boolean;
  channel?: Notification;
}) => {
  const snakeCaseChannel = utils.string.camelToSnake(channel);
  return await request.put(
    `/notification/${snakeCaseChannel.replace(/_/g, "-")}`,
    {
      [snakeCaseChannel]: isOn,
    }
  );
};
