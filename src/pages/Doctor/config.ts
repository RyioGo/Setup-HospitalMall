import { h } from "vue";
import { Avatar } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
export const columns: TableColumnType[] = [
  {
    title: "名称",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "科室",
    dataIndex: ["departmentModel", "name"],
    align: "center",
  },
  {
    title: "预约价格",
    dataIndex: "price",
    align: "center",
  },
  {
    title: "职称",
    dataIndex: "professionalModelList",
    customRender({ text }) {
      let str = "";
      text.forEach((item: { name: string }) => {
        str += item.name + "、";
      });
      return str.slice(0, str.length - 1);
    },
    align: "center",
  },
  {
    title: "头像",
    dataIndex: "picture",
    customRender({ text }) {
      return h(Avatar, { src: text }, { default: () => "U" });
    },
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    width: 240,
  },
];
