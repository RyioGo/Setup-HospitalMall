export interface user_info_type {
  token: string;
  name: string;
  account: string;
  headPicture: string;
}

export interface edit_type {
  status: number | null;
  id?: string;
  balance: number | null;
  integral: number | null;
}
