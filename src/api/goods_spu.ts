import api from "./service";
import qs from "qs";

export const goods_spu_delete = (id: string) => {
  return api.delete(`/goods/goodsSpu/delete/${id}`);
};
