import api from "./service";
import qs from "qs";

export const goods_sku_value_delete = (id: string) => {
  return api.delete(`/goods/goodsSkuValue/delete/${id}`);
};
