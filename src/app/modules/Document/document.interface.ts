import { ObjectId } from "mongoose";

export interface Document {
    _id: ObjectId;
    applicationId: ObjectId;
    fileName: string;
    originalName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    documentType: string;
    documentCategory: string;
    uploadedBy: string;
    uploadDate: Date;
    description?: string;
    isRequired: boolean;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateDocumentDto {
    applicationId: string;
    fileName: string;
    originalName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    documentType: string;
    documentCategory: string;
    uploadedBy: string;
    description?: string;
    isRequired: boolean;
}

export interface UpdateDocumentDto {
    fileName?: string;
    description?: string;
    documentType?: string;
    documentCategory?: string;
    status?: 'pending' | 'approved' | 'rejected';
}
