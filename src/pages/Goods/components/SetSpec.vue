<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message, TableColumnType } from "ant-design-vue";
import { DeleteOutlined, CloseOutlined } from "@ant-design/icons-vue";
import utils from "@/libs/UtilsClient";

//  for you api
//  for you components
import Upload from "@/components/Upload/index.vue";

@Setup
class SetSpec extends Define<Props, Emits> {
  visible = false;
  name: string = "";
  value: string = "";
  activeKey: string = "";
  current = 0;

  defaultColumns: TableColumnType[] = [
    {
      title: "规格名称",
      dataIndex: "name",
      width: 120,
      fixed: "right",
      align: "center",
    },
    {
      title: "价格",
      dataIndex: "price",
      width: 120,
      fixed: "right",
      align: "center",
    },
    {
      title: "图片",
      dataIndex: "picture",
      width: 120,
      fixed: "right",
      align: "center",
    },
  ];
  specColumns: TableColumnType[] = [];
  specValueData: any = {};
  specList: any = [];

  refUpload: any = [];

  configSpec() {
    try {
      if (Object.keys(this.specValueData).length == 0) throw new Error();
      Object.keys(this.specValueData).forEach((item: any) => {
        if (this.specValueData[item].length == 0) throw new Error();
      });
      this.refUpload.forEach((item: any) => {
        item.setFile(item.url || "", 1);
      });
      this.current++;
    } catch (error) {
      return message.warning("请完整添加规格属性！");
    }
  }

  setSpec() {
    this.name = this.name.trim();
    if (!Boolean(this.name)) return message.warning("请填写规格名称！");
    if (Boolean(this.specValueData[this.name]))
      return message.warning("规格已存在！");
    try {
      Object.keys(this.specValueData).forEach((item: any) => {
        if (this.specValueData[item].length == "") {
          throw new Error();
        }
      });
    } catch (error) {
      return message.warning("请先完成添加规格的值！");
    }

    this.specColumns.push({
      title: this.name,
      dataIndex: this.name,
      width: 120,
    });
    this.activeKey = this.name;
    this.specValueData[this.name] = [];
    this.name = "";
  }
  setSpecValue(item: string[], key: string) {
    this.value = this.value.trim();
    if (!Boolean(this.value)) return message.warning("请填写规格值！");
    if (item.includes(this.value)) return message.warning("规格值已存在！");
    this.specValueData[key].push(this.value);
    this.value = "";
    this.reCalcList();
  }

  delTag() {}

  toggleShow() {
    this.visible = true;
    this.resetSpecValueData();
    this.resetSpecList();
  }

  resetSpecValueData() {
    let obj: any = {};
    this.list.forEach((item: any) => {
      if (!item.spec) return;
      Object.keys(JSON.parse(item.spec)).forEach((it: any) => {
        if (!obj[it]) {
          obj[it] = [];
        }
        if (!obj[it].includes(JSON.parse(item.spec)[it])) {
          obj[it].push(JSON.parse(item.spec)[it]);
        }
      });
    });
    this.specValueData = obj;
  }
  resetSpecList() {
    //specColumns
    let titles: any = [];
    this.list.forEach((item: any) => {
      if (!item.spec) return;
      Object.keys(JSON.parse(item.spec)).forEach((it: any) => {
        if (!titles.includes(it)) titles.push(it);
      });
      this.specList.push({
        price: item.price || 0,
        picture: item.picture || "",
        name: item.name || "",
        id: item.id,
        goodsId: item.goodsId,
        ...JSON.parse(item.spec),
      });
    });

    titles.forEach((item: string) => {
      this.specColumns.push({
        title: item,
        dataIndex: item,
        width: 120,
      });
    });
  }

  cancel() {
    this.name = "";
    this.value = "";
    this.activeKey = "";
    this.current = 0;
    this.specColumns = [];
    this.specValueData = {};
    this.specList = [];
  }

  reCalcList() {
    //  解除数据响应式结构
    let listObj: any = {};
    Object.keys(this.specValueData).forEach((item: string) => {
      listObj[item] = JSON.parse(JSON.stringify(this.specValueData[item]));
    });

    let newList: any = [];
    Object.keys(listObj).forEach((item: string) => {
      newList.push({
        name: item,
        spec: listObj[item],
      });
    });

    this.specList = utils.specData(newList).map((item: any) => {
      item["price"] = 0;
      item["picture"] = "";
      item["name"] = "";
      return item;
    });
    this.refUpload.forEach((item: any) => {
      item.setFile("", 0);
    });
  }

  delRow(key: string) {
    delete this.specValueData[key];
    this.reCalcList();
  }
  delItem(key: string, ind: number) {
    this.specValueData[key].splice(ind, 1);
    this.reCalcList();
  }

  handleOK() {
    let list: any = [];
    this.specList.forEach((item: any) => {
      let obj = JSON.parse(JSON.stringify(item));
      delete obj["price"];
      delete obj["name"];
      delete obj["picture"];
      list.push({
        spec: JSON.stringify(obj),
        price: item.price,
        name: item.name,
        picture: item.picture,
      });
    });
    this.$emit("update:list", list);
    this.visible = false;
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "update:list", value: any): void;
}
export interface Props {
  list: any;
}
defineEmits<Emits>();
defineProps<Props>();

const ss = new SetSpec();
defineExpose({
  toggleShow: ss.toggleShow,
});
</script>

<template>
  <a-modal
    :zIndex="1001"
    v-model:visible="ss.visible"
    title="规格"
    width="1000px"
    :footer="null"
    @cancel="ss.cancel"
  >
    <a-steps :current="ss.current">
      <a-step title="添加规格" />
      <a-step title="配置规格参数" />
    </a-steps>
    <div style="height: 24px" />
    <div v-if="ss.current == 0">
      <a-space style="margin-bottom: 12px">
        <a-input v-model:value="ss.name" placeholder="请填写规格名称！" />
        <a-button type="primary" @click="ss.setSpec()">添加</a-button>
      </a-space>
      <a-collapse v-model:activeKey="ss.activeKey" accordion>
        <a-collapse-panel
          v-for="(item, key, index) of ss.specValueData"
          :key="key"
          :header="'规格:' + key"
        >
          <template #extra>
            <delete-outlined
              :style="{ color: 'red' }"
              @click.stop="ss.delRow(key as unknown as string)"
            />
          </template>
          <div>
            <a-space style="margin-bottom: 12px">
              <a-input v-model:value="ss.value" placeholder="请填写规格值！" />
              <a-button
                type="primary"
                @click="ss.setSpecValue(item, key as unknown as string)"
              >
                添加
              </a-button>
            </a-space>
          </div>
          <a-tag
            color="#2db7f5"
            style="margin-top: 8px"
            v-for="(it, ind) in item"
            :key="ind"
          >
            <template #icon>
              {{ it }}
              <span @click="ss.delTag()">
                <close-outlined
                  style="cursor: pointer"
                  @click="ss.delItem(key as unknown as string, ind)"
                />
              </span>
            </template>
          </a-tag>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <a-table
      style="margin-top: 8px"
      :scroll="{ y: 300 }"
      size="small"
      v-show="ss.current == 1"
      :pagination="false"
      :dataSource="ss.specList"
      :columns="[...ss.specColumns, ...ss.defaultColumns]"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <a-input
            v-model:value="record.name"
            style="width: 100%"
            placeholder="请填写规格名称"
          />
        </template>
        <template v-if="column.dataIndex === 'price'">
          <a-input-number
            v-model:value="record.price"
            :min="0"
            prefix="￥"
            style="width: 100%"
          />
        </template>
        <template v-if="column.dataIndex === 'picture'">
          <Upload
            v-model:value="record.picture"
            :ref="
              (el:any) => {
                if (el && !ss.refUpload.includes(el)) {
                  el['url'] = record.picture;
                  ss.refUpload.push(el);
                }
              }
            "
          />
        </template>
      </template>
    </a-table>
    <div style="text-align: center">
      <a-space :size="18" style="margin-top: 24px">
        <a-button v-if="ss.current" @click="ss.current--"> 重配规格 </a-button>
        <a-button
          type="primary"
          v-if="ss.current == 0"
          @click="ss.configSpec()"
        >
          配置规格参数
        </a-button>
        <a-button type="primary" v-if="ss.current" @click="ss.handleOK()">
          完成配置
        </a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<style scoped lang="less"></style>
