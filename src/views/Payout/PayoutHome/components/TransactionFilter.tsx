import { BoxRadioGroup } from "@/features/BoxRadioGroup/BoxRadioGroup";
import { TransactionStatusFilter } from "@/views/Payout/types";
import { usePayoutPanelControlCtx } from "@/views/Payout/PayoutHome/PayoutPanelControl";

export const TransactionFilter = () => {
  const { typeFilter, type, setTypeFilter } = usePayoutPanelControlCtx();
  const currentFilter = typeFilter[type];
  return (
    <BoxRadioGroup
      options={[
        {
          value: `${TransactionStatusFilter.pending}`,
          label: "Pending approval",
        },
        {
          value: `${TransactionStatusFilter.completed}`,
          label: "Completed approval",
        },
      ]}
      value={typeof currentFilter === "number" ? `${currentFilter}` : undefined}
      onChange={(v) => {
        setTypeFilter({
          ...typeFilter,
          [type]: Number(v),
        });
      }}
    />
  );
};
