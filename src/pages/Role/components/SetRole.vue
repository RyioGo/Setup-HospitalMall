<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api

import { role_detail, role_add, role_edit } from "@/api/role";
import type { edit_type } from "@/types/role";
//  for you components

@Setup
class SetRole extends Define<Emits> {
  visible = false;
  loading = false;
  type = "add";

  form: edit_type = {
    name: "",
    status: null,
  };

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    if (type == "edit") {
      this.getRoleDetail(id!);
    }
  }

  async getRoleDetail(id: string) {
    const res = await role_detail(id);
    if (res && res.code == 200) {
      this.form = res.data;
    } else {
      message.error(res.message);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? role_add : role_edit;
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
    this.form = { name: "", status: null };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sr = new SetRole();
defineExpose({
  toggleShow: sr.toggleShow,
});
</script>

<template>
  <div class="set-role">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sr.visible"
      :title="sr.type == 'add' ? '添加' : '编辑'"
      @close="sr.close()"
    >
      <a-form
        :model="sr.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sr.onFinish"
      >
        <a-form-item
          label="角色名称"
          name="name"
          :rules="[{ required: true, message: '请填写角色名称!' }]"
        >
          <a-input v-model:value="sr.form.name" placeholder="请填写角色名称!" />
        </a-form-item>

        <a-form-item
          label="状态"
          name="status"
          :rules="[{ required: true, message: '请选择状态!' }]"
        >
          <a-radio-group v-model:value="sr.form.status" button-style="solid">
            <a-radio-button :value="1">激活</a-radio-button>
            <a-radio-button :value="0">禁用</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="sr.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
