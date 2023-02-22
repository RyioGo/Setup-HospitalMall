export interface add_type {
  name: string;
  value: string;
}

export interface edit_type extends add_type {
  goodsId?: string | null;
  id?: string | null;
}
