<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { department_list } from "@/api/department";
import { doctor_list } from "@/api/doctor";
import { appointment_detail, appointment_edit } from "@/api/appointment";

import type { edit_type } from "@/types/appointment";

import utils from "@/libs/UtilsClient";
import type * as doctorType from "@/types/doctor";
import type * as departmentType from "@/types/department";
//  for you components

@Setup
class SetAppointment extends Define<Emits> {
  visible = false;
  type = "add";
  loading = false;

  form: edit_type = {
    userId: null,
    doctorId: null,
    orderTime: "",
    number: "",
    department: "",
    price: null,
    status: null,
    phone: "",
  };

  departmentList: departmentType.edit_type[] = [];
  doctorList: doctorType.edit_type[] = [];

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    this.getDepartmentList();
    if (type == "edit") {
      this.getAppointmentDetail(id!);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? appointment_edit : appointment_edit;
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

  async getDepartmentList() {
    const res = await department_list();
    if (res && res.code == 200) {
      this.departmentList = res.data;
    } else {
      message.error(res.message);
    }
  }

  async getDoctorList(id: string) {
    const res = await doctor_list(id);
    if (res && res.code == 200) {
      this.doctorList = res.data;
    } else {
      message.error(res.message);
    }
  }

  async getAppointmentDetail(id: string) {
    const res = await appointment_detail(id);
    if (res && res.code == 200) {
      utils.objectCopyValue(this.form, res.data);
      this.getDoctorList((res.data as any).doctorModel.departmentId);
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      userId: null,
      doctorId: null,
      orderTime: "",
      number: "",
      department: "",
      price: null,
      status: null,
      phone: "",
    };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sa = new SetAppointment();
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
          label="医师"
          name="doctorId"
          :rules="[{ required: true, message: '请选择医师!' }]"
        >
          <a-select
            v-model:value="sa.form.doctorId"
            :options="sa.doctorList"
            :fieldNames="{ label: 'name', value: 'id' }"
            placeholder="请选择医师!"
          />
        </a-form-item>
        <a-form-item
          label="预约电话"
          name="phone"
          :rules="[{ required: true, message: '请填写预约电话!' }]"
        >
          <a-input-number
            style="width: 100%"
            v-model:value="sa.form.phone"
            placeholder="请填写预约电话!"
            :min="1"
          />
        </a-form-item>
        <a-form-item
          label="价格"
          name="price"
          :rules="[{ required: true, message: '请填写预约价格!' }]"
        >
          <a-input-number
            style="width: 100%"
            v-model:value="sa.form.price"
            placeholder="请填写预约价格!"
            :min="1"
          />
        </a-form-item>
        <a-form-item
          label="状态"
          name="status"
          :rules="[{ required: true, message: '请选择状态!' }]"
        >
          <a-radio-group v-model:value="sa.form.status" button-style="solid">
            <a-radio-button :value="1">待支付</a-radio-button>
            <a-radio-button :value="2">预约成功</a-radio-button>
            <a-radio-button :value="3">预约取消</a-radio-button>
          </a-radio-group>
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
