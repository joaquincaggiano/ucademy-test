import { User } from './user';

export interface UpdateUsersStatus {
  status: 200 | 404;
  message: string;
}

export interface GetUsersData {
  users: User[];
  totalPages: number;
  totalUsers: number;
}

export interface GetUserById {
  status: 200 | 404;
  user: User | null;
}
