<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import {
  user_type_detail,
  user_type_add,
  user_type_edit,
} from "@/api/user_type";
import type { edit_type } from "@/types/user_type";
//  for you components

@Setup
class SetUserType extends Define<Emits> {
  visible = false;
  type = "add";
  loading = false;

  form: edit_type = {
    name: "",
    price: null,
  };

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    if (type == "edit") {
      this.getUserTypeDetail(id!);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? user_type_add : user_type_edit;
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

  async getUserTypeDetail(id: string) {
    const res = await user_type_detail(id);
    if (res && res.code == 200) {
      this.form = res.data;
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      name: "",
      price: null,
    };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sut = new SetUserType();
defineExpose({
  toggleShow: sut.toggleShow,
});
</script>

<template>
  <div class="set-user-type">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sut.visible"
      :title="sut.type == 'add' ? '添加' : '编辑'"
      @close="sut.close()"
    >
      <a-form
        :model="sut.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sut.onFinish"
      >
        <a-form-item
          label="类型名称"
          name="name"
          :rules="[{ required: true, message: '请填写会员类型名称!' }]"
        >
          <a-input
            placeholder="请填写会员类型名称!"
            v-model:value="sut.form.name"
          />
        </a-form-item>
        <a-form-item
          label="价格"
          name="price"
          :rules="[{ required: true, message: '请填写价格!' }]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="请填写价格!"
            v-model:value="sut.form.price"
            :min="1"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="sut.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
