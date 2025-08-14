import { Request, Response, NextFunction } from 'express';
import { DocumentService } from './document.service';
import { CreateDocumentDto, UpdateDocumentDto } from './document.interface';
import { upload } from '../../middleware/multerMiddleware';
import path from 'path';
import fs from 'fs';
import CustomError from '../../errors/CusromError';

export class DocumentController {
    private documentService: DocumentService;

    constructor() {
        this.documentService = new DocumentService();
    }

    // Upload a new document
    uploadDocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationId } = req.params;
            const file = req.file;
            const { documentType, documentCategory, description, isRequired } = req.body;

            if (!file) {
                throw new CustomError('No file uploaded', 400);
            }

            if (!applicationId || !documentType || !documentCategory) {
                throw new CustomError('Missing required fields', 400);
            }

            // Create documents directory if it doesn't exist
            const documentsDir = path.join(process.cwd(), 'uploads', 'documents', applicationId);
            if (!fs.existsSync(documentsDir)) {
                fs.mkdirSync(documentsDir, { recursive: true });
            }

            // Move file to documents directory
            const fileName = `${Date.now()}-${file.originalname}`;
            const filePath = path.join(documentsDir, fileName);
            fs.renameSync(file.path, filePath);

            const documentData: CreateDocumentDto = {
                applicationId,
                fileName,
                originalName: file.originalname,
                filePath,
                fileSize: file.size,
                mimeType: file.mimetype,
                documentType,
                documentCategory,
                uploadedBy: (req as any).user?.id || 'unknown',
                description,
                isRequired: isRequired === 'true'
            };

            const document = await this.documentService.createDocument(documentData);

            res.status(201).json({
                success: true,
                message: 'Document uploaded successfully',
                data: document
            });
        } catch (error) {
            // Clean up temp file if upload fails
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            next(error);
        }
    };

    // Get all documents for an application
    getDocumentsByApplication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationId } = req.params;
            const documents = await this.documentService.getDocumentsByApplication(applicationId);
            const stats = await this.documentService.getDocumentStats(applicationId);

            res.status(200).json({
                success: true,
                data: {
                    documents,
                    stats
                }
            });
        } catch (error) {
            next(error);
        }
    };

    // Get a specific document
    getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { documentId } = req.params;
            const document = await this.documentService.getDocumentById(documentId);

            if (!document) {
                throw new CustomError('Document not found', 404);
            }

            res.status(200).json({
                success: true,
                data: document
            });
        } catch (error) {
            next(error);
        }
    };

    // Download a document
    downloadDocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { documentId } = req.params;
            const document = await this.documentService.getDocumentById(documentId);

            if (!document) {
                throw new CustomError('Document not found', 404);
            }

            if (!fs.existsSync(document.filePath)) {
                throw new CustomError('File not found on server', 404);
            }

            res.download(document.filePath, document.originalName);
        } catch (error) {
            next(error);
        }
    };

    // Update document metadata
    updateDocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { documentId } = req.params;
            const updateData: UpdateDocumentDto = req.body;

            const document = await this.documentService.updateDocument(documentId, updateData);

            if (!document) {
                throw new CustomError('Document not found', 404);
            }

            res.status(200).json({
                success: true,
                message: 'Document updated successfully',
                data: document
            });
        } catch (error) {
            next(error);
        }
    };

    // Update document status
    updateDocumentStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { documentId } = req.params;
            const { status } = req.body;

            if (!['pending', 'approved', 'rejected'].includes(status)) {
                throw new CustomError('Invalid status value', 400);
            }

            const document = await this.documentService.updateDocumentStatus(documentId, status);

            if (!document) {
                throw new CustomError('Document not found', 404);
            }

            res.status(200).json({
                success: true,
                message: 'Document status updated successfully',
                data: document
            });
        } catch (error) {
            next(error);
        }
    };

    // Delete a document
    deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { documentId } = req.params;
            await this.documentService.deleteDocument(documentId);

            res.status(200).json({
                success: true,
                message: 'Document deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    };

    // Get document statistics
    getDocumentStats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationId } = req.params;
            const stats = await this.documentService.getDocumentStats(applicationId);

            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            next(error);
        }
    };
}
