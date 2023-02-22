export interface add_type {
  value: string;
}

export interface edit_type extends add_type {
  skuId?: string | null;
  id?: string | null;
}
