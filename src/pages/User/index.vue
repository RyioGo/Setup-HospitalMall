<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { user_selectPage } from "@/api/user";
import { columns, filterData } from "./config";
import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/user";
//  for you components
import SetUser from "./components/SetUser.vue";

import FilterData from "@/components/FilterData/index.vue";
@Setup
class UserView extends Context {
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

  setUserRef!: any;

  openSetUser(type: string, id?: string) {
    this.setUserRef.toggleShow(type, id);
  }

  change(page: pagination_type) {
    this.page.pageNum = page.current as number;
    this.page.pageSize = page.pageSize;
    this.getDataList();
  }

  async getDataList() {
    this.loading = true;
    const res = await user_selectPage(this.page);
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

  @PassOnTo(onMounted)
  onMountedRun() {
    this.getDataList();
  }
}

export default defineComponent({
  components: { SetUser, FilterData },
  ...UserView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="会员管理" :bordered="false">
      <FilterData
        :filter-data="filterData"
        v-model:value="page.param"
        @list="getDataList"
      />
      <!-- <div class="action">
        <a-button type="primary" shape="round" @click="openSetAdmin('add')">
          添加
        </a-button>
      </div> -->
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
            <a-button type="link" @click="openSetUser('edit', record.id)">
              编辑
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    <SetUser :ref="(el) => (setUserRef = el)" @list="getDataList" />
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
