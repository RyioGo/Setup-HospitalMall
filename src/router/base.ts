import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "登录",
    component: () => import("@/pages/Login/index.vue"),
  },
  {
    path: "/base",
    name: "默认布局",
    component: () => import("@/layout/pages.vue"),
    children: [
      {
        path: "/base/index",
        name: "工作台",
        component: () => import("@/pages/Home/index.vue"),
      },
    ],
  },
];

export default routes;
