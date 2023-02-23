<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api

import { appointment_cancel, appointment_selectPage } from "@/api/appointment";
import { columns } from "./config";

import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/appointment";
//  for you components
import SetAppointment from "./components/SetAppointment.vue";

@Setup
class AppointmentView extends Context {
  columns = columns;
  data: edit_type[] = [];
  page: pagination_type = {
    "show-size-changer": true,
    pageSize: 10,
    pageNum: 1,
    total: 0,
    param: {
      hjb: "",
    },
  };

  loading = false;

  setAppointmentRef!: any;

  openSetAppointment(type: string, id?: string) {
    this.setAppointmentRef.toggleShow(type, id);
  }

  async getDataList() {
    this.loading = true;
    const res = await appointment_selectPage(this.page);
    if (res && res.code == 200) {
      this.data = res.data;
    } else {
      message.error(res.message);
    }
    this.loading = false;
  }

  async cancelAppointment(id: string) {
    const res = await appointment_cancel(id);
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
  components: { SetAppointment },
  ...AppointmentView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="预约记录" :bordered="false">
      <!-- <div class="action">
        <a-button
          type="primary"
          shape="round"
          @click="openSetAppointment('add')"
        >
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
            <a-button
              type="link"
              @click="openSetAppointment('edit', record.id)"
            >
              编辑
            </a-button>
            <a-popconfirm
              title="确认取消?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="cancelAppointment(record.id)"
            >
              <a-button type="link" danger>取消</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <SetAppointment
      :ref="(el) => (setAppointmentRef = el)"
      @list="getDataList"
    />
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
