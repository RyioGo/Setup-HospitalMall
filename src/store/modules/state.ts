import store from "@/store";
import { RouteRecordRaw } from "vue-router";
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import { menu_current } from "@/api/menu";
// dynamic: true: 动态创建动态模块,即new Vuex.Store({})里面不用注册的.空着就行,
// store,当前模块注册到store上.也可以写在getModule上,即getModule(PassengerStore,store)
// namespaced: true, name: 'passenger' 命名空间
@Module({
  name: "state",
  dynamic: true,
  namespaced: true,
  store,
})
export default class StateStore extends VuexModule {
  collapsed: boolean = false;

  routers: RouteRecordRaw[] = [];

  @Mutation
  SETCOLLAPSED(value: boolean): void {
    this.collapsed = value;
  }

  @Mutation
  SETROUTERS(value: RouteRecordRaw[]): void {
    this.routers = value;
  }

  @Action({ commit: "SETROUTERS" })
  async GETROUTERS() {
    const res = await menu_current();
    if (res && res.code == 200) {
      return res.data;
    } else {
      return [];
    }
  }
}

export const stateModule = getModule(StateStore);
