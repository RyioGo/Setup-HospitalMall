export interface pagination_type {
  "show-size-changer": boolean;
  pageSize: number;
  pageNum: number;
  total: number;
  current?: number;
  param: {
    [x: string]: any;
  };
}
