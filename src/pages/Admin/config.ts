import { h } from "vue";
import { Avatar, Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import type { filter_data_type } from "@/types/common";

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
    align: "center",
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

export const filterData: filter_data_type[] = [
  {
    label: "名称",
    key: "name",
    type: 1,
  },
  {
    label: "账号",
    key: "account",
    type: 1,
  },
  {
    label: "状态",
    key: "status",
    type: 2,
    dict: [
      { name: "激活", id: 1 },
      { name: "禁用", id: 0 },
    ],
  },
];
