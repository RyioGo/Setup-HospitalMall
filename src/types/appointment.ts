export interface add_type {
  userId: string | null;
  doctorId: string | null;
  orderTime: string;
  number: string;
  department: string;
  price: number | null;
  status: number | null;
  phone: string;
}

export interface edit_type extends add_type {
  id?: string;
}
