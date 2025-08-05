import { Router } from 'express';
import { ApplicationController } from './application.controller';

const router = Router();
const applicationController = new ApplicationController();

// Get application list
router.get('/list', applicationController.getApplicationList);

// Create a new application
router.post('/', applicationController.create);

// Get all applications
router.get('/', applicationController.findAll);

// Get application by ID
router.get('/:id', applicationController.findById);

// Update application
router.patch('/:id', applicationController.update);

// Delete application
router.delete('/:id', applicationController.delete);

// Submit application
router.post('/:id/submit', applicationController.submit);

// Household Member Routes
router.post('/:id/household-member', applicationController.addHouseholdMember);
router.patch('/:id/household-member/:memberId', applicationController.updateHouseholdMember);
router.delete('/:id/household-member/:memberId', applicationController.deleteHouseholdMember);

export default router; 