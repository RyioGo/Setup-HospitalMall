<script lang="ts">
//  for node_modules api
import { onMounted } from "vue";
import { Setup, Define, PassOnTo } from "vue-class-setup";

//  for you api
import { filter_data_type } from "@/types/common";
//  for you components

@Setup
class FilterData extends Define<Props, Emits> {
  form: { [x: string]: any } = {
    $op: 1,
  };

  formRef!: any;

  onFinish() {
    this.$emit("update:value", this.form);
    this.$emit("list");
  }

  resetForm() {
    this.formRef.resetFields();
    this.$emit("update:value", this.form);
    this.$emit("list");
  }

  @PassOnTo(onMounted)
  onMountedRun() {}
}
</script>

<script setup lang="ts">
export interface Props {
  filterData: filter_data_type[];
  value: { [x: string]: any };
}
export interface Emits {
  (e: "list"): void;
  (e: "update:value", value: { [x: string]: any }): void;
}
defineProps<Props>();
defineEmits<Emits>();

const fd = new FilterData();
</script>

<template>
  <div class="filter-data" v-if="filterData.length">
    <a-form
      :ref="(el: any) => (fd.formRef = el)"
      :model="fd.form"
      layout="inline"
      @finish="fd.onFinish"
    >
      <a-form-item
        v-for="item in filterData"
        :label="item.label"
        :name="item.key"
      >
        <template v-if="item.type == 1">
          <a-input
            style="width: 180px"
            v-model:value="fd.form[item.key]"
            :placeholder="`请填写${item.label}!`"
          />
        </template>
        <template v-if="item.type == 2">
          <a-select
            style="width: 180px"
            v-model:value="fd.form[item.key]"
            :placeholder="`请选择${item.label}!`"
            :options="item.dict"
            :fieldNames="{ label: 'name', value: 'id' }"
          />
        </template>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-item>
      <a-form-item>
        <a-button @click="fd.resetForm()"> 重置 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
.filter-data {
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #fafafa;
}
</style>
