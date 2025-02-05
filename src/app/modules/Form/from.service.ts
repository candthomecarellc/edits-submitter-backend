import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const takeAndProcessData = async (
  data: any,
  file: any,
): Promise<unknown> => {
  const pdfBytes = fs.readFileSync('./input.pdf');
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Get the form in the PDF
  const form = pdfDoc.getForm();

  // Get all fields in the form
  const fields = form.getFields();
//   console.log(fields);
  

  // Print the name of each field
  fields.forEach((field) => {
    console.log(field);
  });

  return { data, file };
};

export const formServices = {
  takeAndProcessData,
};
