import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

/**
 * Creates an authentication refresh interceptor that binds to any error response.
 * If the response code is 401, interceptor tries to call the refreshTokenCall which must return a Promise.
 * While refreshTokenCall is running, all new requests are intercepted and waiting for it to resolve.
 * After Promise is resolved/rejected the authentication refresh interceptor is revoked.
 */
let refreshCallNum = 0;
export const createAuthRefreshInterceptor = (
  axios: AxiosInstance,
  {
    refreshTokenCall,
    refreshCondition,
    refreshAbortCondition,
  }: {
    refreshTokenCall: (axios: AxiosInstance) => Promise<unknown>;
    refreshCondition: (response: AxiosResponse) => boolean;
    refreshAbortCondition?: (request: AxiosRequestConfig) => boolean;
  }
) => {
  const id = axios.interceptors.response.use(
    (res) => res,
    async (error) => {
      // Reject promise if the error status is not in options.ports or defaults.ports
      if (!refreshCondition(error.response)) {
        throw error;
      }

      // Remove the interceptor to prevent a loop
      // in case token refresh also causes the 401
      axios.interceptors.response.eject(id);

      const refreshCall = refreshTokenCall(axios);
      refreshCallNum++;

      // Create interceptor that will bind all the others requests
      // until refreshTokenCall is resolved
      const requestQueueInterceptorId = axios.interceptors.request.use(
        async (request) =>
          await refreshCall.then(() => {
            const abortController = new AbortController();
            if (refreshAbortCondition?.(request) && refreshCallNum >= 1) {
              abortController.abort();
            }
            // make sure add the newest token
            request.headers.setAuthorization(null);

            return {
              ...request,
              signal: abortController.signal,
            };
          })
      );

      // When response code is 476 (Unauthorized), try to refresh the token.
      return await refreshCall
        .then(async () => {
          axios.interceptors.request.eject(requestQueueInterceptorId);
          refreshCallNum--;
          return await axios(error.response.config);
        })
        .catch(async (error: AxiosError) => {
          axios.interceptors.request.eject(requestQueueInterceptorId);
          refreshCallNum--;
          throw error;
        })
        .finally(() =>
          createAuthRefreshInterceptor(axios, {
            refreshTokenCall,
            refreshCondition,
            refreshAbortCondition,
          })
        );
    }
  );
  return axios;
};
