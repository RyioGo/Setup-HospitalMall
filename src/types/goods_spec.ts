export interface add_type {
  name: string;
  spec: string;
  goodsId: string | null;
  price: number | null;
  skuValueIds: string;
}

export interface edit_type extends add_type {
  id?: string;
}
