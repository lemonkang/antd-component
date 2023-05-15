import { useSinglePaymentWithCheckerColumns } from "@/views/Payout/PayoutHome/hooks/useSinglePaymentWithCheckerColumns";
import { AutoEasyTable } from "@components/AutoEasyTable/AutoEasyTable";
import apis from "@/apis";
import type { PayoutAppliedTransactionItem } from "@apis/payout.type";
import {
  ApproveStatus,
  Channel,
  PayoutAppliedTransactionStatus,
} from "@apis/payout.type";
import type { ColumnType } from "antd/lib/table";
import { TransactionFilter } from "@/views/Payout/PayoutHome/components/TransactionFilter";
import { usePayoutPanelControlCtx } from "@/views/Payout/PayoutHome/PayoutPanelControl";
import { PayoutType, TransactionStatusFilter } from "@/views/Payout/types";
import { useTableRowSelections } from "@/hooks/useTableRowSelection";
import type { ComponentProps } from "react";
import { createElement, useMemo } from "react";
import { useAtomValue } from "jotai";
import atoms from "@/atoms";
import { Tag, TagColor } from "@components/Tag/Tag";

const approveStatusFormatter: Partial<
  Record<ApproveStatus, ComponentProps<typeof Tag>>
> = {
  [ApproveStatus.cancelled]: {
    text: "Cancelled",
    type: "text",
    color: TagColor.gray,
  },
  [ApproveStatus.approved]: {
    text: "Approved",
    type: "text",
    color: TagColor.green,
  },
  [ApproveStatus.rejected]: {
    text: "Decline",
    type: "text",
    color: TagColor.red,
  },
};

const paymentStatusFormatter: Partial<
  Record<PayoutAppliedTransactionStatus, ComponentProps<typeof Tag>>
> = {
  [PayoutAppliedTransactionStatus.pending]: {
    text: PayoutAppliedTransactionStatus.pending,
    color: TagColor.blue,
  },
  [PayoutAppliedTransactionStatus.success]: {
    text: PayoutAppliedTransactionStatus.success,
    color: TagColor.green,
  },
  [PayoutAppliedTransactionStatus.fail]: {
    text: "failed",
    color: TagColor.red,
  },
  [PayoutAppliedTransactionStatus.rejected]: {
    text: PayoutAppliedTransactionStatus.rejected,
    color: TagColor.yellow,
  },
  [PayoutAppliedTransactionStatus.issued]: {
    text: PayoutAppliedTransactionStatus.issued,
    color: TagColor.lightBlue,
  },
  [PayoutAppliedTransactionStatus.cancelled]: {
    text: PayoutAppliedTransactionStatus.cancelled,
    color: TagColor.gray,
  },
  [PayoutAppliedTransactionStatus.expired]: {
    text: PayoutAppliedTransactionStatus.expired,
    color: TagColor.purple,
  },
};
const useActions = () => {
  const { type, typeFilter } = usePayoutPanelControlCtx();
  return typeFilter[type] !== TransactionStatusFilter.completed
    ? {
        title: "Operation",
        items: [
          {
            text: "View",
          },
        ],
        props: {
          width: 120,
        },
      }
    : undefined;
};

const useDefaultQueryParams = () => {
  const { type, typeFilter } = usePayoutPanelControlCtx();
  return useMemo(() => {
    const channel = type === PayoutType.single ? Channel.payout : Channel.link;
    return typeFilter[type] !== TransactionStatusFilter.completed
      ? {
          approveStatus: ApproveStatus.submitted,
          channel,
        }
      : {
          approveStatus: [
            ApproveStatus.rejected,
            ApproveStatus.cancelled,
            ApproveStatus.approved,
          ].join(","),
          channel,
        };
  }, [typeFilter, type]);
};
function TransactionList(props: {
  columns: Array<ColumnType<PayoutAppliedTransactionItem>>;
}) {
  const defaultQuery = useDefaultQueryParams();
  const userUuid = useAtomValue(atoms.user.userUuid);
  const rowSelectionConfig =
    useTableRowSelections<PayoutAppliedTransactionItem>({
      keyRetrieve: (record) => record.uuid,
      getCheckboxProps(record) {
        return {
          disabled: record.checker?.uuid !== userUuid,
        };
      },
      dependencies: [defaultQuery],
    });
  const actionConfig = useActions();

  return (
    <div>
      <AutoEasyTable<PayoutAppliedTransactionItem>
        columns={props.columns}
        url={apis.payout.url.singlePayoutAppliedTransactionList}
        defaultQuery={defaultQuery}
        rowSelection={rowSelectionConfig}
        formatter={{
          amount: {
            type: "currency",
            hasUnit: true,
          },
          createdTime: {
            type: "datetime",
          },
          approveStatus: {
            type: "custom",
            render: (record) => {
              let match;
              if (
                !record.approveStatus ||
                !(match = approveStatusFormatter[record.approveStatus])
              ) {
                return "";
              }
              return createElement(Tag, match);
            },
          },
          paymentStatus: {
            type: "custom",
            render: (record) => {
              let match;
              if ((match = paymentStatusFormatter[record.paymentStatus])) {
                return createElement(Tag, match);
              }
            },
          },
        }}
        action={actionConfig}
      />
    </div>
  );
}

export const SinglePayoutWithChecker = () => {
  const columns = useSinglePaymentWithCheckerColumns();
  return (
    <div>
      <div className={"flex justify-between"}>
        <TransactionFilter />
      </div>
      <TransactionList columns={columns} />
    </div>
  );
};
