import { Document, CreateDocumentDto, UpdateDocumentDto } from './document.interface';
import { Document as DocumentModel } from './document.model';
import { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';
import CustomError from '../../errors/CusromError';

export class DocumentService {
    async createDocument(documentData: CreateDocumentDto): Promise<Document> {
        try {
            const document = new DocumentModel({
                ...documentData,
                applicationId: new Types.ObjectId(documentData.applicationId),
                uploadDate: new Date()
            });
            
            return await document.save();
        } catch (error) {
            throw new CustomError(`Failed to create document: ${error}`, 500);
        }
    }

    async getDocumentsByApplication(applicationId: string): Promise<Document[]> {
        try {
            return await DocumentModel.find({ 
                applicationId: new Types.ObjectId(applicationId) 
            }).sort({ uploadDate: -1 });
        } catch (error) {
            throw new CustomError(`Failed to fetch documents: ${error}`, 500);
        }
    }

    async getDocumentById(documentId: string): Promise<Document | null> {
        try {
            return await DocumentModel.findById(documentId);
        } catch (error) {
            throw new CustomError(`Failed to fetch document: ${error}`, 500);
        }
    }

    async updateDocument(documentId: string, updateData: UpdateDocumentDto): Promise<Document | null> {
        try {
            return await DocumentModel.findByIdAndUpdate(
                documentId,
                updateData,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new CustomError(`Failed to update document: ${error}`, 500);
        }
    }

    async deleteDocument(documentId: string): Promise<boolean> {
        try {
            const document = await DocumentModel.findById(documentId);
            if (!document) {
                throw new CustomError('Document not found', 404);
            }

            // Delete the physical file
            if (fs.existsSync(document.filePath)) {
                fs.unlinkSync(document.filePath);
            }

            // Delete from database
            await DocumentModel.findByIdAndDelete(documentId);
            return true;
        } catch (error) {
            throw new CustomError(`Failed to delete document: ${error}`, 500);
        }
    }

    async getDocumentStats(applicationId: string): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
        required: number;
        optional: number;
    }> {
        try {
            const documents = await DocumentModel.find({ 
                applicationId: new Types.ObjectId(applicationId) 
            });

            return {
                total: documents.length,
                pending: documents.filter(doc => doc.status === 'pending').length,
                approved: documents.filter(doc => doc.status === 'approved').length,
                rejected: documents.filter(doc => doc.status === 'rejected').length,
                required: documents.filter(doc => doc.isRequired).length,
                optional: documents.filter(doc => !doc.isRequired).length
            };
        } catch (error) {
            throw new CustomError(`Failed to get document stats: ${error}`, 500);
        }
    }

    async updateDocumentStatus(documentId: string, status: 'pending' | 'approved' | 'rejected'): Promise<Document | null> {
        try {
            return await DocumentModel.findByIdAndUpdate(
                documentId,
                { status },
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new CustomError(`Failed to update document status: ${error}`, 500);
        }
    }
}
