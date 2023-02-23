import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import { add_type, edit_type } from "@/types/category";

export const category_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>(
    "/goods/category/selectPage",
    qs.stringify(data),
    {}
  );
};
export const category_detail = (id: string) => {
  return api.get<edit_type>(`/goods/category/detail/${id}`);
};
export const category_add = (data: add_type) => {
  return api.post("/goods/category/add", qs.stringify(data), {});
};
export const category_edit = (data: edit_type) => {
  return api.put("/goods/category/update", qs.stringify(data), {});
};
export const category_delete = (id: string) => {
  return api.delete(`/goods/category/delete/${id}`);
};
export const category_list = () => {
  return api.get<edit_type[]>("/goods/category/list");
};
