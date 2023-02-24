import { h } from "vue";
import { Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import type { filter_data_type } from "@/types/common";

export const columns: TableColumnType[] = [
  {
    title: "订单号",
    dataIndex: "number",
    width: 240,
  },
  {
    title: "物流号",
    dataIndex: "logisticsNumber",
    width: 240,
  },
  {
    title: "电话",
    dataIndex: "phone",
    width: 120,
  },
  {
    title: "价格",
    dataIndex: "price",
    align: "center",
    width: 120,
  },
  {
    title: "地址",
    dataIndex: "address",
    width: 180,
  },

  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    width: 120,
    customRender({ text }) {
      let str = "";
      switch (text) {
        case 1:
          str = "待支付";
          break;
        case 2:
          str = "待发货";
          break;
        case 3:
          str = "待收货";
          break;
        case 4:
          str = "已完成";
          break;
        default:
          str = "已取消";
      }
      return h(
        Tag,
        {
          color: "green",
        },
        { default: () => str }
      );
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: 120,
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    width: 240,
    fixed: "right",
  },
];

export const filterData: filter_data_type[] = [
  {
    label: "订单号",
    key: "number",
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
