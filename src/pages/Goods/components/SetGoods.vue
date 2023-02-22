<script lang="ts">
//  for node_modules api

import { Setup, Define } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { category_list } from "@/api/category";
import { goods_detail, goods_add, goods_edit } from "@/api/goods";
import type { edit_type } from "@/types/goods";
import type * as categoryType from "@/types/category";
//  for you components
import Upload from "@/components/Upload/index.vue";

@Setup
class SetGoods extends Define<Emits> {
  visible = false;
  loading = false;
  type = "add";

  form: edit_type = {
    name: "",
    price: null,
    tags: [],
    status: null,
    categoryId: null,
    picture: [],
    description: "",
    title: "",
    goodsSpuModelList: [],
    goodsSkuModelList: [],
  };
  categoryList: categoryType.edit_type[] = [];

  refUpload!: any;

  toggleShow(type: string, id?: string) {
    this.visible = true;
    this.type = type;
    this.getCategoryList();
    if (type == "edit") {
      this.getDoctorDetail(id!);
    }
  }

  async getDoctorDetail(id: string) {
    const res = await goods_detail(id);
    if (res && res.code == 200) {
      this.form = res.data;
    } else {
      message.error(res.message);
    }
  }

  async onFinish() {
    const callback = this.type == "add" ? goods_add : goods_edit;
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

  async getCategoryList() {
    const res = await category_list();
    if (res && res.code == 200) {
      this.categoryList = res.data;
    } else {
      message.error(res.message);
    }
  }

  close() {
    this.form = {
      name: "",
      price: null,
      tags: [],
      status: null,
      categoryId: null,
      picture: [],
      description: "",
      title: "",
      goodsSpuModelList: [],
      goodsSkuModelList: [],
    };
  }
}
</script>

<script setup lang="ts">
export interface Emits {
  (e: "list"): void;
}

defineEmits<Emits>();

const sg = new SetGoods();
defineExpose({
  toggleShow: sg.toggleShow,
});
</script>

<template>
  <div class="set-doctor">
    <a-drawer
      placement="right"
      width="420"
      v-model:visible="sg.visible"
      :title="sg.type == 'add' ? '添加' : '编辑'"
      @close="sg.close()"
    >
      <a-form
        :model="sg.form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="sg.onFinish"
      >
        <a-form-item
          label="类别"
          name="categoryId"
          :rules="[{ required: true, message: '请选择类别!' }]"
        >
          <a-select
            v-model:value="sg.form.categoryId"
            :options="sg.categoryList"
            :fieldNames="{ label: 'name', value: 'id' }"
            placeholder="请选择类别!"
          />
        </a-form-item>
        <a-form-item
          label="名称"
          name="name"
          :rules="[{ required: true, message: '请填写商品名称!' }]"
        >
          <a-input v-model:value="sg.form.name" placeholder="请填写商品名称!" />
        </a-form-item>
        <a-form-item
          label="标题"
          name="title"
          :rules="[{ required: true, message: '请填写商品标题!' }]"
        >
          <a-input
            v-model:value="sg.form.title"
            placeholder="请填写商品标题!"
          />
        </a-form-item>
        <a-form-item
          label="价格"
          name="price"
          :rules="[{ required: true, message: '请填写商品价格!' }]"
        >
          <a-input-number
            style="width: 100%"
            v-model:value="sg.form.price"
            placeholder="请填写商品价格!"
            :min="1"
          />
        </a-form-item>
        <a-form-item
          label="标签"
          name="tags"
          :rules="[{ required: true, message: '请填写商品标签!' }]"
        >
          <a-select
            v-model:value="sg.form.tags"
            mode="tags"
            style="width: 100%"
            placeholder="请填写商品相关标签"
          />
        </a-form-item>
        <a-form-item
          label="状态"
          name="status"
          :rules="[{ required: true, message: '请选择状态!' }]"
        >
          <a-radio-group v-model:value="sg.form.status" button-style="solid">
            <a-radio-button :value="1">激活</a-radio-button>
            <a-radio-button :value="0">禁用</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="宣传图"
          name="picture"
          :rules="[{ required: true, message: '请上传宣传图!' }]"
        >
          <Upload
            v-model:value="sg.form.picture"
            :limit="3"
            :ref="(el) => (sg.refUpload = el)"
          />
        </a-form-item>
        <a-form-item
          label="简介"
          name="description"
          :rules="[{ required: true, message: '请填写商品简介!' }]"
        >
          <a-textarea
            v-model:value="sg.form.description"
            placeholder="请填写简介！"
            :rows="4"
            :maxlength="50"
            showCount
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button :loading="sg.loading" type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>