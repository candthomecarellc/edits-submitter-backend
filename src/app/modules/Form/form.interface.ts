/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import fs from 'fs/promises';
import { PDFDocument } from 'pdf-lib';
import { Express } from 'express';

type FieldMapping = {
  pdfField: string;
  dataPath: string;
  isCheckbox?: boolean;
};

const setFormField = async (form: any, field: FieldMapping, data: any) => {
  try {
    if (field.isCheckbox) {
      const checkbox = form.getCheckbox(field.pdfField);
      if (checkbox) {
        if (data[field.dataPath]) {
          checkbox.check();
        } else {
          checkbox.uncheck();
        }
      }
    } else {
      const textField = form.getTextField(field.pdfField);
      if (textField) {
        textField.setText(data[field.dataPath] || '');
      }
    }
  } catch (error) {
    console.error('Error setting field:', error);
    console.warn(`Field ${field.pdfField} not found in PDF`);
  }
};

const processSection = (
  baseField: string,
  fields: string[],
  indices: number[]
): FieldMapping[] => indices.flatMap(index => 
  fields.map(field => ({
    pdfField: `${baseField}.${index}.${field}`,
    dataPath: `${baseField}.${index}.${field}`
  }))
);

const processSimpleFields = (fields: string[]): FieldMapping[] => 
  fields.map(field => ({ pdfField: field, dataPath: field }));

const processDateFields = (basePath: string, dateParts: string[]): FieldMapping[] =>
  dateParts.map(part => ({
    pdfField: `${basePath}.${part}`,
    dataPath: `${basePath}.${part}`
  }));

const FIELD_MAPPINGS: FieldMapping[] = [
  // Simple top-level fields
  ...processSimpleFields([
    'applicantName', 'applicationDate', 'veteranName',
    'applingAdulthaveNoIncome', 'explainHowLiving'
  ]),

  // Personal Info
  ...processSimpleFields([
    'personalInfo.firstName', 'personalInfo.middleName', 'personalInfo.lastName',
    'personalInfo.primaryPhoneNumber', 'personalInfo.secondaryPhoneNumber',
    'personalInfo.languageSpeak', 'personalInfo.languageRead'
  ]),

  // Address fields
  ...['homeAddress', 'mailingAddress', 'anotherPerson'].flatMap(prefix => 
    processSimpleFields([
      `${prefix}.street`, `${prefix}.city`, `${prefix}.state`,
      `${prefix}.zip`, `${prefix}.county`, `${prefix}.apt`
    ])
  ),

  // Family Info (up to 5 members)
  ...processSection('familyInfo', [
    'name', 'birthName', 'stateOfBirth', 'cityOfBirth', 'countryOfBirth',
    'genderIdentity', 'ssn', 'race', 'publicHealthCoverage.idNumber',
    'relationship', 'obGyn'
  ], [0, 1, 2, 3, 4]),

  // Date fields for family members
  ...[0, 1, 2, 3, 4].flatMap(index => 
    processDateFields(`familyInfo.${index}.dateOfBirth`, ['month', 'day', 'year'])
  ),

  // Income sections
  ...['earningFromWork', 'unearnedIncome', 'contributions', 'otherIncome'].flatMap(section =>
    processSection(section, ['name', 'tyoeOfWork', 'howMuchEarned', 'howOftenPaid'], [0, 1, 2])
  ),

  // Child Care
  ...processSection('childCare', ['childName', 'howMuchPaid', 'howOftenPaid'], [0, 1, 2]),

  // Health Plans
  ...processSection('healthPlan', [
    'lastName', 'firstName', 'dob', 'ssn', 
    'nameOfHealthPlan', 'preferred.preferredDoctorOrClinic', 'obGyn'
  ], [0, 1, 2, 3, 4]),
];

const processPdfForm = async (data: any, form: any) => {
  for (const mapping of FIELD_MAPPINGS) {
    await setFormField(form, mapping, data);
  }
};

const saveOutputFiles = async (data: any) => {
  const values = Object.values(data);
  await fs.writeFile('./processed_files/output.txt', values.join(','));
};

const takeAndProcessData = async (
  data: any,
  files: Express.Multer.File[],
): Promise<unknown> => {
  try {
    const pdfBytes = await fs.readFile('./input.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    await processPdfForm(data, form);
    
    const filledPdfBytes = await pdfDoc.save();
    await fs.mkdir('./processed_files', { recursive: true });
    await fs.writeFile('./processed_files/filled.pdf', filledPdfBytes);
    await saveOutputFiles(data);

    console.log('PDF processing complete!');
    return { data, files };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
};

export const formServices = {
  takeAndProcessData,
};