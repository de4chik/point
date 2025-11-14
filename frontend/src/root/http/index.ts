import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { Cookies } from "react-cookie";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

export interface IApiError {
  message: string;
  statusCode: number;
}

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (config) => config,
  async (err: AxiosError) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & {
      _isRetry?: boolean;
    };

    if (err.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      return axios
        .get("http://localhost:5000/api/v1/auth/refresh", {
          withCredentials: true,
        })
        .then(({ data }) => {
          localStorage.setItem("accessToken", data.accessToken);
        })
        .catch((err: AxiosError<{ statusCode: number }>) => {
          if (err.response?.data.statusCode === 500) {
            toast.error("unknown error");
          }
          if (err.response?.data.statusCode === 401) {
            localStorage.removeItem("accessToken");
            new Cookies().remove("refreshToken");
          }
          return err;
        });
    }

    return Promise.reject(err);
  }
);

export { $api };
