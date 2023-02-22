import api from "./service";
import qs from "qs";

export const goods_sku_delete = (id: string) => {
  return api.delete(`/goods/goodsSku/delete/${id}`);
};
export const goods_sku_list = (id: string) => {
  return api.get(`/goods/goodsSku/selectByGoodsId?goodsId=${id}`);
};
