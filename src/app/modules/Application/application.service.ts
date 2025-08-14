import { Application } from './application.model';
import { Application as ApplicationInterface } from './application.interface';
import { ApplicationFrontend } from './application.frontend.interface';
import { today } from '../../utils/utilityFunction';
import { formatForFrontend } from './Formats/backendToFrontend';
import { formatForBackend } from './Formats/frontendToBackend';
import { mergeApplication } from './Formats/application.merge';
import { formatForSubmit } from './Formats/formatForSubmit';
import { formServices } from '../Form/from.service1';
import { Document } from '../Document/document.model';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

export class ApplicationService {
    async create(applicationData: ApplicationInterface): Promise<ApplicationInterface> {
        applicationData.caseId = "1111" + applicationData.patientId + today();
        const application = new Application(applicationData);
        return await application.save();
    }

    async findAll(): Promise<ApplicationInterface[]> {
        return await Application.find();
    }

    async findById(id: string): Promise<ApplicationFrontend | null> {
        const application = await Application.findById(id);
        if (!application) {
            return null;
        }
        return formatForFrontend(application) as ApplicationFrontend;
    }

    async update(id: string, applicationData: Partial<ApplicationFrontend>): Promise<ApplicationFrontend | null> {
        // First, get the existing application
        const existingApplication = await Application.findById(id);
        if (!existingApplication) {
            return null;
        }
        const updatedApplication = await Application.findByIdAndUpdate(id, mergeApplication(existingApplication, applicationData), { new: true });
        
        if (!updatedApplication) {
            return null;
        }
        
        return formatForFrontend(updatedApplication) as ApplicationFrontend;
    }

    async delete(id: string): Promise<ApplicationFrontend | null> {
        const application = await Application.findByIdAndDelete(id);
        if (!application) {
            return null;
        }
        return formatForFrontend(application) as ApplicationFrontend;
    }

    async getApplicationList(): Promise<ApplicationFrontend[]> {
        const applications = await Application.find().select('_id caseId caseName applicant status createdAt createdBy updatedAt');
        const formattedApplications = applications.map(app => formatForFrontend(app) as ApplicationFrontend);
        // console.log(formattedApplications);
        return formattedApplications;
    }

    async submit(id: string): Promise<unknown> {
        const application = await Application.findById(id);
        if (!application) {
            return null;
        }
        console.log("application found and passing it for formatting");
        const formData = formatForSubmit(formatForFrontend(application) as ApplicationFrontend);
        
        // Fetch all documents for this application
        console.log("fetching documents for application");
        const documents = await Document.find({ applicationId: id }).sort({ uploadDate: 1 });
        console.log(`Found ${documents.length} documents for application`);
        
        // Convert documents to Express.Multer.File[] format
        const documentFiles = await this.convertDocumentsToMulterFiles(documents);
        console.log(`Converted ${documentFiles.length} documents to Multer files`);
        
        console.log("passing it to takeAndProcessData");
        return await formServices.takeAndProcessData(formData, documentFiles);
    }

    private async convertDocumentsToMulterFiles(documents: any[]): Promise<Express.Multer.File[]> {
        const multerFiles: Express.Multer.File[] = [];
        
        for (const document of documents) {
            try {
                // Check if the file exists
                if (!fs.existsSync(document.filePath)) {
                    console.warn(`Document file not found: ${document.filePath}`);
                    continue;
                }
                
                // Read the file
                const fileBuffer = fs.readFileSync(document.filePath);
                
                // Create a Multer file object
                const multerFile: Express.Multer.File = {
                    fieldname: 'document',
                    originalname: document.originalName,
                    encoding: '7bit',
                    mimetype: document.mimeType,
                    buffer: fileBuffer,
                    size: document.fileSize,
                    stream: null as any,
                    destination: path.dirname(document.filePath),
                    filename: document.fileName,
                    path: document.filePath
                };
                
                multerFiles.push(multerFile);
                console.log(`Converted document: ${document.originalName}`);
                
            } catch (error) {
                console.error(`Error converting document ${document.originalName}:`, error);
            }
        }
        
        return multerFiles;
    }
} 