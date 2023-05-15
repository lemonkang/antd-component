import { PayoutType } from "@/views/Payout/types";
import { Channel } from "@apis/payout.type";
import { usePayoutPanelControlCtx } from "@/views/Payout/PayoutHome/PayoutPanelControl";

export const useChannel = () => {
  const { type } = usePayoutPanelControlCtx();
  return type === PayoutType.single ? Channel.payout : Channel.link;
};
