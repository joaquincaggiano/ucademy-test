export interface User {
  id: ID;
  name: string;
  lastName: string;
  email: string;
  phone: string | null;
  isActive: boolean;
  username?: string;
}

export interface ID {
  $oid: string;
}
