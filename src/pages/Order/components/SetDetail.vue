<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
//  for you api
import { order_detail } from "@/api/order";
import type { edit_type } from "@/types/order";
//  for you components

@Setup
class SetDetail extends Define {
  visible = false;

  activeKey: string[] = [];

  detail: any = {};

  toggleShow(id: string) {
    this.visible = true;
    this.getOrderDetail(id!);
  }

  async getOrderDetail(id: string) {
    const res = await order_detail(id);
    if (res && res.code == 200) {
      this.detail = res.data;
    } else {
      message.error(res.message);
    }
  }
}
</script>

<script setup lang="ts">
const sd = new SetDetail();
defineExpose({
  toggleShow: sd.toggleShow,
});
</script>

<template>
  <a-modal :zIndex="1001" v-model:visible="sd.visible" title="订单明细">
    <a-collapse v-model:activeKey="sd.activeKey" accordion>
      <a-collapse-panel
        v-for="(item, index) in sd.detail.goodsOrderModelList"
        :key="index"
        :header="item.goodsInfo.name"
      >
      </a-collapse-panel>
    </a-collapse>
  </a-modal>
</template>

<style scoped lang="less"></style>
