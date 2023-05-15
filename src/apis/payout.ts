import request from "@apis/request/request";
import type {
  TWithPagination,
  CardNetworkReal,
  CardProduct,
  LockStatus,
} from "@/global-types";

export type Beneficiary = {
  uuid: string;
  beneficiaryName: string;
  contactPersonMobile: string;
  contactPersonEmail: string;
  accountBankName: string;
  accountNumber: string;
};

export type PayFromCard = {
  uuid: string;
  cardHolder: string;
  cardNetwork: CardNetworkReal;
  cardNetworkReal: CardNetworkReal;
  cardNumber: string;
  label: string;
  product: CardProduct;
  balance: string;
  cardLimit: string;
  availableCardLimit: string;
  lockStatus?: LockStatus;
  perTransactionLimitForPayout?: string;
  payoutLimit?: boolean;
  cardPayoutAvailableAmount?: string;
  transactionLimit: string;
};

export type Checker = {
  id: string;
  username: string;
  email: string;
  phone: string;
};

export const getBeneficiaries = async (url: string, search?: string) => {
  return await request.get<TWithPagination<Beneficiary>>(url, {
    params: { page: 1, size: 20, search },
  });
};

export const getCheckers = async (url: string, search?: string) => {
  return await request.get<TWithPagination<Checker>>(url, {
    params: { page: 1, size: 20, search },
  });
};

export type PayoutUserAuth = {
  role: number;
  payoutCheck: boolean;
  txnRead: boolean;
  txnEdit: boolean;
  beneRead: boolean;
  beneEdit: boolean;
  accessControlRead: boolean;
  accessControlEdit: boolean;
  isChecker?: boolean;
  payoutMigrationNotification?: boolean;
  kAccountOpened?: boolean;
};
export const basicAccess = async () => {
  return await request.get<PayoutUserAuth>("/payout/basic/access");
};
export const url = {
  singlePayoutTransactionList: "/payout/txn/single/list",
  singlePayoutAppliedTransactionList: "/payout/txn/single/check/list",
  bulkPayoutTransactionList: "/payout/txn/bulk/records",
};
