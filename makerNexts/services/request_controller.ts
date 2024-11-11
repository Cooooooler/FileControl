import { extend } from "umi-request";

import EventEmitter from "@/messages_center"; // 创建一个 umi-request 实例

// 创建一个 umi-request 实例
const requestController = extend({
  prefix: "api", // 统一的请求前缀
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
  errorHandler: (error) => {
    // 统一的错误处理
    const { response } = error;

    if (response && response.status) {
    } else if (!response) {
    }

    return Promise.reject(error);
  },
});

// 添加请求拦截器
requestController.interceptors.request.use((url, options) => {
  EventEmitter.emit("StartWaiting");
  // 可以在这里添加统一的请求头，例如 token

  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", token);
  }

  return { url, options };
});

// 添加响应拦截器
requestController.interceptors.response.use((response, _) => {
  // 可以在这里处理统一的响应，例如错误提示

  EventEmitter.emit("StopWaiting");

  return response;
});

export default requestController;
