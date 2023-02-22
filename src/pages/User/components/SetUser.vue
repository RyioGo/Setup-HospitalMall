<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { user_detail, user_edit } from "@/api/user";
import type { edit_type } from "@/types/user";

//  for you components

@Setup
class SetUser extends Define<Emits> {
  visible = false;
  type = "add";
  loading = false;

  form: edit_type = {
    status: null,
    balance: null,
    integral: null,
  };
  roleList = [];

  refUpload!: any;

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    if (type == "edit") {
      this.getUserDetail(id!);
    }
  }

  async onFinish() {
    //const callback = this.type == "add" ? () => {} : user_edit;
    this.loading = true;
    const load = message.loading("验证表单");
    const res = await user_edit(this.form);
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

  async getUserDetail(id: string) {
    const res = await user_detail(id);
    if (res && res.code == 200) {
      this.form = res.data;
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      status: null,
      balance: null,
      integral: null,
    };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const su = new SetUser();
defineExpose({
  toggleShow: su.toggleShow,
});
</script>

<template>
  <div class="set-admin">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="su.visible"
      :title="su.type == 'add' ? '添加' : '编辑'"
      @close="su.close()"
    >
      <a-form
        :model="su.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="su.onFinish"
      >
        <a-form-item
          label="余额"
          name="balance"
          :rules="[{ required: true, message: '请填写余额!' }]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="请填写余额!"
            v-model:value="su.form.balance"
            :min="1"
          />
        </a-form-item>
        <a-form-item
          label="积分"
          name="integral"
          :rules="[{ required: true, message: '请填写积分!' }]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="请填写积分!"
            v-model:value="su.form.integral"
            :min="1"
          />
        </a-form-item>

        <a-form-item
          label="状态"
          name="status"
          :rules="[{ required: true, message: '请选择状态!' }]"
        >
          <a-radio-group v-model:value="su.form.status" button-style="solid">
            <a-radio-button :value="1">激活</a-radio-button>
            <a-radio-button :value="0">黑名单</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="su.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
