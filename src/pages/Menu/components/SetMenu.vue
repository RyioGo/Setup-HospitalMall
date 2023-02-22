<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { menu_add, menu_edit, menu_detail } from "@/api/menu";

//  for you components
import Upload from "@/components/Upload/index.vue";
import { edit_type } from "@/types/menu";
@Setup
class SetMenu extends Define<Emits> {
  visible = false;
  type = "add";
  loading = false;

  form: edit_type = {
    name: "",
    component: "",
    path: "",
    sort: 1,
    meta: {
      icon: "",
    },
    parentId: "0",
  };

  refUpload!: any;

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    if (type == "add" && id) {
      this.form.parentId = id;
    }
    if (type == "edit") {
      this.form.id = id;
      this.getMenuDetail(id!);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? menu_add : menu_edit;
    this.loading = true;
    const load = message.loading("验证表单");
    const res = await callback(this.form);
    if (res && res.code == 200) {
      load.then(() => {
        message.success("提交完毕！");
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

  async getMenuDetail(id: string) {
    const res = await menu_detail(id);
    if (res && res.code == 200) {
      this.form = res.data;
      // this.form.parentId = "11";
      this.refUpload.setFile(res.data.meta.icon, 1);
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      name: "",
      component: "",
      path: "",
      sort: 1,
      meta: {
        icon: "",
      },
      parentId: "0",
    };
    this.refUpload.setFile([], 0);
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sm = new SetMenu();
defineExpose({
  toggleShow: sm.toggleShow,
});
</script>

<template>
  <div class="set-menu">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sm.visible"
      :title="sm.type == 'add' ? '添加' : '编辑'"
      @close="sm.close()"
    >
      <a-form
        :model="sm.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sm.onFinish"
      >
        <a-form-item
          label="菜单名称"
          name="name"
          :rules="[{ required: true, message: '请填写菜单名称!' }]"
        >
          <a-input v-model:value="sm.form.name" placeholder="请填写菜单名称!" />
        </a-form-item>
        <a-form-item
          label="菜单组件"
          name="component"
          :rules="[{ required: true, message: '请填写菜单组件!' }]"
        >
          <a-input
            v-model:value="sm.form.component"
            placeholder="请填写菜单组件!"
          />
        </a-form-item>
        <a-form-item
          label="菜单路径"
          name="path"
          :rules="[{ required: true, message: '请填写菜单路径!' }]"
        >
          <a-input v-model:value="sm.form.path" placeholder="请填写菜单路径!" />
        </a-form-item>
        <a-form-item
          label="菜单排序"
          name="sort"
          :rules="[{ required: true, message: '请填写菜单排序!' }]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="请填写菜单排序!"
            v-model:value="sm.form.sort"
            :min="1"
            :formatter="(val: string) => parseInt(val)"
          />
        </a-form-item>
        <a-form-item
          label="菜单图标"
          :name="['meta', 'icon']"
          :rules="[{ required: true, message: '请上传菜单图标!' }]"
        >
          <Upload
            v-model:value="sm.form.meta.icon"
            :ref="(el) => (sm.refUpload = el)"
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
          <a-button :loading="sm.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
