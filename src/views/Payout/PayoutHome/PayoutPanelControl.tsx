import { PayoutType, TransactionStatusFilter } from "@/views/Payout/types";
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type State = {
  type: PayoutType;
  typeFilter: Record<PayoutType, TransactionStatusFilter | null>;
  setType: (t: State["type"]) => void;
  setTypeFilter: (s: State["typeFilter"]) => void;
};

const initialState: State = {
  type: PayoutType.single,
  typeFilter: {
    [PayoutType.single]: TransactionStatusFilter.pending,
    [PayoutType.bulk]: TransactionStatusFilter.pending,
    [PayoutType.link]: TransactionStatusFilter.pending,
  },
  setType: () => null,
  setTypeFilter: () => null,
};
const PayoutPanelControlCtx = createContext<State>(initialState);
export const usePayoutPanelControlCtx = () => {
  return useContext(PayoutPanelControlCtx);
};
export const PayoutPanelControlProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [type, setType] = useState<PayoutType>(initialState.type);
  const [typeFilter, setTypeFilter] = useState<State["typeFilter"]>(
    initialState.typeFilter
  );

  return (
    <PayoutPanelControlCtx.Provider
      value={{
        type,
        typeFilter,
        setType,
        setTypeFilter,
      }}
    >
      {children}
    </PayoutPanelControlCtx.Provider>
  );
};
