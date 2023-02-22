import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

//  请求拦截器的数据类型
interface interceptors {
  UseRequest: (arg: AxiosRequestConfig) => AxiosRequestConfig;
  UseResponse: (arg: AxiosResponse) => AxiosResponse;
  UseError: (arg: AxiosError) => Promise<AxiosError>;
}

interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
  [x: string]: any;
}

class HttpClient {
  public requestTask: AxiosInstance;

  constructor(options: AxiosRequestConfig, interceptors: interceptors) {
    // 创建axios实例
    this.requestTask = axios.create(options);
    // 初始化拦截器
    this.interceptors(interceptors);
  }

  private interceptors(interceptors: interceptors) {
    this.requestTask.interceptors.request.use(
      (config: AxiosRequestConfig): any => {
        return interceptors.UseRequest(config);
      },
      (error: AxiosError) => {
        return interceptors.UseError(error);
      }
    );

    // 响应拦截器
    this.requestTask.interceptors.response.use(
      // 请求成功
      (response: AxiosResponse) => {
        return interceptors.UseResponse(response);
      },
      // 请求失败
      (error: AxiosError) => {
        return interceptors.UseError(error);
      }
    );
  }

  public post<T>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({ url, method: "post", data, ...config });
  }
  public delete<T>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({ url, method: "delete", data, ...config });
  }
  public put<T>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({ url, method: "put", data, ...config });
  }
  public get<T>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({ url, method: "get", data, ...config });
  }

  private request<T>(options: AxiosRequestConfig) {
    return this.requestTask.request<T, BaseResponse<T>>(options);
  }
}

export default HttpClient;
