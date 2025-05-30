import { Application } from './application.model';
import { Application as ApplicationInterface } from './application.interface';

export class ApplicationService {
    async create(applicationData: ApplicationInterface): Promise<ApplicationInterface> {
        const application = new Application(applicationData);
        return await application.save();
    }

    async findAll(): Promise<ApplicationInterface[]> {
        return await Application.find();
    }

    async findById(id: string): Promise<ApplicationInterface | null> {
        return await Application.findById(id);
    }

    async update(id: string, applicationData: Partial<ApplicationInterface>): Promise<ApplicationInterface | null> {
        return await Application.findByIdAndUpdate(id, applicationData, { new: true });
    }

    async delete(id: string): Promise<ApplicationInterface | null> {
        return await Application.findByIdAndDelete(id);
    }
} 