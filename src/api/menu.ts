import api from "./service";

import type { RouteRecordRaw } from "vue-router";
import { add_type, edit_type, data_type } from "@/types/menu";

export const menu_add = (data: add_type) => {
  return api.post("/system/menu/add", data);
};

export const menu_edit = (data: edit_type) => {
  return api.put("/system/menu/update", data);
};

export const menu_detail = (id: string) => {
  return api.get<edit_type>(`/system/menu/detail/${id}`);
};

export const menu_selectTree = () => {
  return api.get<data_type[]>("/system/menu/selectTree");
};

export const menu_current = () => {
  return api.get<RouteRecordRaw[]>("/system/menu/current");
};

export const menu_selectByRole = (id: string) => {
  return api.get<string[]>("/system/menu/selectByRole" + `?roleId=${id}`);
};

export const menu_delete = (id: string) => {
  return api.delete(`/system/menu/delete/${id}`);
};
