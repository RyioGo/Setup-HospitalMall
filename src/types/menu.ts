export interface add_type {
  name: string;
  component: string;
  path: string;
  sort: number;
  meta: {
    icon: string;
  };
  parentId: string;
}

export interface edit_type extends add_type {
  id?: string;
}

export interface data_type extends add_type {
  children?: data_type[];
  id: string;
}
