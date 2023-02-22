import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import HttpClient from "@/libs/HttpsClient";
import { userModule } from "@/store/modules/user";
const api: HttpClient = new HttpClient(
  {
    baseURL: import.meta.env.RGAPI,
    timeout: 1000 * 24,
  },
  {
    UseRequest(arg: AxiosRequestConfig) {
      arg.headers = {
        token: userModule.token,
        ...arg.headers,
      };
      return arg;
    },
    UseResponse(arg: AxiosResponse) {
      if (arg.data.code == 401) {
        window.sessionStorage.clear();
        window.location.href = "/login";
      }
      return arg.data;
    },
    UseError(arg: AxiosError) {
      console.log(3, arg);

      return Promise.reject(arg);
    },
  }
);

export default api;
