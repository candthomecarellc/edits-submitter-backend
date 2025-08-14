import { Router } from 'express';
import { DocumentController } from './document.controller';
import { upload } from '../../middleware/multerMiddleware';

const router = Router();
const documentController = new DocumentController();

// Get all documents for an application
router.get('/application/:applicationId', documentController.getDocumentsByApplication);

// Get document statistics for an application
router.get('/application/:applicationId/stats', documentController.getDocumentStats);

// Get a specific document
router.get('/:documentId', documentController.getDocumentById);

// Download a document
router.get('/:documentId/download', documentController.downloadDocument);

// Upload a new document
router.post('/application/:applicationId/upload', 
    upload.single('document'), 
    documentController.uploadDocument
);

// Update document metadata
router.patch('/:documentId', documentController.updateDocument);

// Update document status
router.patch('/:documentId/status', documentController.updateDocumentStatus);

// Delete a document
router.delete('/:documentId', documentController.deleteDocument);

export default router;
