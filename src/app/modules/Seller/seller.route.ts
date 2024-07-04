import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { SellerControllers } from './seller.controller';
import { updateSellerValidationSchema } from './seller.validation';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  SellerControllers.getAllSellers,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  SellerControllers.getSingleSeller,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(updateSellerValidationSchema),
  SellerControllers.updateSeller,
);

router.delete(
  '/:sellerId',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  SellerControllers.deleteSeller,
);

export const SellerRoutes = router;
