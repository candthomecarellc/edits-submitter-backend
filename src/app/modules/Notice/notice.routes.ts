import { Router } from 'express';
import { uploadBatchLog, getBatchLogs } from './notice.controller';
import { uploadText } from '../../middleware/multerMiddleware';

const router = Router();

// Get all batch logs
router.get('/', getBatchLogs);

// Upload and parse multiple response log files
router.post('/upload', uploadText.array('files', 4), uploadBatchLog);

export default router;
