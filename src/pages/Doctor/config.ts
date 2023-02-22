import { h } from "vue";
import { Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
export const columns: TableColumnType[] = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    width: 240,
  },
];
