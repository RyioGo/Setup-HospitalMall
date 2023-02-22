<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api

import { category_detail, category_add, category_edit } from "@/api/category";
import type { edit_type } from "@/types/category";

//  for you components
import Upload from "@/components/Upload/index.vue";
@Setup
class SetGoods extends Define<Emits> {
  visible = false;
  loading = false;
  type = "add";

  form: edit_type = {
    name: "",
    icon: "",
  };

  refUpload!: any;

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    if (type == "edit") {
      this.getCategoryDetail(id!);
    }
  }

  async getCategoryDetail(id: string) {
    const res = await category_detail(id);
    if (res && res.code == 200) {
      this.form = { name: res.data.name, icon: res.data.icon, id: res.data.id };
      this.refUpload.setFile(res.data.icon, 1);
    } else {
      message.error(res.message);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? category_add : category_edit;
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
    this.form = { name: "", icon: "" };
    this.refUpload.setFile([], 0);
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sc = new SetGoods();
defineExpose({
  toggleShow: sc.toggleShow,
});
</script>

<template>
  <div class="set-category">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sc.visible"
      :title="sc.type == 'add' ? '添加' : '编辑'"
      @close="sc.close()"
    >
      <a-form
        :model="sc.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sc.onFinish"
      >
        <a-form-item
          label="分类名称"
          name="name"
          :rules="[{ required: true, message: '请填写分类名称!' }]"
        >
          <a-input v-model:value="sc.form.name" placeholder="请填写分类名称!" />
        </a-form-item>
        <a-form-item
          label="分类图标"
          name="icon"
          :rules="[{ required: true, message: '请上传分类图标!' }]"
        >
          <Upload
            v-model:value="sc.form.icon"
            :ref="(el) => (sc.refUpload = el)"
          />
          <a-alert type="info" show-icon closable>
            <template #message>
              <a href="https://www.iconfont.cn/" target="_blank">
                推荐前往Iconfont下载图标！
              </a>
            </template>
          </a-alert>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="sc.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
