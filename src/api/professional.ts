import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import { add_type, edit_type } from "@/types/professional";

export const professional_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>("/order/professional/selectPage", data, {});
};
export const professional_detail = (id: string) => {
  return api.get<edit_type>(`/order/professional/detail/${id}`);
};
export const professional_add = (data: add_type) => {
  return api.post("/order/professional/add", qs.stringify(data), {});
};
export const professional_edit = (data: edit_type) => {
  return api.put("/order/professional/update", qs.stringify(data), {});
};
export const professional_delete = (id: string) => {
  return api.delete(`/order/professional/delete/${id}`);
};

export const professional_list = () => {
  return api.get<edit_type[]>("/order/professional/list");
};
