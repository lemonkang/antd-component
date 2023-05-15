export type PayoutTransactionItem = {
  amount: string;
  beneficiary: string;
  beneficiaryName: string;
  description: string;
  dueTime: string;
  invoices: string[];
  lastEditorName: string;
  method: "any";
  payFrom: "karbon_debit_card";
  payFromCard: string | null;
  plannedDueTime: string | null;
  purpose: string | null;
  status: PayoutTransactionStatus;
  statusDetails: string | null;
  surcharge: string;
  transferId: string | null;
  trigger: "immediate";
  uuid: string;
  createdTime: string;
};

export enum Channel {
  payout = "Payout",
  link = "Payout links",
}

export enum PayoutTransactionStatus {
  success = "success",
  fail = "fail",
  pending = "pending",
}
export enum PayoutAppliedTransactionStatus {
  success = "success",
  pending = "pending",
  fail = "fail",
  rejected = "rejected",
  applied = "applied",
  issued = "issued",
  cancelled = "cancelled",
  expired = "expired",
}
export enum ApproveStatus {
  approved = "approved",
  rejected = "rejected",
  submitted = "submitted",
  cancelled = "cancelled",
}
export type PayoutAppliedTransactionItem = {
  uuid: string;
  beneficiaryId: string;
  beneficiaryName: string;
  amount: string;
  createdTime: string;
  creator: {
    uuid: string;
    fullName: string;
  };
  checker: {
    uuid: string;
    fullName: string;
  } | null;
  approveStatus: ApproveStatus | null;
  paymentStatus: PayoutAppliedTransactionStatus;
};

export type PayoutBulkTransactionItem = {
  uuid: string;
  quantity: number;
  totalAmount: string;
  createdTime: string;
  payer: {
    uuid: string;
    fullName: string;
  };
  failedTxnsCount: number;
  checker: null | { uuid: string; fullName: string };
  approveStatus: ApproveStatus;
  payType: string;
};
