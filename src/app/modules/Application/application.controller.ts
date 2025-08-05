import { Request, Response } from 'express';
import { ApplicationService } from './application.service';
import { Application as ApplicationInterface } from './application.interface';
import { ApplicationFrontend } from './application.frontend.interface';
import { Types } from 'mongoose';
import { Application } from './application.model';

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
            const applicationData: Partial<ApplicationFrontend> = req.body;
            console.log("id", id);
            console.log("applicationDataFromFrontend", applicationData);
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

    // Get application list
    getApplicationList = async (req: Request, res: Response): Promise<void> => {
        try {
            const applications = await this.applicationService.getApplicationList();
            res.status(200).json({
                success: true,
                data: applications
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error fetching application list'
            });
        }
    };

    submit = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const application = await this.applicationService.submit(id);
            if (!application) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
                return;
            }
        } catch (error) {
        }
    };

    // Household Member Operations
    addHouseholdMember = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            
            // Use direct MongoDB update to add member with just _id
            const result = await Application.findByIdAndUpdate(
                id,
                { $push: { householdMember: { _id: new Types.ObjectId(), ...req.body } } },
                { new: true }
            );
            
            if (!result) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
                return;
            }

            // Get the newly added member (last one in the array)
            const newMember = result.householdMember[result.householdMember.length - 1];

            res.status(201).json({
                success: true,
                data: { _id: newMember._id }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error adding household member'
            });
        }
    };

    updateHouseholdMember = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, memberId } = req.params;
            const memberData = req.body;
            // console.log("memberData", memberData.income.earnedIncome[0]);
            const application = await this.applicationService.findById(id);
            if (!application) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
                return;
            }

            const memberIndex = application.householdMember.findIndex(m => m._id?.toString() === memberId);
            if (memberIndex === -1) {
                res.status(404).json({
                    success: false,
                    message: 'Household member not found'
                });
                return;
            }

            // console.log("existing member", application.householdMember[memberIndex])
            // Update the member data
            application.householdMember[memberIndex] = {
                ...application.householdMember[memberIndex],
                ...memberData,
            };
            console.log("merged member", application.householdMember[memberIndex].income.resource[0])

            const updatedApplication = await this.applicationService.update(id, application);

            res.status(200).json({
                success: true,
                data: updatedApplication?.householdMember[memberIndex],
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error updating household member'
            });
        }
    };

    deleteHouseholdMember = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, memberId } = req.params;
            
            const application = await this.applicationService.findById(id);
            if (!application) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
                return;
            }

            const memberIndex = application.householdMember.findIndex(m => m._id?.toString() === memberId);
            if (memberIndex === -1) {
                res.status(404).json({
                    success: false,
                    message: 'Household member not found'
                });
                return;
            }

            // Remove the member from the array
            application.householdMember.splice(memberIndex, 1);
            await this.applicationService.update(id, application);

            res.status(200).json({
                success: true,
                message: 'Household member deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
            });
        }
    };
} 