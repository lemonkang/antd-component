import type { ColumnType } from "antd/lib/table";
import type { PayoutTransactionItem } from "@apis/payout.type";

export const useSinglePaymentColumns = () => {
  const columns: Array<ColumnType<PayoutTransactionItem>> = [
    {
      dataIndex: "beneficiaryName",
      title: "Beneficiary",
    },
    {
      dataIndex: "amount",
      title: "Amount",
    },
    {
      title: "Time created",
      dataIndex: "createdTime",
    },
    {
      title: "Payment status",
      dataIndex: "status",
    },
  ];
  return columns;
};
