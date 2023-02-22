export interface add_type {
  name: string;
  price: number | null;
}

export interface edit_type extends add_type {
  id?: string;
}
