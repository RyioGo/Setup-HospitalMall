import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useRouter } from "vue-router";
import HttpClient from "@/libs/HttpsClient";
import { userModule } from "@/store/modules/user";
import { stateModule } from "@/store/modules/state";
import { message } from "ant-design-vue";

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
        useRouter().replace("/login");
      }
      return arg.data;
    },
    UseError(arg: AxiosError) {
      if (arg.response?.status == 401) {
        message.error("访问令牌过期！");
        window.sessionStorage.clear();
        window.location.reload();
      } else {
        message.error("服务器访问错误！");
      }
      return Promise.reject(arg);
    },
  }
);

export default api;
