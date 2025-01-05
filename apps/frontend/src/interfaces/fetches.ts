import { User } from './user';



export interface FetchResponse {
  status: number;
  message: string;
}

export interface FetchUserResponse {
  status: number;
  message: string;
  user?: User
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
