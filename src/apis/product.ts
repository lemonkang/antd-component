import request from "@apis/request/request";
import type { Role } from "@/global-types";

type InviteType = {
  usage: ApplicationStatus["product"];
  threshold?: number;
  transactionLimit: number;
  cardNetwork: ApplicationStatus["cardNetwork"];
  isInvitation: boolean;
};
export type ApplicationStatus = {
  clientId: string;
  companyId: string;
  kycType: string;
  companyPanStatus: boolean;
  companyDetailStatus: boolean;
  companyDirectorFileStatus: boolean;
  companyNewBrStatus: boolean;
  companyDirectorStatus: boolean;
  companyBoardResolutionStatus: boolean;
  companyBankStatementStatus: boolean;
  personalPanNumberStatus: boolean;
  personalPanFileStatus: boolean;
  personalAadhaarFileStatus: boolean;
  ekycPackageStatus: boolean;
  personalUserDetailInfo: boolean;
  sbmFormApplication: boolean;
  submitted: boolean;
  SignaturesTerms: boolean;
  role: Role;
  kycRejectedFlag: boolean;
  cardIssueFlag: boolean;
  product: null | number;
  hasStandard: boolean;
  hasBooster: boolean;
  hasCashback: boolean;
  hasWallet: boolean;
  isAccountant?: boolean;
  isEditNach: boolean;
  hasPayoutkyc: boolean; // 是否以k-account 进入dashboard
  kycAfterPayoutkyc: boolean; // kaccount 进入dashboard后 申请第二张卡，重新开始kyc
  kaccountCompanyinfo: boolean;
  hasKAccountKyc: boolean;
  postcodeStatus: boolean;
  companyType: number;
  isOldUser: boolean;
  hasKCredit: boolean;
  cardNetwork: string;
  invitationProduct: InviteType;
  standardSubmitted: boolean; // 是否提交该卡申请
  cashbackSubmitted: boolean;
  boosterSubmitted: boolean;
};
export const getApplicationStatus = async () => {
  return await request.get<ApplicationStatus>("/product/application-status");
};
