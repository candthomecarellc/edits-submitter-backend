import express from 'express';
import { usersRoutes } from '../modules/Users/users.routes';
import formRoutes from '../modules/Form/form.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/form',
    route: formRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
