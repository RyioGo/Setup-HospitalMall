export interface add_type {
  name: string;
  skilled: string;
  picture: string;
  departmentId: number | null;
  professionalIds: Array<string | number> | string;
  introduction: string;
  price: number;
}

export interface edit_type extends add_type {
  id?: string;
}
