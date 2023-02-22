<script lang="ts">
//  for node_modules api
import { Setup, Define } from "vue-class-setup";
import { RouteRecordRaw } from "vue-router";
//  for you api

//  for you components
@Setup
class MenuItem extends Define<Props> {}
</script>

<script setup lang="ts">
import MenuItemChildren from "@/layout/components/MenuItem.vue";

export interface Props {
  routers: RouteRecordRaw;
}

defineProps<Props>();
const mi = new MenuItem();
</script>

<template>
  <a-sub-menu :key="mi.routers.path" :title="mi.routers.name">
    <template #icon>
      <a-avatar :size="16" :src="mi.routers.meta?.icon" />
    </template>
    <template #title>{{ mi.routers.name }}</template>
    <template v-for="item in mi.routers.children">
      <MenuItemChildren
        v-if="item.children && item.children.length"
        :routers="item"
      />
      <a-menu-item :key="item.path" v-else :title="item.name">
        <template #icon>
          <a-avatar :size="16" :src="item.meta?.icon" />
        </template>
        <span>{{ item.name }}</span>
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>

<style scoped lang="less"></style>
