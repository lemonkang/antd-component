import type { ColumnType } from "antd/lib/table";
import type { PayoutBulkTransactionItem } from "@apis/payout.type";
import { createElement } from "react";
import { FullNameWithAvatar } from "@/views/Payout/components/FullNameWithAvatar";

export const useBulkAppliedTransactionColumns = () => {
  const columns: Array<ColumnType<PayoutBulkTransactionItem>> = [
    {
      title: "Create time",
      dataIndex: "createdTime",
    },
    {
      title: "Checker",
      dataIndex: ["checker", "fullName"],
    },
    {
      title: "Transactions",
      dataIndex: "quantity",
    },
    {
      title: "Maker",
      dataIndex: ["payer", "fullName"],
      render(v) {
        return createElement(FullNameWithAvatar, { name: v });
      },
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      align: "right",
    },
    {
      title: "Approve status",
      dataIndex: "approveStatus",
    },
  ];

  return columns;
};
