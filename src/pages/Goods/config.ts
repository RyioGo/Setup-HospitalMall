import { h } from "vue";
import { Tag, Avatar, Image } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import type { filter_data_type } from "@/types/common";
export const columns: TableColumnType[] = [
  {
    title: "名称",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "价格",
    dataIndex: "price",
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    width: 120,
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
    title: "宣传图",
    dataIndex: "picture",
    width: 120,
    align: "center",
    customRender({ text }) {
      return h(Image, { src: text[0] }, { default: () => "U" });
    },
  },
  {
    title: "简介",
    dataIndex: "description",
    ellipsis: true,
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
    label: "状态",
    key: "status",
    type: 2,
    dict: [
      { name: "激活", id: 1 },
      { name: "禁用", id: 0 },
    ],
  },
];
