<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { order_detail, order_edit } from "@/api/order";
import type { edit_type } from "@/types/order";
import utils from "@/libs/UtilsClient";
//  for you components

@Setup
class SetAdmin extends Define<Emits> {
  visible = false;
  type = "add";
  loading = false;

  form: edit_type = {
    status: null,
    address: "",
    phone: "",
    logisticsNumber: "",
    remark: "",
  };

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    if (type == "edit") {
      this.getOrderDetail(id!);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? order_edit : order_edit;
    this.loading = true;

    if ((this.form.status as number) < 3) {
      this.form.logisticsNumber = "暂无";
    }

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

  async getOrderDetail(id: string) {
    const res = await order_detail(id);
    if (res && res.code == 200) {
      utils.objectCopyValue(this.form, res.data);
      this.form.id = id;
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      status: null,
      address: "",
      phone: "",
      logisticsNumber: "",
      remark: "",
    };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const so = new SetAdmin();
defineExpose({
  toggleShow: so.toggleShow,
});
</script>

<template>
  <div class="set-order">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="so.visible"
      :title="so.type == 'add' ? '添加' : '编辑'"
      @close="so.close()"
    >
      <a-form
        :model="so.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="so.onFinish"
      >
        <a-form-item
          label="订单状态"
          name="status"
          :rules="[{ required: true, message: '请选择订单状态!' }]"
        >
          <a-select
            v-model:value="so.form.status"
            placeholder="请选择订单状态!"
          >
            <a-select-option :value="1">待支付</a-select-option>
            <a-select-option :value="2">待发货</a-select-option>
            <a-select-option :value="3">待收货</a-select-option>
            <a-select-option :value="4">已完成</a-select-option>
            <a-select-option :value="5">已取消</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="电话"
          name="phone"
          :rules="[{ required: true, message: '请填写电话!' }]"
        >
          <a-input v-model:value="so.form.phone" placeholder="请填写电话!" />
        </a-form-item>
        <a-form-item
          label="物流号"
          name="logisticsNumber"
          v-if="so.form.status as number >= 3"
          :rules="[{ required: true, message: '请填写物流号!' }]"
        >
          <a-input
            v-model:value="so.form.logisticsNumber"
            placeholder="请填写物流号!"
          />
        </a-form-item>
        <a-form-item
          label="地址"
          name="address"
          :rules="[{ required: true, message: '请填写地址!' }]"
        >
          <a-textarea
            v-model:value="so.form.address"
            placeholder="请填写地址！"
            :rows="4"
            :maxlength="50"
            showCount
          />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea
            v-model:value="so.form.remark"
            placeholder="请填写备注！"
            :rows="4"
            :maxlength="50"
            showCount
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="so.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
