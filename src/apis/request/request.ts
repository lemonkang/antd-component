import customAxios from "@/packages/easy-request/custom-axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import errorHandler from "@apis/request/error-handler";
import utils from "@/utils";
const ErrorCode = {
  INVALID: [401, 477],
  EXPIRED: [478],
};
const request = customAxios({
  axiosConfig: {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  },
  getJWTToken() {
    return utils.jwtToken.get() ?? "";
  },
  refreshInterceptor: {
    refreshAbortCondition(request) {
      return Boolean(request.url?.includes("/auth/token/refreshsliding"));
    },
    refreshCondition(res) {
      return ErrorCode.EXPIRED.includes(res.status);
    },
    async refreshTokenCall(axios) {
      const token = utils.jwtToken.get();
      await axios
        .post<{ token: string }>(
          "/auth/token/refreshsliding",
          { token },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          utils.jwtToken.set(res.data.token);
        });
    },
  },
});

const basicFetch = async <T>(config: AxiosRequestConfig) => {
  try {
    return (await request<T>(config)).data;
  } catch (e) {
    const error = e as AxiosError;
    const { response } = error;

    const errorData = response?.data;
    error.message = errorHandler(errorData);
    throw error;
  }
};

const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  return await basicFetch<T>({
    method: "get",
    url,
    ...config,
  });
};

const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return await basicFetch<T>({
    method: "post",
    url,
    data,
    ...config,
  });
};

const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return await basicFetch<T>({
    method: "put",
    url,
    data,
    ...config,
  });
};

export default {
  get,
  post,
  put,
  custom: basicFetch,
};
