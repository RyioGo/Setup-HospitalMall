<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { role_delete, role_selectPage } from "@/api/role";

import { columns } from "./config";
import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/role";
//  for you components
import SetMenuRole from "./components/SetMenuRole.vue";
import SetRole from "./components/SetRole.vue";
@Setup
class RoleView extends Context {
  columns = columns;
  data: edit_type[] = [];
  page: pagination_type = {
    "show-size-changer": true,
    pageSize: 1,
    pageNum: 10,
    total: 0,
  };

  loading = false;

  setMenuRole!: any;
  setRoleRef!: any;

  openSetRole(type: string, id?: string) {
    this.setRoleRef.toggleShow(type, id);
  }

  openSetMenuRole(id: string) {
    this.setMenuRole.toggleShow(id);
  }

  async getDataList() {
    this.loading = true;
    const res = await role_selectPage(this.page);
    if (res && res.code == 200) {
      this.data = res.data;
    } else {
      message.error(res.message);
    }
    this.loading = false;
  }

  async delRole(id: string) {
    const res = await role_delete(id);
    if (res && res.code == 200) {
      this.getDataList();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  }

  @PassOnTo(onMounted)
  onMountedRun() {
    this.getDataList();
  }
}

export default defineComponent({
  components: { SetMenuRole, SetRole },
  ...RoleView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="角色管理" :bordered="false">
      <div class="action">
        <a-button type="primary" shape="round" @click="openSetRole('add')">
          添加
        </a-button>
      </div>
      <a-table
        rowKey="id"
        :loading="loading"
        :pagination="page"
        :dataSource="data"
        :columns="columns"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'actions'">
            <a-button type="link" @click="openSetMenuRole(record.id)">
              菜单
            </a-button>
            <a-button type="link" @click="openSetRole('edit', record.id)">
              编辑
            </a-button>
            <a-popconfirm
              title="确认删除?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="delRole(record.id)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- 功能区 -->
    <SetMenuRole :ref="(el) => (setMenuRole = el)" />
    <SetRole :ref="(el) => (setRoleRef = el)" @list="getDataList" />
  </div>
</template>

<style scoped lang="less">
.page-body {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  background-color: #fff;
  min-height: 100%;
  border-radius: 8px;
  overflow: hidden;
  .action {
    margin-bottom: 12px;
  }
}
</style>
