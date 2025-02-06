/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { Express } from 'express';

const takeAndProcessData = async (
  data: any,
  file: Express.Multer.File[],
): Promise<unknown> => {
  const pdfBytes = fs.readFileSync('./input.pdf');
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  // Set the value of the formTextField
  form.getTextField('applicantName').setText(data?.applicantName || '');
  form.getTextField('applicationDate').setText(data?.applicationDate || '');
  // TODO: File Uplaod Section Add
  form.getTextField('personalInfo.firstName').setText(data?.['personalInfo?.firstName'] || '');
  form.getTextField('personalInfo.middleName').setText(data?.['personalInfo?.middleName'] || '');
  form.getTextField('personalInfo.lastName').setText(data?.['personalInfo?.lastName'] || '');
  form.getTextField('personalInfo.primaryPhoneNumber').setText(data?.['personalInfo?.primaryPhoneNumber'] || '');
  // TODO:Phone Type Add
  form.getTextField('personalInfo.secondaryPhoneNumber').setText(data?.['personalInfo?.secondaryPhoneNumber'] || '');
  // TODO:Phone Type Add
  form.getTextField('personalInfo.languageSpeak').setText(data?.['personalInfo?.languageSpeak'] || '');
  form.getTextField('personalInfo.languageRead').setText(data?.['personalInfo?.languageRead'] || '');
  // TODO: HomeLess Section Add
  form.getTextField('homeAddress.street').setText(data?.['homeAddress?.street'] || '');
  form.getTextField('homeAddress.city').setText(data?.['homeAddress?.city'] || '');
  form.getTextField('homeAddress.state').setText(data?.['homeAddress?.state'] || '');
  form.getTextField('homeAddress.zip').setText(data?.['homeAddress?.zip'] || '');
  form.getTextField('homeAddress.county').setText(data?.['homeAddress?.county'] || '');
  form.getTextField('homeAddress.apt').setText(data?.['homeAddress?.apt'] || '');
  form.getTextField('mailingAddress.street').setText(data?.['mailingAddress.street'] || '');
  form.getTextField('mailingAddress.city').setText(data?.['mailingAddress.city'] || '');
  form.getTextField('mailingAddress.state').setText(data?.['mailingAddress.state'] || '');
  form.getTextField('mailingAddress.zip').setText(data?.['mailingAddress.zip'] || '');
  form.getTextField('mailingAddress.apt').setText(data?.['mailingAddress.apt'] || '');
  form.getTextField('anotherPerson.Name').setText(data?.['anotherPerson.Name'] || '');
  form.getTextField('anotherPerson.phoneNumber').setText(data?.['anotherPerson.phoneNumber'] || '');
  //TODO: Phone Type Add
  form.getTextField('anotherPerson.street').setText(data?.['anotherPerson.street'] || '');
  form.getTextField('anotherPerson.city').setText(data?.['anotherPerson.city'] || '');
  form.getTextField('anotherPerson.state').setText(data?.['anotherPerson.state'] || '');
  form.getTextField('anotherPerson.zip').setText(data?.['anotherPerson.zip'] || '');
  form.getTextField('anotherPerson.apt').setText(data?.['anotherPerson.apt'] || '');
  // TODO: Have to Add Checkbox
  // TODO: Have to Add Blind Checkbox Section
  form.getTextField('familyInfo.0.name').setText(data?.['familyInfo.0.name'] || '');
  form.getTextField('familyInfo.0.birthName').setText(data?.['familyInfo.0.birthName'] || '');
  form.getTextField('familyInfo.0.stateOfBirth').setText(data?.['familyInfo.0.stateOfBirth'] || '');
  form.getTextField('familyInfo.0.cityOfBirth').setText(data?.['familyInfo.0.cityOfBirth'] || '');
  form.getTextField('familyInfo.0.countryOfBirth').setText(data?.['familyInfo.0.countryOfBirth'] || '');
  form.getTextField('familyInfo.0.dateOfBirth.month').setText(data?.['familyInfo.0.dateOfBirth.month'] || '');
  form.getTextField('familyInfo.0.dateOfBirth.day').setText(data?.['familyInfo.0.dateOfBirth.day'] || '');
  form.getTextField('familyInfo.0.dateOfBirth.year').setText(data?.['familyInfo.0.dateOfBirth.year'] || '');
  // TODO: Have to Add Checkbox of Male/Female
  form.getTextField('familyInfo.0.genderIdentity').setText(data?.['familyInfo.0.genderIdentity'] || '');
  // TODO: is this person is applying for healthcare
  // TODO: Have to Add Checkbox of Yes/No Pregnant
  form.getTextField('familyInfo.0.pregnantDueDate.month').setText(data?.['familyInfo.0.pregnantDueDate.month'] || '');
  form.getTextField('familyInfo.0.pregnantDueDate.day').setText(data?.['familyInfo.0.pregnantDueDate.day'] || '');
  form.getTextField('familyInfo.0.pregnantDueDate.year').setText(data?.['familyInfo.0.pregnantDueDate.year'] || '');
  // TODO: Have to Add Checkbox of Yes/No Parent applying for child
  form.getTextField('familyInfo.0.relationship').setText(data?.['familyInfo.0.relationship'] || '');
  // TODO: Have to Add Checkbox of Yes/No Public Health Coverage
  form.getTextField('familyInfo.0.publicHealthCoverage.idNumber').setText(data?.['familyInfo.0.publicHealthCoverage.idNumber'] || '');
  form.getTextField('familyInfo.0.ssn').setText(data?.['familyInfo.0.ssn'] || '');
  // TODO: Have to Add Checkbox of Yes/No US Citizen
  form.getTextField('familyInfo.0.usCitizenship.receivedImmigrationStatusDate.month').setText(data?.['familyInfo.0.usCitizenship.receivedImmigrationStatusDate.month'] || '');
  form.getTextField('familyInfo.0.usCitizenship.receivedImmigrationStatusDate.day').setText(data?.['familyInfo.0.usCitizenship.receivedImmigrationStatusDate.day'] || '');
  form.getTextField('familyInfo.0.usCitizenship.receivedImmigrationStatusDate.year').setText(data?.['familyInfo.0.usCitizenship.receivedImmigrationStatusDate.year'] || '');
  form.getTextField('familyInfo.0.race').setText(data?.['familyInfo.0.race'] || '');
  // TODO: Have to Add Checkbox of Yes/No receivedAServiceFromIHS
  
  // 2nd Member
  form.getTextField('familyInfo.1.name').setText(data?.['familyInfo.1.name'] || '');
  form.getTextField('familyInfo.1.birthName').setText(data?.['familyInfo.1.birthName'] || '');
  form.getTextField('familyInfo.1.stateOfBirth').setText(data?.['familyInfo.1.stateOfBirth'] || '');
  form.getTextField('familyInfo.1.cityOfBirth').setText(data?.['familyInfo.1.cityOfBirth'] || '');
  form.getTextField('familyInfo.1.countryOfBirth').setText(data?.['familyInfo.1.countryOfBirth'] || '');
  form.getTextField('familyInfo.1.dateOfBirth.month').setText(data?.['familyInfo.1.dateOfBirth.month'] || '');
  form.getTextField('familyInfo.1.dateOfBirth.day').setText(data?.['familyInfo.1.dateOfBirth.day'] || '');
  form.getTextField('familyInfo.1.dateOfBirth.year').setText(data?.['familyInfo.1.dateOfBirth.year'] || '');
  // TODO: Have to Add Checkbox of Male/Female
  form.getTextField('familyInfo.1.genderIdentity').setText(data?.['familyInfo.1.genderIdentity'] || '');
  // TODO: is this person is applying for healthcare
  // TODO: Have to Add Checkbox of Yes/No Pregnant
  form.getTextField('familyInfo.1.pregnantDueDate.month').setText(data?.['familyInfo.1.pregnantDueDate.month'] || '');
  form.getTextField('familyInfo.1.pregnantDueDate.day').setText(data?.['familyInfo.1.pregnantDueDate.day'] || '');
  form.getTextField('familyInfo.1.pregnantDueDate.year').setText(data?.['familyInfo.1.pregnantDueDate.year'] || '');
  // TODO: Have to Add Checkbox of Yes/No Parent applying for child
  form.getTextField('familyInfo.1.relationship').setText(data?.['familyInfo.1.relationship'] || '');
  // TODO: Have to Add Checkbox of Yes/No Public Health Coverage
  form.getTextField('familyInfo.1.publicHealthCoverage.idNumber').setText(data?.['familyInfo.1.publicHealthCoverage.idNumber'] || '');
  form.getTextField('familyInfo.1.ssn').setText(data?.['familyInfo.1.ssn'] || '');
  // TODO: Have to Add Checkbox of Yes/No US Citizen
  form.getTextField('familyInfo.1.usCitizenship.receivedImmigrationStatusDate.month').setText(data?.['familyInfo.1.usCitizenship.receivedImmigrationStatusDate.month'] || '');
  form.getTextField('familyInfo.1.usCitizenship.receivedImmigrationStatusDate.day').setText(data?.['familyInfo.1.usCitizenship.receivedImmigrationStatusDate.day'] || '');
  form.getTextField('familyInfo.1.usCitizenship.receivedImmigrationStatusDate.year').setText(data?.['familyInfo.1.usCitizenship.receivedImmigrationStatusDate.year'] || '');
  form.getTextField('familyInfo.1.race').setText(data?.['familyInfo.1.race'] || '');
  // TODO: Have to Add Checkbox of Yes/No receivedAServiceFromIHS

  // 3nd Member
  form.getTextField('familyInfo.2.name').setText(data?.['familyInfo.2.name'] || '');
  form.getTextField('familyInfo.2.birthName').setText(data?.['familyInfo.2.birthName'] || '');
  form.getTextField('familyInfo.2.stateOfBirth').setText(data?.['familyInfo.2.stateOfBirth'] || '');
  form.getTextField('familyInfo.2.cityOfBirth').setText(data?.['familyInfo.2.cityOfBirth'] || '');
  form.getTextField('familyInfo.2.countryOfBirth').setText(data?.['familyInfo.2.countryOfBirth'] || '');
  form.getTextField('familyInfo.2.dateOfBirth.month').setText(data?.['familyInfo.2.dateOfBirth.month'] || '');
  form.getTextField('familyInfo.2.dateOfBirth.day').setText(data?.['familyInfo.2.dateOfBirth.day'] || '');
  form.getTextField('familyInfo.2.dateOfBirth.year').setText(data?.['familyInfo.2.dateOfBirth.year'] || '');
  // TODO: Have to Add Checkbox of Male/Female
  form.getTextField('familyInfo.2.genderIdentity').setText(data?.['familyInfo.2.genderIdentity'] || '');
  // TODO: is this person is applying for healthcare
  // TODO: Have to Add Checkbox of Yes/No Pregnant
  form.getTextField('familyInfo.2.pregnantDueDate.month').setText(data?.['familyInfo.2.pregnantDueDate.month'] || '');
  form.getTextField('familyInfo.2.pregnantDueDate.day').setText(data?.['familyInfo.2.pregnantDueDate.day'] || '');
  form.getTextField('familyInfo.2.pregnantDueDate.year').setText(data?.['familyInfo.2.pregnantDueDate.year'] || '');
  // TODO: Have to Add Checkbox of Yes/No Parent applying for child
  form.getTextField('familyInfo.2.relationship').setText(data?.['familyInfo.2.relationship'] || '');
  // TODO: Have to Add Checkbox of Yes/No Public Health Coverage
  form.getTextField('familyInfo.2.publicHealthCoverage.idNumber').setText(data?.['familyInfo.2.publicHealthCoverage.idNumber'] || '');
  form.getTextField('familyInfo.2.ssn').setText(data?.['familyInfo.2.ssn'] || '');
  // TODO: Have to Add Checkbox of Yes/No US Citizen
  form.getTextField('familyInfo.2.usCitizenship.receivedImmigrationStatusDate.month').setText(data?.['familyInfo.2.usCitizenship.receivedImmigrationStatusDate.month'] || '');
  form.getTextField('familyInfo.2.usCitizenship.receivedImmigrationStatusDate.day').setText(data?.['familyInfo.2.usCitizenship.receivedImmigrationStatusDate.day'] || '');
  form.getTextField('familyInfo.2.usCitizenship.receivedImmigrationStatusDate.year').setText(data?.['familyInfo.2.usCitizenship.receivedImmigrationStatusDate.year'] || '');
  form.getTextField('familyInfo.2.race').setText(data?.['familyInfo.2.race'] || '');
  // TODO: Have to Add Checkbox of Yes/No receivedAServiceFromIHS

  // 4rd Member
  form.getTextField('familyInfo.3.name').setText(data?.['familyInfo.3.name'] || '');
  form.getTextField('familyInfo.3.birthName').setText(data?.['familyInfo.3.birthName'] || '');
  form.getTextField('familyInfo.3.stateOfBirth').setText(data?.['familyInfo.3.stateOfBirth'] || '');
  form.getTextField('familyInfo.3.cityOfBirth').setText(data?.['familyInfo.3.cityOfBirth'] || '');
  form.getTextField('familyInfo.3.countryOfBirth').setText(data?.['familyInfo.3.countryOfBirth'] || '');
  form.getTextField('familyInfo.3.dateOfBirth.month').setText(data?.['familyInfo.3.dateOfBirth.month'] || '');
  form.getTextField('familyInfo.3.dateOfBirth.day').setText(data?.['familyInfo.3.dateOfBirth.day'] || '');
  form.getTextField('familyInfo.3.dateOfBirth.year').setText(data?.['familyInfo.3.dateOfBirth.year'] || '');
  // TODO: Have to Add Checkbox of Male/Female
  form.getTextField('familyInfo.3.genderIdentity').setText(data?.['familyInfo.3.genderIdentity'] || '');
  // TODO: is this person is applying for healthcare
  // TODO: Have to Add Checkbox of Yes/No Pregnant
  form.getTextField('familyInfo.3.pregnantDueDate.month').setText(data?.['familyInfo.3.pregnantDueDate.month'] || '');
  form.getTextField('familyInfo.3.pregnantDueDate.day').setText(data?.['familyInfo.3.pregnantDueDate.day'] || '');
  form.getTextField('familyInfo.3.pregnantDueDate.year').setText(data?.['familyInfo.3.pregnantDueDate.year'] || '');
  // TODO: Have to Add Checkbox of Yes/No Parent applying for child
  form.getTextField('familyInfo.3.relationship').setText(data?.['familyInfo.3.relationship'] || '');
  // TODO: Have to Add Checkbox of Yes/No Public Health Coverage
  form.getTextField('familyInfo.3.publicHealthCoverage.idNumber').setText(data?.['familyInfo.3.publicHealthCoverage.idNumber'] || '');
  form.getTextField('familyInfo.3.ssn').setText(data?.['familyInfo.3.ssn'] || '');
  // TODO: Have to Add Checkbox of Yes/No US Citizen
  form.getTextField('familyInfo.3.usCitizenship.receivedImmigrationStatusDate.month').setText(data?.['familyInfo.3.usCitizenship.receivedImmigrationStatusDate.month'] || '');
  form.getTextField('familyInfo.3.usCitizenship.receivedImmigrationStatusDate.day').setText(data?.['familyInfo.3.usCitizenship.receivedImmigrationStatusDate.day'] || '');
  form.getTextField('familyInfo.3.usCitizenship.receivedImmigrationStatusDate.year').setText(data?.['familyInfo.3.usCitizenship.receivedImmigrationStatusDate.year'] || '');
  form.getTextField('familyInfo.3.race').setText(data?.['familyInfo.3.race'] || '');
  // TODO: Have to Add Checkbox of Yes/No receivedAServiceFromIHS

  // 5th Member
  form.getTextField('familyInfo.4.name').setText(data?.['familyInfo.4.name'] || '');
  form.getTextField('familyInfo.4.birthName').setText(data?.['familyInfo.4.birthName'] || '');
  form.getTextField('familyInfo.4.stateOfBirth').setText(data?.['familyInfo.4.stateOfBirth'] || '');
  form.getTextField('familyInfo.4.cityOfBirth').setText(data?.['familyInfo.4.cityOfBirth'] || '');
  form.getTextField('familyInfo.4.countryOfBirth').setText(data?.['familyInfo.4.countryOfBirth'] || '');
  form.getTextField('familyInfo.4.dateOfBirth.month').setText(data?.['familyInfo.4.dateOfBirth.month'] || '');
  form.getTextField('familyInfo.4.dateOfBirth.day').setText(data?.['familyInfo.4.dateOfBirth.day'] || '');
  form.getTextField('familyInfo.4.dateOfBirth.year').setText(data?.['familyInfo.4.dateOfBirth.year'] || '');
  // TODO: Have to Add Checkbox of Male/Female
  form.getTextField('familyInfo.4.genderIdentity').setText(data?.['familyInfo.4.genderIdentity'] || '');
  // TODO: is this person is applying for healthcare
  // TODO: Have to Add Checkbox of Yes/No Pregnant
  form.getTextField('familyInfo.4.pregnantDueDate.month').setText(data?.['familyInfo.4.pregnantDueDate.month'] || '');
  form.getTextField('familyInfo.4.pregnantDueDate.day').setText(data?.['familyInfo.4.pregnantDueDate.day'] || '');
  form.getTextField('familyInfo.4.pregnantDueDate.year').setText(data?.['familyInfo.4.pregnantDueDate.year'] || '');
  // TODO: Have to Add Checkbox of Yes/No Parent applying for child
  form.getTextField('familyInfo.4.relationship').setText(data?.['familyInfo.4.relationship'] || '');
  // TODO: Have to Add Checkbox of Yes/No Public Health Coverage
  form.getTextField('familyInfo.4.publicHealthCoverage.idNumber').setText(data?.['familyInfo.4.publicHealthCoverage.idNumber'] || '');
  form.getTextField('familyInfo.4.ssn').setText(data?.['familyInfo.4.ssn'] || '');
  // TODO: Have to Add Checkbox of Yes/No US Citizen
  form.getTextField('familyInfo.4.usCitizenship.receivedImmigrationStatusDate.month').setText(data?.['familyInfo.4.usCitizenship.receivedImmigrationStatusDate.month'] || '');
  form.getTextField('familyInfo.4.usCitizenship.receivedImmigrationStatusDate.day').setText(data?.['familyInfo.4.usCitizenship.receivedImmigrationStatusDate.day'] || '');
  form.getTextField('familyInfo.4.usCitizenship.receivedImmigrationStatusDate.year').setText(data?.['familyInfo.4.usCitizenship.receivedImmigrationStatusDate.year'] || '');
  form.getTextField('familyInfo.4.race').setText(data?.['familyInfo.4.race'] || '');
  // TODO: Have to Add Checkbox of Yes/No receivedAServiceFromIHS


  return { data, file };
};

export const formServices = {
  takeAndProcessData,
};
