import { h } from "vue";
import { Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import type { filter_data_type } from "@/types/common";
export const columns: TableColumnType[] = [
  {
    title: "名称",
    dataIndex: "name",
    width: 120,
  },
  {
    title: "性别",
    dataIndex: "sex",
    width: 120,
    align: "center",
    customRender({ text }) {
      return text == 1 ? "男" : "女";
    },
  },
  {
    title: "手机号",
    dataIndex: "phone",
    width: 240,
  },
  {
    title: "身份证",
    dataIndex: "idCard",
    width: 240,
  },
  {
    title: "卡包",
    dataIndex: "cardNum",
    width: 120,
  },
  {
    title: "积分",
    dataIndex: "integral",
    width: 120,
  },
  {
    title: "余额",
    dataIndex: "balance",
    width: 120,
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 120,
    align: "center",
    customRender({ text }) {
      return h(
        Tag,
        {
          color: text == 1 ? "green" : "red",
        },
        { default: () => (text == 1 ? "激活" : "黑名单") }
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
export const filterData: filter_data_type[] = [];
