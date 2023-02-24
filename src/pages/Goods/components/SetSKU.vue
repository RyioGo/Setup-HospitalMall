<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
//  for you api
import type * as goodsSku from "@/types/goods_sku";
import type * as goodsSkuValue from "@/types/goods_sku_value";
//  for you components

@Setup
class SetSKU extends Define<Props, Emits> {
  visible = false;
  id: string = "";

  name = "";
  valueData = "";

  activeKey: string[] = [];
  goodsSkuModelList: goodsSku.edit_type[] = [];

  toggleShow(id?: string) {
    this.visible = true;
    this.goodsSkuModelList = this.value;
    this.id = id || "";
  }

  setSku() {
    if (!Boolean(this.name.trim())) return message.warning("请先输入SKU名称！");
    let obj: any = {
      name: this.name,
      goodsSkuValueModelList: [],
    };
    if (this.id) obj.goodsId = this.id;

    this.goodsSkuModelList.push(obj);

    this.name = "";
  }

  pressEnter(index: number) {
    if (!Boolean(this.valueData.trim()))
      return message.warning("请先输入SKU值！");
    this.goodsSkuModelList[index].goodsSkuValueModelList.push({
      value: this.valueData,
    });
    this.valueData = "";
  }

  delTag(index: number, key: number) {
    this.goodsSkuModelList[index].goodsSkuValueModelList.splice(key, 1);
  }

  handleOk() {
    this.goodsSkuModelList.forEach((item: goodsSku.edit_type) => {
      item.goodsSkuValueModelList = item.goodsSkuValueModelList.map(
        (item: goodsSkuValue.edit_type) => {
          if (typeof item == "string") {
            return {
              value: item,
            };
          } else {
            return item;
          }
        }
      );
    });
    this.$emit("update:value", this.goodsSkuModelList);
    this.visible = false;
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "update:value", value: goodsSku.edit_type[]): void;
}
export interface Props {
  value: goodsSku.edit_type[];
}

defineEmits<Emits>();
defineProps<Props>();

const ssku = new SetSKU();
defineExpose({
  toggleShow: ssku.toggleShow,
});
</script>

<template>
  <a-modal
    :zIndex="1001"
    v-model:visible="ssku.visible"
    title="商品SKU"
    @ok="ssku.handleOk"
  >
    <a-space style="margin-bottom: 12px">
      <a-input v-model:value="ssku.name" placeholder="请填写SKU名称！" />
      <a-button type="primary" @click="ssku.setSku()">添加</a-button>
    </a-space>
    <a-collapse v-model:activeKey="ssku.activeKey" accordion>
      <a-collapse-panel
        v-for="(item, index) in ssku.goodsSkuModelList"
        :key="index"
        :header="'SKU:' + item.name"
      >
        <a-input
          v-model:value="ssku.valueData"
          :placeholder="`请填写SKU: ${item.name}的值，回车添加！`"
          @pressEnter="ssku.pressEnter(index)"
        />
        <a-tag
          color="#2db7f5"
          style="margin-top: 12px"
          v-for="(it, ind) in item.goodsSkuValueModelList"
          :key="ind"
        >
          <template #icon>
            {{ it.value }}
            <span @click="ssku.delTag(index, ind)">
              <close-outlined style="cursor: pointer" />
            </span>
          </template>
        </a-tag>
      </a-collapse-panel>
    </a-collapse>
  </a-modal>
</template>

<style scoped lang="less"></style>
