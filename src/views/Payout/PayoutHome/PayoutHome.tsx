import { SinglePayoutWithoutChecker } from "@/views/Payout/PayoutHome/SinglePayoutWithoutChecker";
import { useAtomValue } from "jotai";
import atoms from "@/atoms";
import { SinglePayoutWithChecker } from "@/views/Payout/PayoutHome/SinglePayoutWithChecker";
import {
  PayoutPanelControlProvider,
  usePayoutPanelControlCtx,
} from "@/views/Payout/PayoutHome/PayoutPanelControl";
import { ProvidersPipe } from "@/features/ProvidersPipe/ProvidersPipe";
import { TableTabs } from "@/features/Payout/TableTabs/TableTabs";
import { PayoutType } from "@/views/Payout/types";
import { BulkAppliedTransactionsView } from "@/views/Payout/PayoutHome/BulkAppliedTransactionList";

const PayoutHomeInner = () => {
  const hasCheckAuth = useAtomValue(atoms.payout.hasCheckPermission);
  const { type, setType } = usePayoutPanelControlCtx();
  const SinglePayout = hasCheckAuth
    ? SinglePayoutWithChecker
    : SinglePayoutWithoutChecker;

  return (
    <TableTabs
      activeKey={type}
      items={[
        {
          label: "Single payment",
          key: PayoutType.single,
          children: <SinglePayout />,
        },
        {
          label: "Bulk payment",
          key: PayoutType.bulk,
          children: <BulkAppliedTransactionsView />,
        },
        {
          label: "Payout links",
          key: PayoutType.link,
          children: <SinglePayout />,
        },
      ]}
      onTabClick={(key) => {
        setType(key as PayoutType);
      }}
    />
  );
};

export const PayoutHome = ProvidersPipe(PayoutPanelControlProvider)(
  PayoutHomeInner
);
