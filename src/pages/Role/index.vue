<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { role_delete, role_selectPage } from "@/api/role";

import { columns, filterData } from "./config";
import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/role";
//  for you components
import SetMenuRole from "./components/SetMenuRole.vue";
import SetRole from "./components/SetRole.vue";

import FilterData from "@/components/FilterData/index.vue";
@Setup
class RoleView extends Context {
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

  setMenuRole!: any;
  setRoleRef!: any;

  openSetRole(type: string, id?: string) {
    this.setRoleRef.toggleShow(type, id);
  }

  openSetMenuRole(id: string) {
    this.setMenuRole.toggleShow(id);
  }

  change(page: pagination_type) {
    this.page.pageNum = page.current as number;
    this.page.pageSize = page.pageSize;
    this.getDataList();
  }

  async getDataList() {
    this.loading = true;
    const res = await role_selectPage(this.page);
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
  components: { SetMenuRole, SetRole, FilterData },
  ...RoleView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="????????????" :bordered="false">
      <FilterData
        :filter-data="filterData"
        v-model:value="page.param"
        @list="getDataList"
      />
      <div class="action">
        <a-button type="primary" shape="round" @click="openSetRole('add')">
          ??????
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
              ??????
            </a-button>
            <a-button type="link" @click="openSetRole('edit', record.id)">
              ??????
            </a-button>
            <a-popconfirm
              title="?????????????"
              ok-text="??????"
              cancel-text="??????"
              @confirm="delRole(record.id)"
            >
              <a-button type="link" danger>??????</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- ????????? -->
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
