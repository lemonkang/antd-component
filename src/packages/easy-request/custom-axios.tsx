import type { CustomProps } from "@/packages/easy-request/types";
import axios from "axios";
import easyRequestUtils from "@/packages/easy-request/utils";
import qs from "qs";
import { createAuthRefreshInterceptor } from "@/packages/easy-request/jwt-interceptor";

type RefreshRequiredProps = Parameters<typeof createAuthRefreshInterceptor>[1];

function customAxios({
  axiosConfig,
  getJWTToken,
  paramsStringifyOptions,
  refreshInterceptor,
  customTokenKey = "customToken",
}: CustomProps & {
  refreshInterceptor?: RefreshRequiredProps;
}) {
  const _axios = axios.create({
    ...axiosConfig,
  });
  _axios.interceptors.request.use((request) => {
    const Authorization = request.headers.Authorization;
    if (getJWTToken && Authorization !== false) {
      const token = getJWTToken();
      const customToken = easyRequestUtils.getCustomTokenFromSearchParams(
        request.url ?? "",
        customTokenKey
      );
      request.headers.setAuthorization(`Bearer ${customToken || token}`);
    }
    return request;
  });

  _axios.interceptors.request.use((request) => {
    const method = request.method?.toLowerCase();
    if (["put", "post", "delete"].includes(method ?? "") && request.data) {
      const contentType = easyRequestUtils.getHeaderContentType(request.data);
      request.headers.setContentType(contentType);
    }
    return request;
  });

  _axios.defaults.transformRequest = function (data: any, headers) {
    const contentType = headers.getContentType();
    if (data) {
      if (contentType?.includes("json")) {
        data = JSON.stringify(
          easyRequestUtils.dataStyleTransfer(data, "snake")
        );
      } else if (contentType?.includes("form")) {
        const formData = new FormData();
        const rawFormData = data as FormData;
        rawFormData.forEach((value, key) => {
          formData.set(easyRequestUtils.camelCaseToSnakeCase(key), value);
        });
        data = formData;
      }
    }
    return data;
  };

  _axios.defaults.transformResponse = function (data, headers) {
    const contentType = headers.getContentType();
    if (contentType?.includes("json") && data) {
      return easyRequestUtils.dataStyleTransfer(JSON.parse(data), "camel");
    }
    return data;
  };

  if (!_axios.defaults.paramsSerializer) {
    _axios.defaults.paramsSerializer = {
      serialize(params) {
        if (params) {
          return qs.stringify(
            easyRequestUtils.dataStyleTransfer(params, "snake"),
            {
              encode: false,
              arrayFormat: "comma",
              ...paramsStringifyOptions,
            }
          );
        }
        return "";
      },
    };
  }
  if (refreshInterceptor) {
    createAuthRefreshInterceptor(_axios, refreshInterceptor);
  }
  return _axios;
}

export default customAxios;
