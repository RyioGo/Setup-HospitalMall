import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import { add_type, edit_type, addMenu_type } from "@/types/role";

export const role_add = (data: add_type) => {
  return api.post("/system/role/add", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const role_edit = (data: edit_type) => {
  return api.put("/system/role/update", qs.stringify(data), {});
};

export const role_detail = (id: string) => {
  return api.get<edit_type>(`/system/role/detail/${id}`);
};

export const role_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>(
    "/system/role/selectPage",
    qs.stringify(data),
    {}
  );
};

export const role_delete = (id: string) => {
  return api.delete(`/system/role/delete/${id}`);
};

export const role_addMenu = (data: addMenu_type) => {
  return api.post("/system/role/addMenu", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const role_listAll = () => {
  return api.get<edit_type[]>("/system/role/listAll");
};
