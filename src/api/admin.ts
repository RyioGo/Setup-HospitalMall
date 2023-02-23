import api from "./service";
import qs from "qs";

import type { pagination_type } from "@/types/common";
import {
  login_type,
  add_type,
  edit_type,
  modifyPassword_type,
} from "@/types/admin";

import { user_info_type } from "@/types/user";

export const admin_login = (data: login_type) => {
  return api.post<user_info_type>("/system/admin/login", qs.stringify(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const admin_add = (data: add_type) => {
  return api.post("/system/admin/add", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const admin_edit = (data: edit_type) => {
  return api.put("/system/admin/update", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const admin_detail = (id: string) => {
  return api.get<edit_type>(`/system/admin/detail/${id}`);
};

export const admin_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>(
    "/system/admin/selectPage",
    qs.stringify(data),
    {}
  );
};

export const admin_delete = (id: string) => {
  return api.delete(`/system/admin/delete/${id}`);
};

export const admin_modifyPassword = (data: modifyPassword_type) => {
  return api.put("/system/admin/modifyPassword", qs.stringify(data), {});
};

export const admin_logout = () => {
  return api.get("/system/admin/logout");
};

export const admin_current = () => {
  return api.get("/system/admin/current");
};
