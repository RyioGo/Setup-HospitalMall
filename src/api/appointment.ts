import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import { edit_type } from "@/types/appointment";

export const appointment_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>(
    "/order/registerRecords/selectPage",
    qs.stringify(data),
    {}
  );
};
export const appointment_edit = (data: edit_type) => {
  return api.put("/order/registerRecords/update", qs.stringify(data), {});
};
export const appointment_cancel = (id: string) => {
  return api.get(`/order/registerRecords/cancel?id=${id}`);
};
export const appointment_detail = (id: string) => {
  return api.get<edit_type>(`/order/registerRecords/detail/${id}`);
};
