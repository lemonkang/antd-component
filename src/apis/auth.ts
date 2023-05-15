import request from "@apis/request/request";

export const sendOTP = async (value: string, config?: { channel: string }) => {
  return await request.post(`/otp/login/${config?.channel ?? "email"}/send`, {
    email: value,
  });
};

export const login = async ({
  channel,
  otp,
  value,
}: {
  channel?: string;
  value: string;
  otp: string;
}) => {
  return await request.post<{ token: string }>(
    `/users/${channel ?? "email"}/login`,
    { email: value, otp }
  );
};

export const refreshToken = async (token: string) => {
  return await request.post<{ token: string }>("/auth/token/refreshsliding", {
    token,
  });
};

export const logout = async (token: string) => {
  return await request.post("/auth/token/revokesliding", { token });
};
