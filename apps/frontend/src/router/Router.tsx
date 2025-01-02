import { Route, Routes } from 'react-router';
import { routes } from './router-config';
import Dashboard from '../components/layouts/Dashboard';
import { Home } from '../app/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index path="/" element={<Home />} />
      </Route>

      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
