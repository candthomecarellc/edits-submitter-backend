import { Router } from 'express';
import { upload } from '../../middleware/multerMiddleware';
import { formController } from './form.controller';

const router = Router();

router
  .route('/takeAndProcessData')
  .post(upload.any(), formController.takeAndProcessData);

const formRoutes = router;
export default formRoutes;
