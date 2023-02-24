<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";

//  for you api
import { order_detail } from "@/api/order";

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
  <a-modal
    :zIndex="1001"
    v-model:visible="sd.visible"
    title="订单明细"
    :footer="null"
  >
    <a-collapse v-model:activeKey="sd.activeKey" accordion>
      <a-collapse-panel
        v-for="(item, index) in sd.detail.goodsOrderModelList"
        :key="index"
        :header="item.goodsInfo.name"
      >
        <div class="wapper">
          <a-page-header
            class="site-page-header"
            :sub-title="item.goodsInfo.title"
          >
            <template #tags>
              <a-tag
                color="#2db7f5"
                v-for="it in item.goodsInfo.tags"
                :key="it"
              >
                {{ it }}
              </a-tag>
            </template>
            <div class="content">
              <div class="main">
                <a-descriptions size="small" :column="2">
                  <a-descriptions-item label="价格">
                    {{ item.price }}
                  </a-descriptions-item>
                  <a-descriptions-item label="数量">
                    {{ item.amount }}
                  </a-descriptions-item>
                </a-descriptions>
                <div class="image">
                  <img
                    :src="item.goodsInfo.picture[0]"
                    alt="content"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
          </a-page-header>
          <a-divider plain>规格SKU</a-divider>
          <div class="sku">
            <div
              class="sku-item"
              v-for="it in item.goodsInfo.goodsSkuModelList"
              :key="it.id"
            >
              {{ it.name }}：
              <a-tag
                color="#2db7f5"
                v-for="val in it.goodsSkuValueModelList"
                :key="val"
              >
                {{ val.value }}
              </a-tag>
            </div>
          </div>
          <a-divider plain>规格SPU</a-divider>
          <div class="spu">
            <a-tag
              color="#2db7f5"
              v-for="it in item.goodsInfo.goodsSpuModelList"
              :key="it.id"
            >
              {{ it.name + "：" + it.value }}
            </a-tag>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </a-modal>
</template>

<style scoped lang="less">
.wapper {
  text-align: center;
}
.sku,
.spu {
  text-align: left;
  .sku-item {
    margin-bottom: 8px;
  }
}
</style>
