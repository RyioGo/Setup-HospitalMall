<script lang="ts">
//  for node_modules api
import { defineComponent } from "vue";
import { Setup, Context } from "vue-class-setup";
import { useRouter } from "vue-router";

//  for you api
import { stateModule } from "@/store/modules/state";
//  for you components
import PageHeader from "@/layout/PageHeader.vue";
import PageMenu from "@/layout/PageMenu.vue";

import logo from "./logo.jpg";
@Setup
class Pages extends Context {
  state = stateModule;
  logo = logo;
  router = useRouter();
  toIndex() {
    this.router.push("/base/index");
  }
}

export default defineComponent({
  components: { PageHeader, PageMenu },
  ...Pages.inject(),
});
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider
      v-model:collapsed="state.collapsed"
      class="sider transparent"
    >
      <div class="logo" @click="toIndex()">
        <a-avatar :size="42" :src="logo" />
        <span style="margin-left: 8px" v-if="!state.collapsed">源真中医馆</span>
      </div>
      <PageMenu />
    </a-layout-sider>
    <a-layout class="transparent layout-main">
      <a-layout-header class="header transparent">
        <PageHeader />
      </a-layout-header>
      <a-layout-content class="container">
        <router-view v-slot="{ Component }">
          <transition
            name="animate__animated"
            enter-active-class="animate__animated animate__fadeInUp"
          >
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.layout {
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #f5f4ee;
  background-image: linear-gradient(
    190deg,
    #f4f4f3 30%,
    #ffffff 75%,
    #dfdced 75%
  );

  .sider {
    width: 100%;
    overflow-x: hidden;
    .logo {
      cursor: pointer;
      height: 64px;
      text-align: center;
      line-height: 64px;
      font-size: 18px;
      color: #666;
    }
    .menu {
      height: 80vh;
      overflow: hidden;
      overflow-y: scroll;
    }
  }
  .layout-main {
    overflow-y: scroll;
    .header {
      padding: 0 16px;
    }
    .container {
      margin: 16px;
    }
  }
}
</style>
