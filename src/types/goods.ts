import type * as goodsSku from "@/types/goods_sku";
import type * as goodsSpu from "@/types/goods_spu";

export interface add_type {
  name: string;
  price: number | null;
  tags: string[];
  status: number | null;
  categoryId: number | null;
  picture: string[];
  description: string;
  title: string;
  goodsSpuModelList: goodsSpu.edit_type[];
  goodsSkuModelList: goodsSku.edit_type[];
}

export interface edit_type extends add_type {
  id?: string;
}
