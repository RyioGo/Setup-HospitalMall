import { h } from "vue";
import { Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import type { filter_data_type } from "@/types/common";
export const columns: TableColumnType[] = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "积分",
    dataIndex: "price",
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    width: 240,
  },
];
export const filterData: filter_data_type[] = [];
