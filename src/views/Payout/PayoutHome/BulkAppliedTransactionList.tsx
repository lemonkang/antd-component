import { AutoEasyTable } from "@components/AutoEasyTable/AutoEasyTable";
import { useBulkAppliedTransactionColumns } from "@/views/Payout/PayoutHome/hooks/useBulkAppliedTransactionColumns";
import apis from "@/apis";
import { useIsMe } from "@/hooks/useIsMe";
import { TransactionFilter } from "@/views/Payout/PayoutHome/components/TransactionFilter";
import { usePayoutPanelControlCtx } from "@/views/Payout/PayoutHome/PayoutPanelControl";
import { createElement, useMemo } from "react";
import { TransactionStatusFilter } from "@/views/Payout/types";
import { ApproveStatus } from "@apis/payout.type";
import { Tag, TagColor } from "@components/Tag/Tag";

const useDefaultQueryParams = () => {
  const { type, typeFilter } = usePayoutPanelControlCtx();
  const currentFilter = typeFilter[type];
  return useMemo(() => {
    const isCompleted = currentFilter === TransactionStatusFilter.completed;
    return Object.values(ApproveStatus)
      .filter((i) => {
        console.log(i);
        if (isCompleted) {
          return i !== ApproveStatus.submitted;
        }
        return i === ApproveStatus.submitted;
      })
      .join(",");
  }, [currentFilter]);
};
export const BulkAppliedTransactionList = () => {
  const columns = useBulkAppliedTransactionColumns();
  const isMe = useIsMe();
  const defaultQuery = useDefaultQueryParams();
  const { typeFilter, type } = usePayoutPanelControlCtx();
  const inPending = typeFilter[type] === TransactionStatusFilter.pending;
  const filteredColumns = columns.filter((column) => {
    return !(column.dataIndex === "approveStatus" && inPending);
  });
  return (
    <AutoEasyTable
      columns={filteredColumns}
      defaultQuery={{
        approveStatus: defaultQuery,
      }}
      formatter={{
        createdTime: {
          type: "datetime",
        },
        totalAmount: {
          type: "currency",
          hasUnit: true,
        },
        approveStatus: {
          type: "enum",
          enum: {
            [ApproveStatus.approved]: (value) => {
              return createElement(Tag, {
                text: value as string,
                color: TagColor.green,
              });
            },
            [ApproveStatus.cancelled]: (value) => {
              return createElement(Tag, {
                text: value as string,
                color: TagColor.gray,
              });
            },
            [ApproveStatus.rejected]: (value) => {
              return createElement(Tag, {
                text: value as string,
                color: TagColor.red,
              });
            },
          },
        },
      }}
      action={
        !inPending
          ? undefined
          : {
              items: [
                {
                  text: "View",
                  visible: (record) => isMe.isMe(record.checker?.uuid),
                },
                {
                  text: "Review",
                  className: "text-warning",
                  visible: (record) => !isMe.isMe(record.checker?.uuid),
                },
              ],
            }
      }
      url={apis.payout.url.bulkPayoutTransactionList}
    />
  );
};

export const BulkAppliedTransactionsView = () => {
  return (
    <div>
      <div className={"flex"}>
        <TransactionFilter />
      </div>
      <BulkAppliedTransactionList />
    </div>
  );
};
