export interface User {
  id: ID;
  name: string;
  lastName: string;
  email: string;
  phone: null | string;
  isActive: boolean;
}

export interface ID {
  $oid: string;
}
