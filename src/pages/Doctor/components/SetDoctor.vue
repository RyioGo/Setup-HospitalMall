<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { department_list } from "@/api/department";
import { professional_list } from "@/api/professional";
import { doctor_detail, doctor_add, doctor_edit } from "@/api/doctor";
import utils from "@/libs/UtilsClient";
import type { edit_type } from "@/types/doctor";
import type * as departmentType from "@/types/department";
import type * as professionalType from "@/types/professional";
//  for you components
import Upload from "@/components/Upload/index.vue";
@Setup
class SetDoctor extends Define<Emits> {
  visible = false;
  loading = false;
  type = "add";

  departmentList: departmentType.edit_type[] = [];
  professionalList: professionalType.edit_type[] = [];

  form: edit_type = {
    name: "",
    skilled: "",
    picture: "",
    departmentId: null,
    professionalIds: [],
    introduction: "",
    price: 0,
    id: "",
  };

  refUpload!: any;

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    this.getDepartmentList();
    this.getProfessionalList();
    if (type == "edit") {
      this.form.id = id;
      this.getDoctorDetail(id!);
    }
  }

  async getDepartmentList() {
    const res = await department_list();
    if (res && res.code == 200) {
      this.departmentList = res.data;
    } else {
      message.error(res.message);
    }
  }
  async getProfessionalList() {
    const res = await professional_list();
    if (res && res.code == 200) {
      this.professionalList = res.data;
    } else {
      message.error(res.message);
    }
  }

  async getDoctorDetail(id: string) {
    const res = await doctor_detail(id);
    if (res && res.code == 200) {
      utils.objectCopyValue(this.form, res.data);

      this.refUpload.setFile(res.data.picture, 1);
    } else {
      message.error(res.message);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? doctor_add : doctor_edit;
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
    this.form = {
      name: "",
      skilled: "",
      picture: "",
      departmentId: null,
      professionalIds: [],
      introduction: "",
      price: 0,
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

const sd = new SetDoctor();
defineExpose({
  toggleShow: sd.toggleShow,
});
</script>

<template>
  <div class="set-doctor">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sd.visible"
      :title="sd.type == 'add' ? '添加' : '编辑'"
      @close="sd.close()"
    >
      <a-form
        :model="sd.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sd.onFinish"
      >
        <a-form-item
          label="相关科室"
          name="departmentId"
          :rules="[{ required: true, message: '请选择相关科室!' }]"
        >
          <a-select
            v-model:value="sd.form.departmentId"
            :options="sd.departmentList"
            :fieldNames="{ label: 'name', value: 'id' }"
            placeholder="请选择相关科室!"
          />
        </a-form-item>
        <a-form-item
          label="相关职称"
          name="professionalIds"
          :rules="[{ required: true, message: '请选择相关职称!' }]"
        >
          <a-select
            v-model:value="sd.form.professionalIds"
            mode="multiple"
            :options="sd.professionalList"
            :fieldNames="{ label: 'name', value: 'id' }"
            placeholder="请选择相关职称!"
          />
        </a-form-item>
        <a-form-item
          label="名称"
          name="name"
          :rules="[{ required: true, message: '请填写医师名称!' }]"
        >
          <a-input v-model:value="sd.form.name" placeholder="请填写医师名称!" />
        </a-form-item>
        <a-form-item
          label="预约价格"
          name="price"
          :rules="[{ required: true, message: '请填写医师名称!' }]"
        >
          <a-input-number
            style="width: 100%"
            v-model:value="sd.form.price"
            placeholder="请填写预约价格!"
            :min="1"
          />
        </a-form-item>
        <a-form-item
          label="擅长"
          name="skilled"
          :rules="[{ required: true, message: '请填写医师专长!' }]"
        >
          <a-input
            v-model:value="sd.form.skilled"
            placeholder="请填写医师专长!"
          />
        </a-form-item>
        <a-form-item
          label="头像"
          name="picture"
          :rules="[{ required: true, message: '请上传头像!' }]"
        >
          <Upload
            v-model:value="sd.form.picture"
            :ref="(el) => (sd.refUpload = el)"
          />
        </a-form-item>
        <a-form-item
          label="简介"
          name="introduction"
          :rules="[{ required: true, message: '请填写简介!' }]"
        >
          <a-textarea
            v-model:value="sd.form.introduction"
            placeholder="请填写简介！"
            :rows="4"
            :maxlength="50"
            showCount
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="sd.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
