import { Application } from './application.model';
import { Application as ApplicationInterface } from './application.interface';
import { ApplicationFrontend } from './application.frontend.interface';
import { today } from '../../utils/utilityFunction';
import { formatForFrontend } from './Formats/backendToFrontend';
import { formatForBackend } from './Formats/frontendToBackend';
import { mergeApplication } from './Formats/application.merge';
import { formatForSubmit } from './Formats/formatForSubmit';
import { formServices } from '../Form/from.service1';

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

    async submit(id: string): Promise<null> {
        const application = await Application.findById(id);
        if (!application) {
            return null;
        }
        console.log("application found and passing it for formatting");
        const formData = formatForSubmit(formatForFrontend(application) as ApplicationFrontend);
        console.log("passing it to takeAndProcessData");
        await formServices.takeAndProcessData(formData, []);
        return null;
    }
} 