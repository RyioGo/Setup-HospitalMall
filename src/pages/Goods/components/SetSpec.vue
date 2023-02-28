<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message, TableColumnType } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
//  for you api
import { goods_spec_list, goods_spec_add } from "@/api/goods_spec";

import type { edit_type, add_type } from "@/types/goods_spec";

import { goods_sku_list } from "@/api/goods_sku";

import { edit_type as editType } from "@/types/goods_sku";

interface skuSelectModel {
  key: string;
  value?: string | null;
}
//  for you components

@Setup
class SetSpec extends Define<Props, Emits> {
  visible = false;
  id: string = "";
  specList: edit_type[] = [];
  goodsSkuList: editType[] = [];
  skuSelect: skuSelectModel[] = [];
  price: number = 0;

  toggleShow(id: string) {
    this.visible = true;
    this.id = id;
    this.getGoodsSpecList(id);
    this.getGoodsSkuList(id);
  }

  delTag(index: number, key: number) {
    //this.goodsSkuModelList[index].goodsSkuValueModelList.splice(key, 1);
  }

  handleOk() {
    this.visible = false;
  }

  setSku() {
    console.log(this.skuSelect);
    const spec: any = {};
    const skuValueIds: [] = [];
    this.skuSelect.forEach((item) => {
      spec[item.key] = item.value;
    });
    const goodsSpec: add_type = {
      price: this.price,
      spec: JSON.stringify(spec),
      name: this.name,
      goodsId: this.id,
      skuValueIds: "1,2",
    };
    this.goodsSpecAdd(goodsSpec);
  }

  async goodsSpecAdd(goodsSpec: add_type) {
    const res = await goods_spec_add(goodsSpec);
    if (res && res.code == 200) {
      this.getGoodsSpecList(this.id);
    } else {
      message.error(res.message);
    }
  }

  async getGoodsSpecList(id: string) {
    const res = await goods_spec_list(id);
    if (res && res.code == 200) {
      this.specList = res.data;
    } else {
      message.error(res.message);
    }
  }

  async getGoodsSkuList(id: string) {
    const res = await goods_sku_list(id);
    if (res && res.code == 200) {
      this.goodsSkuList = res.data;
      this.goodsSkuList.forEach((item) => {
        const goodsSku: skuSelectModel = { key: item.name, value: "" };
        this.skuSelect.push(goodsSku);
      });
    } else {
      message.error(res.message);
    }
  }

  columns: TableColumnType[] = [
    {
      title: "规格名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "规格",
      dataIndex: "spec",
      key: "spec",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
  ];
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
    width="1000px"
  >
    <a-space style="margin-bottom: 12px">
      <!-- <a-input v-model:value="ssku.name" placeholder="请填写SKU名称！" />
      <a-button type="primary" @click="ssku.setSku()">添加</a-button> -->
      <a-form-item
        v-for="(item, index) in ssku.goodsSkuList"
        :key="item.id"
        :label="item.name"
      >
        <a-select
          ref="select"
          style="width: 120px"
          v-model:value="ssku.skuSelect[index].value"
        >
          <a-select-option
            v-for="child in item.goodsSkuValueModelList"
            :key="child.id"
            :value="child.value"
            >{{ child.value }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-input v-model:value="ssku.name" placeholder="请填写SKU名称！" />
      <a-input v-model:value="ssku.price" placeholder="请填写价格" />
      <a-button type="primary" @click="ssku.setSku()">添加</a-button>
    </a-space>
    <!-- <a-collapse v-model:activeKey="ssku.activeKey" accordion>
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
    </a-collapse> -->
    <a-table :dataSource="ssku.specList" :columns="ssku.columns"></a-table>
  </a-modal>
</template>

<style scoped lang="less"></style>
