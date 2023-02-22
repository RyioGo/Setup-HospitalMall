<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { user_selectPage } from "@/api/user";
import { columns } from "./config";
import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/user";
//  for you components
import SetUser from "./components/SetUser.vue";
@Setup
class UserView extends Context {
  columns = columns;
  data: edit_type[] = [];
  page: pagination_type = {
    "show-size-changer": true,
    pageSize: 1,
    pageNum: 10,
    total: 0,
  };

  loading = false;

  setUserRef!: any;

  openSetUser(type: string, id?: string) {
    this.setUserRef.toggleShow(type, id);
  }

  async getDataList() {
    this.loading = true;
    const res = await user_selectPage(this.page);
    if (res && res.code == 200) {
      this.data = res.data;
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
  components: { SetUser },
  ...UserView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="会员管理" :bordered="false">
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
