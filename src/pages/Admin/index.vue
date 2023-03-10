<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { admin_delete, admin_selectPage } from "@/api/admin";
import { columns, filterData } from "./config";

import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/admin";
//  for you components
import SetAdmin from "./components/SetAdmin.vue";
import SetPassword from "./components/SetPassword.vue";

import FilterData from "@/components/FilterData/index.vue";
@Setup
class AdminView extends Context {
  columns = columns;
  filterData = filterData;
  data: edit_type[] = [];
  page: pagination_type = {
    pageSize: 10,
    pageNum: 1,
    total: 0,
    param: {},
  };

  loading = false;

  setAdminRef!: any;
  setPasswordRef!: any;

  openSetAdmin(type: string, id?: string) {
    this.setAdminRef.toggleShow(type, id);
  }
  openSetPassword(id: string) {
    this.setPasswordRef.toggleShow(id);
  }

  change(page: pagination_type) {
    this.page.pageNum = page.current as number;
    this.page.pageSize = page.pageSize;
    this.getDataList();
  }

  async getDataList() {
    this.loading = true;
    const res = await admin_selectPage(this.page);
    if (res && res.code == 200) {
      this.data = res.data;
      this.page.total = res.total;
      if (res.data.length == 0 && this.page.pageNum > 1) {
        this.page.pageNum--;
        this.getDataList();
      }
    } else {
      message.error(res.message);
    }
    this.loading = false;
  }

  async delAdmin(id: string) {
    const res = await admin_delete(id);
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
  components: { SetAdmin, SetPassword, FilterData },
  ...AdminView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="?????????" :bordered="false">
      <FilterData
        :filter-data="filterData"
        v-model:value="page.param"
        @list="getDataList"
      />
      <div class="action">
        <a-button type="primary" shape="round" @click="openSetAdmin('add')">
          ??????
        </a-button>
      </div>
      <a-table
        rowKey="id"
        :loading="loading"
        :pagination="page"
        :dataSource="data"
        :columns="columns"
        @change="change"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'actions'">
            <a-button type="link" @click="openSetPassword(record.id)">
              ?????????
            </a-button>
            <a-button type="link" @click="openSetAdmin('edit', record.id)">
              ??????
            </a-button>
            <a-popconfirm
              title="?????????????"
              ok-text="??????"
              cancel-text="??????"
              @confirm="delAdmin(record.id)"
            >
              <a-button type="link" danger>??????</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <SetAdmin :ref="(el) => (setAdminRef = el)" @list="getDataList" />
    <SetPassword :ref="(el) => (setPasswordRef = el)" />
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
