<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api

import {
  department_detail,
  department_add,
  department_edit,
} from "@/api/department";
import type { edit_type } from "@/types/department";
//  for you components

@Setup
class SetDepartment extends Define<Emits> {
  visible = false;
  loading = false;
  type = "add";

  form: edit_type = {
    name: "",
  };

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    if (type == "edit") {
      this.getDepartmentDetail(id!);
    }
  }

  async getDepartmentDetail(id: string) {
    const res = await department_detail(id);
    if (res && res.code == 200) {
      this.form = res.data;
    } else {
      message.error(res.message);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? department_add : department_edit;
    this.loading = true;
    const load = message.loading("验证表单");
    const res = await callback(this.form);
    if (res && res.code == 200) {
      load.then(() => {
        message.success(res.message);
        this.$emit("list");
        this.close();
        this.loading = false;
        this.visible = false;
      });
    } else {
      load.then(() => {
        message.error(res.message);
        this.loading = false;
      });
    }
  }

  close() {
    this.form = { name: "" };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sd = new SetDepartment();
defineExpose({
  toggleShow: sd.toggleShow,
});
</script>

<template>
  <div class="set-department">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sd.visible"
      :title="sd.type == 'add' ? '添加' : '编辑'"
      @close="sd.close()"
    >
      <a-form
        :model="sd.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sd.onFinish"
      >
        <a-form-item
          label="科室名称"
          name="name"
          :rules="[{ required: true, message: '请填写科室名称!' }]"
        >
          <a-input v-model:value="sd.form.name" placeholder="请填写科室名称!" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="sd.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
