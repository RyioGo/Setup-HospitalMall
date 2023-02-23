<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { user_detail, user_edit } from "@/api/user";
import utils from "@/libs/UtilsClient";
import type { edit_type } from "@/types/user";
//  for you components
import Upload from "@/components/Upload/index.vue";
@Setup
class SetUser extends Define<Emits> {
  visible = false;
  type = "add";
  loading = false;

  form: edit_type = {
    status: null,
    balance: null,
    integral: null,
    nickname: "",
    headPicture: "",
    sex: "",
    name: "",
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
      utils.objectCopyValue(this.form, res.data);
      this.form.id = res.data.id;
      this.refUpload.setFile(res.data.headPicture, 1);
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      status: null,
      balance: null,
      integral: null,
      nickname: "",
      headPicture: "",
      sex: "",
      name: "",
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
          label="昵称"
          name="nickname"
          :rules="[{ required: true, message: '请填写昵称!' }]"
        >
          <a-input v-model:value="su.form.nickname" placeholder="请填写昵称!" />
        </a-form-item>
        <a-form-item
          label="名称"
          name="name"
          :rules="[{ required: true, message: '请填写名称!' }]"
        >
          <a-input v-model:value="su.form.name" placeholder="请填写名称!" />
        </a-form-item>
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
        <a-form-item
          label="性别"
          name="sex"
          :rules="[{ required: true, message: '请选择性别!' }]"
        >
          <a-radio-group v-model:value="su.form.sex" button-style="solid">
            <a-radio-button :value="1">男</a-radio-button>
            <a-radio-button :value="0">女</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="头像"
          name="headPicture"
          :rules="[{ required: true, message: '请上传头像!' }]"
        >
          <Upload
            v-model:value="su.form.headPicture"
            :ref="(el) => (su.refUpload = el)"
          />
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
