import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

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
        .get("http://localhost:5000/api/v1/auth/refresh")
        .then(({ data }) => {
          localStorage.setItem("accessToken", data.accessToken);
        })
        .catch((err) => err);
    }
    throw new Error();
  }
);

export { $api };
