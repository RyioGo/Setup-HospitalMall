import store from "@/store";

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import storage from "@/libs/StorageClient";

import { user_info_type } from "@/types/user";

// dynamic: true: 动态创建动态模块,即new Vuex.Store({})里面不用注册的.空着就行,
// store,当前模块注册到store上.也可以写在getModule上,即getModule(PassengerStore,store)
// namespaced: true, name: 'passenger' 命名空间
@Module({
  name: "user",
  dynamic: true,
  namespaced: true,
  store,
})
export default class UserStore extends VuexModule {
  token: string = storage.get("token");
  name: string = storage.get("name");
  account: string = storage.get("account");
  headPicture: string = storage.get("headPicture");

  @Mutation
  SETUSERINFO({ token, name, account, headPicture }: user_info_type): void {
    this.token = token;
    this.name = name;
    this.account = account;
    this.headPicture = headPicture;
  }
}

export const userModule = getModule(UserStore);
