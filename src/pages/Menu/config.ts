import type { TableColumnType } from "ant-design-vue";
export interface RowData {
  name: string;
  id: string;
  sort: number;
  children?: RowData[];
}

export const columns: TableColumnType[] = [
  {
    title: "名称",
    dataIndex: "name",
    width: 240,
  },
  {
    title: "排序",
    dataIndex: "sort",
    width: 120,
    align: "center",
    sorter: (a: RowData, b: RowData) => a.sort - b.sort,
  },
  {
    title: "菜单组件",
    dataIndex: "component",
  },
  {
    title: "菜单路径",
    dataIndex: "path",
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
    fixed: "right",
    width: 240,
  },
];
