import express from 'express';
import { usersRoutes } from '../modules/Users/users.routes';
import formRoutes from '../modules/Form/form.routes';
import applicationRoutes from '../modules/Application/application.routes';
import documentRoutes from '../modules/Document/document.routes';
import noticeRoutes from '../modules/Notice/notice.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/form',
    route: formRoutes,
  },
  {
    path: '/application',
    route: applicationRoutes,
  },
  {
    path: '/documents',
    route: documentRoutes,
  },
  {
    path: '/notice',
    route: noticeRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
