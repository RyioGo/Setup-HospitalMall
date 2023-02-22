import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";

import path from "path";

export default defineConfig(({ command, mode }) => {
  //  环境变量
  const env = loadEnv(mode, process.cwd(), "RG");

  return {
    base: env.RGBASE,
    // 环境变量别名
    envPrefix: "RG",
    // 插件
    plugins: [vue()],
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
