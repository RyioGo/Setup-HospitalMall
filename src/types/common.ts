export interface pagination_type {
  pageSize: number;
  pageNum: number;
  total: number;
  current?: number;
  param: {
    [x: string]: any;
  };
}

export interface filter_data_type {
  label: string;
  key: string;
  type: number;
  dict?: { name: string; id: number }[];
  getDict?: Function;
}
