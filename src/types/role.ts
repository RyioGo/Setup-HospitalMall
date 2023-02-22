export interface add_type {
  name: string;
  status: number | string;
}

export interface edit_type extends add_type {
  id?: string;
}

export interface addMenu_type {
  id: string;
  menuIds: string;
}
