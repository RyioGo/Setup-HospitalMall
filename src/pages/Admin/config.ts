import { h } from "vue";
import { Avatar, Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";

export const columns: TableColumnType[] = [
  {
    title: "名称",
    dataIndex: "name",
    width: 240,
  },
  {
    title: "账号",
    dataIndex: "account",
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
    title: "头像",
    dataIndex: "headPicture",
    customRender({ text }) {
      return h(Avatar, { src: text }, { default: () => "U" });
    },
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    width: 240,
  },
];
