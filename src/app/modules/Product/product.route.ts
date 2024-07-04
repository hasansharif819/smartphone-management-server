import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  ProductControllers.getSingleProduct,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  // validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  ProductControllers.deleteProduct,
);

// Add the route for bulk product deletion
router.post(
  '/bulk-delete',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  ProductControllers.bulkDeleteProducts,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  ProductControllers.getAllProducts,
);

export const ProductRoutes = router;
