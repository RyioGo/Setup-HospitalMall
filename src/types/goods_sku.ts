import type * as goodsSkuValue from "@/types/goods_sku_value";
export interface add_type {
  name: string;
  goodsSkuValueModelList: goodsSkuValue.edit_type[];
}

export interface edit_type extends add_type {
  goodsId?: string | null;
  id?: string | null;
}
