import { $api, IApiError } from "@/root/http";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IUser } from "./user";
import { toast } from "sonner";

export interface IAuth {
  email: string;
  password: string;
}

export const useSignUp = () => {
  const client = useQueryClient();
  return useMutation<
    { user: IUser; accessToken: string },
    AxiosError<IApiError>,
    IAuth,
    { toastId: string | number }
  >({
    mutationKey: "signup",
    mutationFn: (userDto) =>
      $api.post("/auth/register", userDto).then(({ data }) => data),
    onSuccess: (data, _, ctx) => {
      localStorage.setItem("accessToken", data.accessToken);
      client.refetchQueries("getProile");
      toast.success("registration success!", {
        id: ctx?.toastId,
      });
    },
    onError: (err, _, ctx) => {
      toast.error(err.response?.data.message, {
        id: ctx?.toastId,
      });
    },
    onMutate: () => {
      const toastId = toast.loading("loading...");
      return { toastId };
    },
  });
};

export const useLogIn = () => {
  const client = useQueryClient();
  return useMutation<
    { user: IUser; accessToken: string },
    AxiosError<IApiError>,
    IAuth,
    { toastId: string | number }
  >({
    mutationKey: "logIn",
    mutationFn: (userDto) =>
      $api.post("/auth/login", userDto).then(({ data }) => data),
    onSuccess: (data, _, ctx) => {
      client.refetchQueries("getProile");
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("log in success!", {
        id: ctx?.toastId,
      });
    },
    onError: (err, _, ctx) => {
      toast.error(err.response?.data.message, {
        id: ctx?.toastId,
      });
    },
    onMutate: () => {
      const toastId = toast.loading("loading...");
      return { toastId };
    },
  });
};

export const useLogout = () => {
  const client = useQueryClient();
  return useMutation<
    { user: IUser; accessToken: string },
    AxiosError<IApiError>
  >({
    mutationKey: "logout",
    mutationFn: () => $api.get("/auth/logout"),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      client.refetchQueries("getProile");
    },
    onError: (err) => {
      toast.error(err.response?.data.message);
    },
  });
};
