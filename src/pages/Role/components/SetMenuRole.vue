<script lang="ts">
//  for node_modules api
import { defineComponent } from "vue";
import { Setup, Context } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { menu_selectByRole, menu_selectTree } from "@/api/menu";
import { role_addMenu } from "@/api/role";
import type { addMenu_type } from "@/types/role";
import type { data_type } from "@/types/menu";
//  for you components

@Setup
class SetMenuRole extends Context {
  visible = false;
  loading = false;

  treeData: data_type[] = [];
  fieldNames = {
    children: "children",
    title: "name",
    key: "id",
  };

  checkedKeys: any = {
    checked: [],
  };

  form: addMenu_type = {
    id: "",
    menuIds: "",
  };

  toggleShow(id: string) {
    this.visible = true;
    this.form.id = id;
    this.getDataList();
    this.getMenuList(id);
  }

  async getDataList() {
    const res = await menu_selectTree();
    if (res && res.code == 200) {
      this.treeData = res.data;
    } else {
      message.error(res.message);
    }
  }

  async getMenuList(id: string) {
    const res = await menu_selectByRole(id);
    if (res && res.code == 200) {
      this.checkedKeys.checked = res.data;
    } else {
      message.error(res.message);
    }
  }

  async save() {
    this.loading = true;
    this.form.menuIds = this.checkedKeys.checked.toString();

    const res = await role_addMenu(this.form);
    if (res && res.code == 200) {
      message.success(res.message);
      this.visible = false;
    } else {
      message.error(res.message);
    }
    this.loading = false;
  }
}

export default defineComponent({
  ...SetMenuRole.inject(),
});
</script>

<template>
  <div class="set-menu-role">
    <a-drawer
      placement="right"
      width="420"
      title="分配菜单"
      v-model:visible="visible"
    >
      <a-tree
        v-if="treeData.length"
        v-model:checkedKeys="checkedKeys"
        :tree-data="treeData"
        :field-names="fieldNames"
        checkable
        checkStrictly
        defaultExpandAll
      />
      <a-button
        :loading="loading"
        type="primary"
        style="margin-top: 12px"
        @click="save()"
      >
        保存
      </a-button>
    </a-drawer>
  </div>
</template>
