import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import catchAsync from '../../utils/catchAsync';
import { formServices } from './from.service';


const takeAndProcessData = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const file = req.files;
  
  const response = formServices.takeAndProcessData(data, file);
  res.status(200).send(new ApiResponse(200, response));
});

export const formController = {
  takeAndProcessData,
};
