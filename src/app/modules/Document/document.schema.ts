import { Schema } from 'mongoose';
import { Document } from './document.interface';

export const DocumentSchema = new Schema<Document>({
    applicationId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Application', 
        required: true 
    },
    fileName: { 
        type: String, 
        required: true 
    },
    originalName: { 
        type: String, 
        required: true 
    },
    filePath: { 
        type: String, 
        required: true 
    },
    fileSize: { 
        type: Number, 
        required: true 
    },
    mimeType: { 
        type: String, 
        required: true 
    },
    documentType: { 
        type: String, 
        required: true 
    },
    documentCategory: { 
        type: String, 
        required: true 
    },
    uploadedBy: { 
        type: String, 
        required: true 
    },
    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
    description: { 
        type: String 
    },
    isRequired: { 
        type: Boolean, 
        default: false 
    },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    }
}, {
    timestamps: true
});

// Create index for faster queries
DocumentSchema.index({ applicationId: 1, documentType: 1 });
DocumentSchema.index({ uploadedBy: 1 });
DocumentSchema.index({ status: 1 });
