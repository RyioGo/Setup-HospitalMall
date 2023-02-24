<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
//  for you api
import type * as goodsSpu from "@/types/goods_spu";

//  for you components

@Setup
class SetSPU extends Define<Props, Emits> {
  visible = false;
  id: string = "";

  name = "";
  valueData = "";

  goodsSpuModelList: goodsSpu.edit_type[] = [];

  toggleShow(id?: string) {
    this.visible = true;
    this.goodsSpuModelList = this.value;
    this.id = id || "";
  }

  setSku() {
    if (!Boolean(this.name.trim())) return message.warning("请输入SPU名称！");
    if (!Boolean(this.valueData.trim()))
      return message.warning("请输入SPU值！");

    let obj: any = {
      name: this.name,
      value: this.valueData,
    };
    if (this.id) obj.goodsId = this.id;

    this.goodsSpuModelList.push(obj);

    this.name = "";
    this.valueData = "";
  }

  delTag(index: number) {
    this.goodsSpuModelList.splice(index, 1);
  }

  handleOk() {
    this.$emit("update:value", this.goodsSpuModelList);
    this.visible = false;
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "update:value", value: goodsSpu.edit_type[]): void;
}
export interface Props {
  value: goodsSpu.edit_type[];
}

defineEmits<Emits>();
defineProps<Props>();

const sspu = new SetSPU();
defineExpose({
  toggleShow: sspu.toggleShow,
});
</script>

<template>
  <a-modal
    :zIndex="1001"
    v-model:visible="sspu.visible"
    title="商品SPU"
    @ok="sspu.handleOk"
  >
    <a-space style="margin-bottom: 12px">
      <a-input v-model:value="sspu.name" placeholder="请填写SPU名称！" />
      <a-input v-model:value="sspu.valueData" placeholder="请填写SPU值！" />
      <a-button type="primary" @click="sspu.setSku()">添加</a-button>
    </a-space>
    <a-tag
      color="#2db7f5"
      style="margin-top: 12px"
      v-for="(item, index) in sspu.goodsSpuModelList"
      :key="index"
    >
      <template #icon>
        {{ item.name }} : {{ item.value }}
        <span @click="sspu.delTag(index)">
          <close-outlined style="cursor: pointer" />
        </span>
      </template>
    </a-tag>
  </a-modal>
</template>

<style scoped lang="less"></style>
