import api from "./service";
import qs from "qs";

import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/user";

export const user_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>("/user/user/selectPage", data, {});
};

export const user_edit = (data: edit_type) => {
  return api.put("/user/user/modifyStatus", qs.stringify(data), {});
};

export const user_detail = (id: string) => {
  return api.get<edit_type>(`/user/user/detail/${id}`);
};
