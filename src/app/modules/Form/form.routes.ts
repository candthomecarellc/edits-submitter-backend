import { Router } from 'express';
import { upload } from '../../middleware/multerMiddleware';
import { formController } from './form.controller';

const router = Router();

router.post(
  '/takeAndProcessData',
  upload.fields([
    {
      name: 'supportingDocument',
      maxCount: 3,
    },
  ]),
  formController.takeAndProcessData,
);

const formRoutes = router;
export default formRoutes;
