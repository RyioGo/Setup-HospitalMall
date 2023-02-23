import { h } from "vue";
import { Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";

export const columns: TableColumnType[] = [
  {
    title: "预约单号",
    dataIndex: "number",
    width: 120,
  },
  {
    title: "预约人员",
    dataIndex: ["userModel", "name"],
    width: 120,
  },
  {
    title: "科室",
    dataIndex: "department",
  },
  {
    title: "医师",
    width: 120,
    dataIndex: ["doctorModel", "name"],
  },
  {
    title: "预约价格",
    align: "center",
    dataIndex: "price",
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    customRender({ text }) {
      if (text == 1) {
        return h(
          Tag,
          {
            color: "green",
          },
          { default: () => "待支付" }
        );
      }
      if (text == 2) {
        return h(
          Tag,
          {
            color: "cyan",
          },
          { default: () => "预约成功" }
        );
      }
      if (text == 3) {
        return h(
          Tag,
          {
            color: "red",
          },
          { default: () => "预约取消" }
        );
      }
    },
  },
  {
    title: "预约时间",
    dataIndex: "orderTime",
    width: 180,
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    width: 240,
  },
];
