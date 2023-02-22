<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";

//  for you api
import {
  professional_detail,
  professional_add,
  professional_edit,
} from "@/api/professional";
import type { edit_type } from "@/types/professional";
//  for you components

@Setup
class SetProfessional extends Define<Emits> {
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
      this.getProfessionalDetail(id!);
    }
  }

  async getProfessionalDetail(id: string) {
    const res = await professional_detail(id);
    if (res && res.code == 200) {
      this.form = res.data;
    } else {
      message.error(res.message);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? professional_add : professional_edit;
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

const sp = new SetProfessional();
defineExpose({
  toggleShow: sp.toggleShow,
});
</script>

<template>
  <div class="set-professional">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sp.visible"
      :title="sp.type == 'add' ? '添加' : '编辑'"
      @close="sp.close()"
    >
      <a-form
        :model="sp.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sp.onFinish"
      >
        <a-form-item
          label="职称"
          name="name"
          :rules="[{ required: true, message: '请填写职称!' }]"
        >
          <a-input v-model:value="sp.form.name" placeholder="请填写职称!" />
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
