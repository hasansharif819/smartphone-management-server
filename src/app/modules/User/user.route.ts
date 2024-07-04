/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createManagerValidationSchema } from '../Manager/manager.validation';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import { createSellerValidationSchema } from '../Seller/seller.validation';

const router = express.Router();

router.post(
  '/create-seller',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(createSellerValidationSchema),
  UserControllers.createSeller,
);

router.post(
  '/create-manager',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(createManagerValidationSchema),
  UserControllers.createManager,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

export const UserRoutes = router;
