import { h } from "vue";
import { Avatar } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import type { filter_data_type } from "@/types/common";

export const columns: TableColumnType[] = [
  {
    title: "编号",
    dataIndex: "id",
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "图标",
    dataIndex: "icon",
    customRender({ text }) {
      return h(Avatar, { src: text }, { default: () => "图" });
    },
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    width: 240,
  },
];
export const filterData: filter_data_type[] = [];
