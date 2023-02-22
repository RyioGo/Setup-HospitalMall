import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import path from "path";

export default defineConfig(({ command, mode }) => {
  return {
    base: "/mall/",
    plugins: [vue()],
    // 环境变量别名
    envPrefix: "RG",
    // 快速访问路径别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // 启用服务
    server: {
      host: "0.0.0.0",
    },
  };
});
