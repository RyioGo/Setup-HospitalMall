export interface add_type {
  name: string;
  price: number | null;
  tags: string[];
  status: number | null;
  categoryId: number;
  picture: string[];
  goodsSpuModelList: {
    name: string;
    value: string;
  };
  goodsSkuModelList: {
    name: string;
    goodsSkuValueModelList: { value: string }[];
  };
}

export interface edit_type extends add_type {
  id?: string;
}
