import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import { add_type, edit_type } from "@/types/department";

export const department_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>(
    "/order/department/selectPage",
    qs.stringify(data),
    {}
  );
};
export const department_detail = (id: string) => {
  return api.get<edit_type>(`/order/department/detail/${id}`);
};
export const department_add = (data: add_type) => {
  return api.post("/order/department/add", qs.stringify(data), {});
};
export const department_edit = (data: edit_type) => {
  return api.put("/order/department/update", qs.stringify(data), {});
};
export const department_delete = (id: string) => {
  return api.delete(`/order/department/delete/${id}`);
};
export const department_list = () => {
  return api.get<edit_type[]>("/order/department/list");
};
