import { h } from "vue";
import { Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
export const columns: TableColumnType[] = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "状态",
    dataIndex: "status",
    customRender({ text }) {
      return h(
        Tag,
        {
          color: text == 1 ? "green" : "red",
        },
        { default: () => (text == 1 ? "激活" : "禁用") }
      );
    },
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    width: 240,
  },
];
