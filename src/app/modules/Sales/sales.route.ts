import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { SalesControllers } from './sales.controller';
import { SalesValidations } from './sales.validation';

const router = express.Router();

router.post(
  '/create-sales',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  validateRequest(SalesValidations.createSalesValidationSchema),
  SalesControllers.createSales,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  SalesControllers.getSingleSales,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  SalesControllers.getAllSales,
);

export const SalesRoutes = router;
