<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { role_listAll } from "@/api/role";
import { admin_detail, admin_add, admin_edit } from "@/api/admin";
import type { edit_type } from "@/types/admin";
import type * as roleType from "@/types/role";
//  for you components
import Upload from "@/components/Upload/index.vue";
@Setup
class SetAdmin extends Define<Emits> {
  visible = false;
  type = "add";
  loading = false;

  form: edit_type = {
    name: "",
    account: "",
    status: "",
    headPicture: "",
    roleId: null,
  };
  roleList: roleType.edit_type[] = [];

  refUpload!: any;

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    this.getRoleList();
    if (type == "edit") {
      this.getAdminDetail(id!);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? admin_add : admin_edit;
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

  async getRoleList() {
    const res = await role_listAll();
    if (res && res.code == 200) {
      this.roleList = res.data;
    } else {
      message.error(res.message);
    }
  }

  async getAdminDetail(id: string) {
    const res = await admin_detail(id);
    if (res && res.code == 200) {
      this.form = res.data;
      // this.form.parentId = "11";
      this.refUpload.setFile(res.data.headPicture, 1);
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      name: "",
      account: "",
      status: "",
      headPicture: "",
      roleId: null,
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

const sa = new SetAdmin();
defineExpose({
  toggleShow: sa.toggleShow,
});
</script>

<template>
  <div class="set-admin">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sa.visible"
      :title="sa.type == 'add' ? '添加' : '编辑'"
      @close="sa.close()"
    >
      <a-form
        :model="sa.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sa.onFinish"
      >
        <a-form-item
          label="管理员角色"
          name="roleId"
          :rules="[{ required: true, message: '请选择管理员角色!' }]"
        >
          <a-select
            v-model:value="sa.form.roleId"
            :options="sa.roleList"
            :fieldNames="{ label: 'name', value: 'id' }"
            placeholder="请选择管理员角色!"
          />
        </a-form-item>
        <a-form-item
          label="管理员名称"
          name="name"
          :rules="[{ required: true, message: '请填写管理员名称!' }]"
        >
          <a-input
            v-model:value="sa.form.name"
            placeholder="请填写管理员名称!"
          />
        </a-form-item>
        <a-form-item
          label="管理员账号"
          name="account"
          :rules="[{ required: true, message: '请填写管理员账号!' }]"
        >
          <a-input
            v-model:value="sa.form.account"
            placeholder="请填写管理员账号!"
          />
          <a-alert
            v-if="sa.type == 'add'"
            type="info"
            show-icon
            closable
            style="margin-top: 3px"
          >
            <template #message> 新管理员默认密码：123456 </template>
          </a-alert>
        </a-form-item>
        <a-form-item
          label="状态"
          name="status"
          :rules="[{ required: true, message: '请选择状态!' }]"
        >
          <a-radio-group v-model:value="sa.form.status" button-style="solid">
            <a-radio-button :value="1">激活</a-radio-button>
            <a-radio-button :value="0">禁用</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="头像"
          name="headPicture"
          :rules="[{ required: true, message: '请上传头像!' }]"
        >
          <Upload
            v-model:value="sa.form.headPicture"
            :ref="(el) => (sa.refUpload = el)"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="sa.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
