import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { useTitle } from "@vueuse/core";
import { stateModule } from "@/store/modules/state";
import { userModule } from "@/store/modules/user";
import utils from "@/libs/UtilsClient";
import routes from "./base";

const { MODE } = import.meta.env;

const router = createRouter({
  history: createWebHashHistory("/mall/"),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, from, next) => {
  //  是否完成登录
  const isReady = Boolean(userModule.token);

  // 未登录前往站点内部
  if (!isReady && to.name !== "登录") return next("/login");

  // 页面跳转权限处理: 已登录未获得路由表
  if (isReady && stateModule.routers.length == 0) {
    const res = await stateModule.GETROUTERS();
    utils.resigerRoute(res, router);
    return next({ ...to, replace: true });
  } else {
    next();
  }
});
router.afterEach((to) => {
  // 设置document title
  useTitle(to.name as string);
});

export default router;
