import api from "./service";
import qs from "qs";
import type { edit_type } from "@/types/health";

export const health_detail = (id: string) => {
  return api.get<edit_type>(`/user/healthDoc/selectByUser?userId=${id}`);
};

export const health_edit = (data: edit_type) => {
  return api.put("/user/healthDoc/update", qs.stringify(data), {});
};
