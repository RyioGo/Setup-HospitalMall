import api from "./service";
import qs from "qs";

export const goods_sku_delete = (id: string) => {
  return api.delete(`/goods/goodsSpu/delete/${id}`);
};
