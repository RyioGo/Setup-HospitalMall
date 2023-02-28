import api from "./service";
import qs from "qs";
import { edit_type } from "@/types/goods_sku";

export const goods_sku_delete = (id: string) => {
  return api.delete(`/goods/goodsSku/delete/${id}`);
};
export const goods_sku_list = (id: string) => {
  return api.get<edit_type[]>(`/goods/goodsSku/selectByGoodsId?goodsId=${id}`);
};
