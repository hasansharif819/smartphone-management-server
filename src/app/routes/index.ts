import { Router } from 'express';
import { ManagerRoutes } from '../modules/Manager/manager.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { UserRoutes } from '../modules/User/user.route';
import { SellerRoutes } from '../modules/Seller/seller.route';
import { SalesRoutes } from '../modules/Sales/sales.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/seller',
    route: SellerRoutes,
  },
  {
    path: '/manager',
    route: ManagerRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/sales',
    route: SalesRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
