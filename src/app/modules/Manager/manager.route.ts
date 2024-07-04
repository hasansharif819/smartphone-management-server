import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { ManagerControllers } from './manager.controller';
import { updateManagerValidationSchema } from './manager.validation';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  ManagerControllers.getAllManagers,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  ManagerControllers.getSingleManager,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(updateManagerValidationSchema),
  ManagerControllers.updateManager,
);

router.delete(
  '/:managerId',
  auth(USER_ROLE.superAdmin),
  ManagerControllers.deleteManager,
);

export const ManagerRoutes = router;
