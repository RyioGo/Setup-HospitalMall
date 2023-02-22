export interface add_type {
  name: string;
  skilled: string;
  picture: string;
  departmentId: number | null;
  professionalIds: string;
  introduction: string;
}

export interface edit_type extends add_type {
  id?: string;
}
