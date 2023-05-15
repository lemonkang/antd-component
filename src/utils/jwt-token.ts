import utils from "@utils/index";
import apis from "@/apis";

const key = import.meta.env.VITE_JWT_TOKEN;

export const get = () => {
  return localStorage.getItem(key);
};

export const set = (value: string) => {
  localStorage.setItem(key, value);
};

export const remove = () => {
  localStorage.removeItem(key);
};

const getToken = () => {
  return (
    utils.jwtToken.get() ??
    new URL(window.location.href).searchParams.get("token")
  );
};

export const refreshToken = async () => {
  const token = getToken();
  if (!token) return false;
  const { token: newToken } = await apis.auth.refreshToken(token);
  if (newToken) {
    utils.jwtToken.set(newToken);
  }
  return Boolean(newToken);
};
