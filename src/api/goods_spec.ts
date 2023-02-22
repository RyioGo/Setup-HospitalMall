import api from "./service";
import qs from "qs";

import { add_type, edit_type } from "@/types/goods_spec";

export const goods_spec_detail = (id: string) => {
  return api.get<edit_type>(`/goods/goodsSpec/detail/${id}`);
};
export const goods_spec_add = (data: add_type) => {
  return api.post("/goods/goodsSpec/add", qs.stringify(data), {});
};
export const goods_spec_edit = (data: edit_type) => {
  return api.put("/goods/goodsSpec/update", qs.stringify(data), {});
};
export const goods_spec_delete = (id: string) => {
  return api.delete(`/goods/goodsSpec/delete/${id}`);
};
export const goods_spec_list = (id: string) => {
  return api.get<edit_type>(`/goodsSpec/list?goodsId=${id}`);
};
