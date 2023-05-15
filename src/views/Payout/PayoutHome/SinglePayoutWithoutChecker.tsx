import { useSinglePaymentColumns } from "@/views/Payout/PayoutHome/hooks/useSinglePaymentColumns";
import { PayoutTransactionStatus } from "@apis/payout.type";
import { AutoEasyTable } from "@components/AutoEasyTable/AutoEasyTable";
import utils from "@/utils";
import apis from "@/apis";
import { useChannel } from "@/views/Payout/PayoutHome/hooks/useChannel";

const statusEnum: Record<PayoutTransactionStatus, string> = {
  [PayoutTransactionStatus.success]: "text-success",
  [PayoutTransactionStatus.fail]: "text-error",
  [PayoutTransactionStatus.pending]: "text-primary",
};
export const SinglePayoutWithoutChecker = () => {
  const columns = useSinglePaymentColumns();
  const channel = useChannel();
  return (
    <AutoEasyTable
      formatter={{
        createdTime: {
          type: "datetime",
        },
        status: {
          capitalize: true,
          type: "specifiedClassName",
          enum: statusEnum,
        },
        amount: {
          type: "currency",
          hasUnit: true,
        },
      }}
      filter={{
        status: {
          options: [
            PayoutTransactionStatus.success,
            PayoutTransactionStatus.pending,
            PayoutTransactionStatus.fail,
          ].map((i) => ({
            value: i,
            text: utils.string.capitalizeFirstLetter(i),
          })),
          multiple: true,
        },
      }}
      columns={columns}
      url={apis.payout.url.singlePayoutTransactionList}
      rowKey={"uuid"}
      defaultQuery={{
        channel,
      }}
    />
  );
};
