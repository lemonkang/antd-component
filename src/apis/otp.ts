import request from "./request/request";
import utils from "@/utils";

export const sendOTP = async ({
  value,
  channel = "email",
  ...others
}: { value: string; channel?: string } & Record<string, string>) => {
  return await request.post(`/otp/${channel}/send`, {
    [utils.otp.channelFormatText(channel)]: value,
    ...others,
  });
};
