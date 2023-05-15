export enum Role {
  owner = 1,
  member,
  admin,
  accountant,
}

export enum Notification {
  email = "isSendEmail",
  sms = "isSendSms",
  whatsapp = "isSendWhatsApp",
}

export type TWithPagination<T> = {
  prev: string;
  next: string;
  count: number;
  results: T[];
};

export type CommonListParams = {
  page: number;
  pageSize: number;
  search?: string;
  ordering?: string;
};

export enum CardProduct {
  standard = 1,
  booster,
  wallet,
  kCredit,
  debit = 100,
}

export enum CardNetworkReal {
  master = "master",
  visa = "visa",
  rupay = "rupay",
}

export enum LockStatus {
  Active = 1,
  Locked,
  Blocked,
  Replaced,
  Suspended,
  Terminated,
}