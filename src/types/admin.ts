export interface login_type {
  account: string;
  password: string;
}

export interface add_type {
  name: string;
  account: string;
  status: number | string;
  headPicture: string;
  roleId: number | null;
}

export interface edit_type extends add_type {
  id?: string;
}

export interface modifyPassword_type {
  id: string;
  password: string;
}
