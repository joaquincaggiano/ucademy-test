import { create } from 'zustand';
import { User } from '../interfaces/user';
import { GetUsersData } from '../interfaces/fetches';

interface State {
  users: User[];
  user: User | null;
  setUsers: (users: User[]) => void;
  setRefreshUsers: (page: number) => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useUsersStore = create<State>((set, get) => ({
  users: [],
  user: null,
  setUsers: (users) => set({ users }),
  setUser: (user) => set({ user }),
  setRefreshUsers: async (page) => {
    const response = await fetch(
        `http://localhost:3000/api/users?page=${page}`
      );
      const data: GetUsersData = await response.json();
      set({ users: data.users });
  }
}));
