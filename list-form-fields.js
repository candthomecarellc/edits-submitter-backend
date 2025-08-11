import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const listFormFields = async () => {
  try {
    const pdfBytes = fs.readFileSync('./fillable_pdf.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    
    console.log('Available form fields:');
    console.log('=====================');
    
    const fields = form.getFields();
    fields.forEach((field, index) => {
      console.log(`${index + 1}. ${field.getName()} (${field.constructor.name})`);
    });
    
    console.log(`\nTotal fields found: ${fields.length}`);
    
    // Check specifically for residence fields
    console.log('\nChecking for residence-related fields:');
    const residenceFields = fields.filter(field => 
      field.getName().toLowerCase().includes('residence') ||
      field.getName().toLowerCase().includes('city') ||
      field.getName().toLowerCase().includes('address')
    );
    
    residenceFields.forEach(field => {
      console.log(`- ${field.getName()}`);
    });
    
  } catch (error) {
    console.error('Error reading PDF:', error);
  }
};

listFormFields();