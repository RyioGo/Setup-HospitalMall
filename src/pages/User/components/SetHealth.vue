<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { health_detail, health_edit } from "@/api/health";
import utils from "@/libs/UtilsClient";
import type { edit_type } from "@/types/health";
//  for you components
@Setup
class SetHealth extends Define<Emits> {
  visible = false;
  loading = false;

  form: edit_type = {
    name: "",
    birthday: "",
    idCard: "",
    address: "",
    nowAddress: "",
    contactsName: "",
    contactsPhone: "",
    nation: "",
    bloodType: "",
    drugAllergy: "暂无",
    caseAllergy: "暂无",
    healthProblem: "暂无",
    sex: null,
  };

  toggleShow(id: string) {
    this.visible = true;
    this.getHealthDetail(id);
  }

  async onFinish() {
    this.loading = true;
    const load = message.loading("验证表单");
    const res = await health_edit(this.form);
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

  async getHealthDetail(id: string) {
    const res = await health_detail(id);
    if (res && res.code == 200) {
      utils.objectCopyValue(this.form, res.data);
      this.form.sex = (res.data.sex as number) * 1;
      this.form.id = res.data.id;
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      name: "",
      birthday: "",
      idCard: "",
      address: "",
      nowAddress: "",
      contactsName: "",
      contactsPhone: "",
      nation: "",
      bloodType: "",
      drugAllergy: "暂无",
      caseAllergy: "暂无",
      healthProblem: "暂无",
      sex: null,
    };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sh = new SetHealth();
defineExpose({
  toggleShow: sh.toggleShow,
});
</script>

<template>
  <div class="set-admin">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sh.visible"
      title="健康档案"
      @close="sh.close()"
    >
      <a-form
        :model="sh.form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        @finish="sh.onFinish"
      >
        <a-form-item
          label="姓名"
          name="name"
          :rules="[{ required: true, message: '请填写姓名!' }]"
        >
          <a-input v-model:value="sh.form.name" placeholder="请填写姓名!" />
        </a-form-item>
        <a-form-item
          label="性别"
          name="sex"
          :rules="[{ required: true, message: '请选择性别!' }]"
        >
          <a-radio-group v-model:value="sh.form.sex" button-style="solid">
            <a-radio-button :value="1">男</a-radio-button>
            <a-radio-button :value="0">女</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="民族"
          name="nation"
          :rules="[{ required: true, message: '请填写民族!' }]"
        >
          <a-input v-model:value="sh.form.nation" placeholder="请填写民族!" />
        </a-form-item>
        <a-form-item
          label="血型"
          name="bloodType"
          :rules="[{ required: true, message: '请填写血型!' }]"
        >
          <a-input
            v-model:value="sh.form.bloodType"
            placeholder="请填写血型!"
          />
        </a-form-item>
        <a-form-item
          label="出生日期"
          name="birthday"
          :rules="[{ required: true, message: '请填写出生日期!' }]"
        >
          <a-date-picker
            style="width: 100%"
            v-model:value="sh.form.birthday"
            placeholder="请填写出生日期!"
            valueFormat="YYYY-MM-DD"
            format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item
          label="身份证"
          name="idCard"
          :rules="[{ required: true, message: '请填写身份证!' }]"
        >
          <a-input placeholder="请填写身份证!" v-model:value="sh.form.idCard" />
        </a-form-item>
        <a-form-item
          label="户籍地址"
          name="address"
          :rules="[{ required: true, message: '请填写户籍地址!' }]"
        >
          <a-input
            placeholder="请填写户籍地址!"
            v-model:value="sh.form.address"
          />
        </a-form-item>
        <a-form-item
          label="现居地址"
          name="nowAddress"
          :rules="[{ required: true, message: '请填写现居地址!' }]"
        >
          <a-input
            placeholder="请填写现居地址!"
            v-model:value="sh.form.nowAddress"
          />
        </a-form-item>
        <a-form-item
          label="紧急联系人"
          name="contactsName"
          :rules="[{ required: true, message: '请填写紧急联系人!' }]"
        >
          <a-input
            placeholder="请填写紧急联系人!"
            v-model:value="sh.form.contactsName"
          />
        </a-form-item>
        <a-form-item
          label="紧急联系电话"
          name="contactsPhone"
          :rules="[{ required: true, message: '请填写紧急联系电话!' }]"
        >
          <a-input
            placeholder="请填写紧急联系电话!"
            v-model:value="sh.form.contactsPhone"
          />
        </a-form-item>
        <a-form-item
          label="过敏史"
          name="drugAllergy"
          :rules="[{ required: true, message: '请填写过敏史!' }]"
        >
          <a-textarea
            :rows="5"
            placeholder="请填写过敏史!"
            v-model:value="sh.form.drugAllergy"
            :maxlength="120"
          />
        </a-form-item>
        <a-form-item
          label="病例史"
          name="caseAllergy"
          :rules="[{ required: true, message: '请填写病例史!' }]"
        >
          <a-textarea
            :rows="5"
            placeholder="请填写病例史!"
            v-model:value="sh.form.caseAllergy"
            :maxlength="120"
          />
        </a-form-item>
        <a-form-item
          label="现存健康问题"
          name="healthProblem"
          :rules="[{ required: true, message: '请填写现存健康问题!' }]"
        >
          <a-textarea
            :rows="5"
            placeholder="请填写现存健康问题!"
            v-model:value="sh.form.healthProblem"
            :maxlength="120"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button :loading="sh.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
