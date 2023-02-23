import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import { add_type, edit_type } from "@/types/goods";

export const goods_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>(
    "/goods/goods/selectPage",
    qs.stringify(data),
    {}
  );
};
export const goods_detail = (id: string) => {
  return api.get<edit_type>(`/goods/goods/detail/${id}`);
};
export const goods_add = (data: add_type) => {
  return api.post("/goods/goods/add", data, {});
};
export const goods_edit = (data: edit_type) => {
  return api.put("/goods/goods/update", data, {});
};
export const goods_delete = (id: string) => {
  return api.delete(`/goods/goods/delete/${id}`);
};
