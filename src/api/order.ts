import api from "./service";
import qs from "qs";
import type { pagination_type } from "@/types/common";
import type { edit_type } from "@/types/order";

export const order_edit = (data: edit_type) => {
  return api.put("/goods/order/update", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const order_detail = (id: string) => {
  return api.get<edit_type>(`/goods/order/detail/${id}`);
};

export const order_selectPage = (data: pagination_type) => {
  return api.post<edit_type[]>(
    "/goods/order/selectPage",
    qs.stringify(data),
    {}
  );
};
