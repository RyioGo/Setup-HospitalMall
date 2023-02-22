<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
//  for you api
import { menu_selectTree, menu_delete } from "@/api/menu";
import { RowData, columns } from "./config";

//  for you components
import SetMenu from "./components/SetMenu.vue";
@Setup
class MenuView extends Context {
  columns = columns;
  data: RowData[] = [];
  loading = false;

  setMenuRef!: any;

  openSetMenu(type: string, id?: string) {
    this.setMenuRef.toggleShow(type, id);
  }

  async getDataList() {
    this.loading = true;
    const res = await menu_selectTree();
    if (res && res.code == 200) {
      this.data = res.data;
    } else {
      message.error(res.message);
    }
    this.loading = false;
  }

  async delMenu(id: string) {
    const res = await menu_delete(id);
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
  components: {
    SetMenu,
  },
  ...MenuView.inject(),
});
</script>

<template>
  <div class="page-body">
    <a-card title="菜单配置" :bordered="false">
      <div class="action">
        <a-button type="primary" shape="round" @click="openSetMenu('add')">
          添加
        </a-button>
      </div>
      <a-table
        rowKey="id"
        :loading="loading"
        :pagination="false"
        :dataSource="data"
        :columns="columns"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'actions'">
            <a-button type="link" @click="openSetMenu('add', record.id)">
              子菜单
            </a-button>
            <a-button type="link" @click="openSetMenu('edit', record.id)">
              编辑
            </a-button>
            <a-popconfirm
              title="确认删除?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="delMenu(record.id)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- 功能区 -->
    <SetMenu :ref="(el) => (setMenuRef = el)" @list="getDataList" />
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
