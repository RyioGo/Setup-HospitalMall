<script lang="ts">
//  for node_modules api
import { defineComponent } from "vue";
import { Setup, Context } from "vue-class-setup";
import { message } from "ant-design-vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons-vue";
//  for you api
import { admin_logout } from "@/api/admin";
import { userModule } from "@/store/modules/user";
import { stateModule } from "@/store/modules/state";
//  for you components

@Setup
class PageHeader extends Context {
  state = stateModule;
  user = userModule;

  toggleCollapsed() {
    stateModule.SETCOLLAPSED(!stateModule.collapsed);
  }

  async loginOut() {
    const load = message.loading("清除登录缓存...");
    const res = await admin_logout();
    if (res && res.code == 200) {
      load.then(() => {
        // 设置store商店
        userModule.SETUSERINFO({
          token: "",
          name: "",
          account: "",
          headPicture: "",
        });
        stateModule.SETROUTERS([]);
        // 设置本地存储
        window.sessionStorage.clear();
        // 完成登录
        window.location.href = "/login";
      });
    } else {
      load.then(() => {
        message.error(res.message);
      });
    }
  }
}

export default defineComponent({
  components: {
    UserOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },
  ...PageHeader.inject(),
});
</script>

<template>
  <div class="page-header">
    <div class="left">
      <menu-unfold-outlined
        class="icon"
        @click="toggleCollapsed"
        v-show="state.collapsed"
      />
      <menu-fold-outlined
        class="icon"
        @click="toggleCollapsed"
        v-show="!state.collapsed"
      />
      <!-- <a-breadcrumb style="margin-left: 12px">
        <a-breadcrumb-item v-for="(item, index) in 3" :key="index">
          {{ item }}
        </a-breadcrumb-item>
      </a-breadcrumb> -->
    </div>
    <div class="right">
      <a-input-search
        placeholder="请输入搜索关键字!"
        enter-button
        class="search"
      />
      <div class="avator">
        <a-dropdown :trigger="['click']">
          <a-avatar shape="square" :src="user.headPicture" />
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <UserOutlined />
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="2" style="color: red" @click="loginOut()">
                <LoginOutlined />
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    height: 64px;
    .icon {
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      padding: 8px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 50%;
    }
  }
  .right {
    display: flex;
    align-items: center;
    height: 64px;
    .search {
      margin-right: 12px;
    }
    .avator {
      display: flex;
      align-items: center;
      width: 40px;
      cursor: pointer;
    }
  }
}
</style>
