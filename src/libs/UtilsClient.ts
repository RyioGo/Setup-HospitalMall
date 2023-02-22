import type { Router, RouteRecordRaw } from "vue-router";
// 首先把你需要动态路由的组件地址全部获取
let modules = import.meta.glob("../pages/**/*.vue");

class UtilsClient {
  //  校验数据类型
  typeOf(data: any): string {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }
  //  动态注册路由
  resigerRoute(routes: RouteRecordRaw[], router: Router) {
    routes.forEach((item: RouteRecordRaw, key: number) => {
      if (item.children && item.children.length) {
        this.resigerRoute(item.children, router);
      } else {
        router.addRoute("默认布局", {
          path: item.path,
          name: item.name,
          component: modules[`../pages/${item.component}.vue`],
          meta: item.meta,
        });
      }
    });
    return true;
  }
}

export default new UtilsClient();
