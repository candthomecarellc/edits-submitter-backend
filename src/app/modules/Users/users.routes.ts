import express, { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userController } from './users.controller';
import { validateUser } from './users.validation';
import authMiddleware from '../../middleware/authMiddleware';

const router: Router = express.Router();

// Public routes
router.post(
    '/register',
    validateRequest(validateUser.userValidationSchema),
    userController.createUser,
);

router.post(
    '/login',
    validateRequest(validateUser.loginValidationSchema),
    userController.loginUser,
);

router.post('/refresh-token', userController.refreshAccessToken);

// Protected routes
router.use(authMiddleware);
router.get('/', userController.getAllusers);
router.post('/logout', userController.logoutUser);

export const usersRoutes = router;
