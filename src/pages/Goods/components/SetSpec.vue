<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
//  for you api
import { goods_spec_list } from "@/api/goods_spec";

import type { edit_type } from "@/types/goods_spec";
//  for you components

@Setup
class SetSpec extends Define<Props, Emits> {
  visible = false;
  id: string = "";
  specList: edit_type[] = [];

  toggleShow(id: string) {
    this.visible = true;
    this.id = id;
    this.getGoodsSpecList(id);
  }

  delTag(index: number, key: number) {
    //this.goodsSkuModelList[index].goodsSkuValueModelList.splice(key, 1);
  }

  handleOk() {
    this.visible = false;
  }

  async getGoodsSpecList(id: string) {
    const res = await goods_spec_list(id);
    if (res && res.code == 200) {
      this.specList = res.data;
    } else {
      message.error(res.message);
    }
  }
}
</script>

<script setup lang="ts">
// export interface Emits {
//   (e: "update:value", value: goodsSku.edit_type[]): void;
// }
// export interface Props {
//   value: goodsSku.edit_type[];
// }

// defineEmits<Emits>();
// defineProps<Props>();

const ssku = new SetSpec();
defineExpose({
  toggleShow: ssku.toggleShow,
});
</script>

<template>
  <a-modal
    :zIndex="1001"
    v-model:visible="ssku.visible"
    title="规格"
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
