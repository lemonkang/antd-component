import type { AxiosRequestConfig } from "axios";
import type { IStringifyOptions } from "qs";
export type CustomProps = {
  axiosConfig?: AxiosRequestConfig;
  getJWTToken?: () => string;
  paramsStringifyOptions?: IStringifyOptions;
  customTokenKey?: string;
};
