<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { user_type_delete, user_type_selectPage } from "@/api/user_type";
import { columns } from "./config";

import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/user_type";
//  for you components
import SetUserType from "./components/SetUserType.vue";
@Setup
class UserTypeView extends Context {
  columns = columns;
  data: edit_type[] = [];
  page: pagination_type = {
    "show-size-changer": true,
    pageSize: 1,
    pageNum: 10,
    total: 0,
  };

  loading = false;

  setUserTypeRef!: any;

  openSetUserType(type: string, id?: string) {
    this.setUserTypeRef.toggleShow(type, id);
  }

  async getDataList() {
    this.loading = true;
    const res = await user_type_selectPage(this.page);
    if (res && res.code == 200) {
      this.data = res.data;
    } else {
      message.error(res.message);
    }
    this.loading = false;
  }

  async delUserType(id: string) {
    const res = await user_type_delete(id);
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
  components: { SetUserType },
  ...UserTypeView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="用户类型" :bordered="false">
      <div class="action">
        <a-button type="primary" shape="round" @click="openSetUserType('add')">
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
            <a-button type="link" @click="openSetUserType('edit', record.id)">
              编辑
            </a-button>
            <a-popconfirm
              title="确认删除?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="delUserType(record.id)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <SetUserType :ref="(el) => (setUserTypeRef = el)" @list="getDataList" />
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
