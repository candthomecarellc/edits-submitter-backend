import { Router } from 'express';
import { ApplicationController } from './application.controller';

const router = Router();
const applicationController = new ApplicationController();

// Create a new application
router.post('/', applicationController.create);

// Get all applications
router.get('/', applicationController.findAll);

// Get application by ID
router.get('/:id', applicationController.findById);

// Update application
router.put('/:id', applicationController.update);

// Delete application
router.delete('/:id', applicationController.delete);

export default router; 