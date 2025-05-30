import { Request, Response } from 'express';
import { ApplicationService } from './application.service';
import { Application as ApplicationInterface } from './application.interface';

export class ApplicationController {
    private applicationService: ApplicationService;

    constructor() {
        this.applicationService = new ApplicationService();
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const applicationData: ApplicationInterface = req.body;
            const application = await this.applicationService.create(applicationData);
            res.status(201).json({
                success: true,
                data: application
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error creating application'
            });
        }
    };

    findAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const applications = await this.applicationService.findAll();
            res.status(200).json({
                success: true,
                data: applications
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error fetching applications'
            });
        }
    };

    findById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const application = await this.applicationService.findById(id);
            
            if (!application) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: application
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error fetching application'
            });
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const applicationData: Partial<ApplicationInterface> = req.body;
            const application = await this.applicationService.update(id, applicationData);

            if (!application) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: application
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error updating application'
            });
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const application = await this.applicationService.delete(id);

            if (!application) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Application deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error deleting application'
            });
        }
    };
} 