import { model } from 'mongoose';
import { ApplicationSchema } from './application.schema';

export const Application = model('Application', ApplicationSchema);
