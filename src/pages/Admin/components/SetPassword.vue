<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { admin_modifyPassword } from "@/api/admin";
import type { modifyPassword_type } from "@/types/admin";
//  for you components

@Setup
class SetPassword extends Define<Emits> {
  visible = false;
  loading = false;

  form: modifyPassword_type = {
    id: "",
    password: "",
  };

  toggleShow(id: string) {
    this.visible = true;
    this.form.id = id;
  }

  async onFinish() {
    this.loading = true;
    const load = message.loading("验证表单");
    const res = await admin_modifyPassword(this.form);
    if (res && res.code == 200) {
      load.then(() => {
        message.success(res.message);
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
    this.form = { id: "", password: "" };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sp = new SetPassword();
defineExpose({
  toggleShow: sp.toggleShow,
});
</script>

<template>
  <div class="set-password">
    <a-drawer
      placement="right"
      width="420"
      title="新密码"
      v-model:visible="sp.visible"
      @close="sp.close()"
    >
      <a-form
        :model="sp.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sp.onFinish"
      >
        <a-form-item
          label="新密码"
          name="password"
          :rules="[{ required: true, message: '请填写新密码!' }]"
        >
          <a-input-password
            v-model:value="sp.form.password"
            placeholder="请填写新密码!"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="sp.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang=""></style>
