import axios, { AxiosResponse } from "axios";

import { getToken } from "utils/session/sessionStorageManager";

// import AppStore from 'app/_redux/store';

// import { signOut } from 'features/authSlices';

export const InternalError = {
  message: "Internal error during request.",
};

export const onFulfilledRequest = (response: AxiosResponse) => response;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onRejectedResponse = (error: any) => {
  if (error.code === "ERR_NETWORK") {
    return Promise.reject({ message: "Can not Access Server!" });
  }
  if (error.response?.status && error.response?.status === 404) {
    return Promise.reject({ message: "Not Found" });
  }
  if (error.response?.status && error.response?.status === 400) {
    if (error.response?.data && error.response?.data?.message) {
      return Promise.reject({ message: error.response.data.message });
    }
    return Promise.reject({ message: "Bad Request" });
  }
  if (error.response?.status && error.response?.status === 401) {
    return Promise.reject({ message: "Unauthorized" });
  }
  // if (error.response.status && error.response.status === 403) {
  //   store.dispatch(signOut());
  //   return Promise.reject({ message: 'Invalid Token' });
  // }
  return error; //Promise.reject(InternalError);
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const authToken = getToken(); //makeStore.auth?.coreAuth;

  if (authToken) {
    const token = `Bearer ${authToken}`;

    // axios 신규 버전부터 AxiosRequestConfig -> InternalAxiosRequestConfig로 변경
    // https://www.jsdocs.io/package/axios#AxiosHeaders.setAuthorization
    config.headers.Authorization = token;
    // config.setAuthorization = { ...config.headers, Authorization: `Bearer ${auth.jwt}` };
  }
  return config;
});
apiClient.interceptors.response.use(onFulfilledRequest, onRejectedResponse);

export default apiClient;
