import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import { add_type, edit_type } from "@/types/user_type";

export const user_type_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>(
    "/user/merberType/selectPage",
    qs.stringify(data),
    {}
  );
};
export const user_type_detail = (id: string) => {
  return api.get<edit_type>(`/user/merberType/detail/${id}`);
};
export const user_type_add = (data: add_type) => {
  return api.post("/user/merberType/add", qs.stringify(data), {});
};
export const user_type_edit = (data: edit_type) => {
  return api.put("/user/merberType/update", qs.stringify(data), {});
};
export const user_type_delete = (id: string) => {
  return api.delete(`/user/merberType/delete/${id}`);
};
