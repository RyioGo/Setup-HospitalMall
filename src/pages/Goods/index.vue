<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { doctor_delete, doctor_selectPage } from "@/api/doctor";
import { columns } from "./config";
import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/doctor";
//  for you components

@Setup
class GoodsView extends Context {
  columns = columns;
  data: edit_type[] = [];
  page: pagination_type = {
    "show-size-changer": true,
    pageSize: 10,
    pageNum: 1,
    total: 0,
  };

  loading = false;
}

export default defineComponent({
  ...GoodsView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="医师管理" :bordered="false">
      <div class="action">
        <a-button type="primary" shape="round" @click="openSetDoctor('add')">
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
            <a-button type="link" @click="openSetDoctor('edit', record.id)">
              编辑
            </a-button>
            <a-popconfirm
              title="确认删除?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="delDoctor(record.id)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- <SetDoctor :ref="(el) => (setDoctorRef = el)" @list="getDataList" /> -->
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
