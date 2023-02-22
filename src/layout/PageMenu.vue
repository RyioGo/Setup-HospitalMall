<script lang="ts">
//  for node_modules api
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Setup, Context } from "vue-class-setup";
//  for you api
import { stateModule } from "@/store/modules/state";
//  for you components
import MenuItem from "./components/MenuItem.vue";
@Setup
class PageMenu extends Context {
  routers = stateModule.routers;
  collapsed = stateModule.collapsed;
  openKeys = [];
  selectedKeys = [];
  router = useRouter();

  toPath({ key, keyPath }: { key: string; keyPath: string[] }) {
    console.log(this.openKeys, this.selectedKeys);
    this.router.push(key);
  }
}

export default defineComponent({
  components: {
    MenuItem,
  },
  ...PageMenu.inject(),
});
</script>

<template>
  <a-menu
    class="page-menu"
    mode="inline"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :inline-collapsed="collapsed"
    @click="toPath"
  >
    <template v-for="item in routers">
      <MenuItem v-if="item.children && item.children.length" :routers="item" />
      <a-menu-item v-else :key="item.path" :title="item.name">
        <template #icon>
          <a-avatar :size="16" :src="item.meta?.icon" />
        </template>
        <span>{{ item.name }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<style scoped lang="less">
.page-menu {
  height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 16px;
  box-sizing: border-box;
  background-color: transparent;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  ::v-deep .ant-menu {
    background: transparent;
  }
}
</style>
