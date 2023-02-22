import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import { add_type, edit_type } from "@/types/doctor";

export const doctor_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>("/order/doctor/selectPage", data, {});
};
export const doctor_detail = (id: string) => {
  return api.get<edit_type>(`/order/doctor/detail/${id}`);
};
export const doctor_add = (data: add_type) => {
  return api.post("/order/doctor/add", qs.stringify(data), {});
};
export const doctor_edit = (data: edit_type) => {
  return api.put("/order/doctor/update", qs.stringify(data), {});
};
export const doctor_delete = (id: string) => {
  return api.delete(`/order/doctor/delete/${id}`);
};