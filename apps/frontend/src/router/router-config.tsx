import { UserDetail, WriteUser } from '../app/pages';

export const routes = [
  {
    path: '/user/:id',
    element: <UserDetail />,
  },
  {
    path: '/user/create',
    element: <WriteUser />,
  },
  {
    path: '/user/:id/edit',
    element: <WriteUser />,
  },
];
