import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import catchAsync from '../../utils/catchAsync';
import { formServices } from './From.service';

const takeAndProcessData = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const response = formServices.takeAndProcessData(data);
  res.status(200).send(new ApiResponse(200, response));
});

export const formController = {
  takeAndProcessData,
};
