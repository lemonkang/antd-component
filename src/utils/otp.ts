export const channelFormatText = (channel: string) => {
  if (channel === "sms") {
    return "phone";
  }
  return channel;
};
