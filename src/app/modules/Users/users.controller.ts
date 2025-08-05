import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './users.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const createdUser = await userServices.createUser(data);
  res.status(201).json(new ApiResponse(201, createdUser, 'User created successfully'));
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await userServices.loginUser(email, password);
  res.status(200).json(new ApiResponse(200, result, 'Login successful'));
});

const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await userServices.refreshAccessToken(refreshToken);
  res.status(200).json(new ApiResponse(200, result, 'Access token refreshed successfully'));
};

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const result = await userServices.logoutUser(userId);
  res.status(200).json(new ApiResponse(200, result, 'Logout successful'));
});

const getAllusers = async (req: Request, res: Response) => {
  const users = await userServices.getAllUsers();
  res.status(200).json(new ApiResponse(200, users, 'Users retrieved successfully'));
};

export const userController = {
  createUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getAllusers,
};
