import type { ColumnType } from "antd/lib/table";
import type { PayoutAppliedTransactionItem } from "@apis/payout.type";
import { createElement, useMemo } from "react";
import { FullNameWithAvatar } from "@/views/Payout/components/FullNameWithAvatar";
import { usePayoutPanelControlCtx } from "@/views/Payout/PayoutHome/PayoutPanelControl";
import { PayoutType, TransactionStatusFilter } from "@/views/Payout/types";

export const useSinglePaymentWithCheckerColumns = () => {
  const { type, typeFilter } = usePayoutPanelControlCtx();
  const columns: Array<ColumnType<PayoutAppliedTransactionItem>> = [
    {
      title: "Beneficiary",
      dataIndex: "beneficiaryName",
    },

    {
      title: "Time created",
      dataIndex: "createdTime",
    },
    {
      title: "Maker",
      dataIndex: ["creator", "fullName"],
    },
    {
      title: "Checker",
      dataIndex: ["checker", "fullName"],
      render: (v: string) => {
        return createElement(FullNameWithAvatar, { name: v });
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      align: "right",
    },
  ];

  const approvedColumns = (type: PayoutType) => {
    return [
      {
        title: "Approval status",
        dataIndex: "approveStatus",
      },
      {
        title: type === PayoutType.link ? "Link status" : "Payment status",
        dataIndex: "paymentStatus",
      },
    ] as Array<ColumnType<PayoutAppliedTransactionItem>>;
  };

  return useMemo(() => {
    const isApproved = typeFilter[type] === TransactionStatusFilter.completed;
    if (!isApproved) {
      return columns;
    }
    return columns.concat(approvedColumns(type));
  }, [typeFilter, type]);
};
