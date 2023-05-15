import request from "@apis/request/request";
import type { Notification } from "@/global-types";
type JoinCompanyStatus = "submitted" | "approved" | "rejected" | "cancelled";
export type BasicInfo = {
  uuid: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  phoneAreaCode: string;
  whatsAppNumber: string | null;
  fullName: string;
  caOpened?: boolean;
  companyId: null | number;
  clientPhoto: string;
  companyLogo: string;
  joinCompany: {
    id: number;
    companyId: number;
    status: JoinCompanyStatus;
    companyLegalName: string;
  } | null;
};
export const getUserInfo = async () => {
  return await request.get<BasicInfo>("/users/basic");
};

export const updatePhone = async (payload: { otp: string; phone: string }) => {
  return await request.put("/users/update-phone", payload);
};

export const updateWhatsapp = async (payload: {
  newWhatsapp: string;
  otp: string;
}) => {
  return await request.post("/users/whatsapp", payload);
};

export const updateEmail = async (payload: {
  email: string;
  otpCode: string;
}) => {
  const endPoint = "/users/email";
  return await request.put(endPoint, payload);
};

export const getDetailInfo = async () => {
  return await request.get<Record<Notification, boolean>>("/users/detail-info");
};
