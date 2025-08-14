import { model } from 'mongoose';
import { DocumentSchema } from './document.schema';

export const Document = model('Document', DocumentSchema);
