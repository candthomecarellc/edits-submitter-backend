/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { Express } from 'express';

const takeAndProcessData = async (
  data: any,
  file: Express.Multer.File[],
): Promise<unknown> => {
 try {
    const pdfBytes = fs.readFileSync('./input.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();


    // Set the value of the formTextField
  form.getTextField('applicantName').setText(data.applicantName || '');
  form.getTextField('applicationDate').setText(data.applicationDate || '');
  // TODO: File Uplaod Section Add
  form.getTextField('personalInfo.firstName').setText(data?.['personalInfo.firstName'] || '');
  form.getTextField('personalInfo.middleName').setText(data?.['personalInfo.middleName'] || '');
  form.getTextField('personalInfo.lastName').setText(data?.['personalInfo.lastName'] || '');
  form.getTextField('personalInfo.primaryPhoneNumber').setText(data?.['personalInfo.primaryPhoneNumber'] || '');
  // TODO:Phone Type Add
  form.getTextField('personalInfo.secondaryPhoneNumber').setText(data?.['personalInfo.secondaryPhoneNumber'] || '');
  // TODO:Phone Type Add
  form.getTextField('personalInfo.languageSpeak').setText(data?.['personalInfo.languageSpeak'] || '');
  form.getTextField('personalInfo.languageRead').setText(data?.['personalInfo.languageRead'] || '');
  // TODO: HomeLess Section Add
  form.getTextField('homeAddress.street').setText(data?.['homeAddress.street'] || '');
  form.getTextField('homeAddress.city').setText(data?.['homeAddress.city'] || '');
  form.getTextField('homeAddress.state').setText(data?.['homeAddress.state'] || '');
  form.getTextField('homeAddress.zip').setText(data?.['homeAddress.zip'] || '');
  form.getTextField('homeAddress.county').setText(data?.['homeAddress.county'] || '');
  form.getTextField('homeAddress.apt').setText(data?.['homeAddress.apt'] || '');
  form.getTextField('mailingAddress.street').setText(data?.['mailingAddress.street'] || '');
  form.getTextField('mailingAddress.city').setText(data?.['mailingAddress.city'] || '');
  form.getTextField('mailingAddress.state').setText(data?.['mailingAddress.state'] || '');
  form.getTextField('mailingAddress.zip').setText(data?.['mailingAddress.zip'] || '');
  form.getTextField('mailingAddress.apt').setText(data?.['mailingAddress.apt'] || '');
  form.getTextField('anotherPerson.Name').setText(data?.['anotherPerson.Name'] || '');
  form.getTextField('anotherPerson.phoneNumber').setText(data?.['anotherPerson.phoneHome'] || '');
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
  // form.getTextField('familyInfo.0.relationship').setText(data?.['familyInfo.0.relationship'] || ''); // Self
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

  // houseHold Vetran yes/no checkbox
  form.getTextField('veteranName').setText(data?.veteranName || '');
  // TODO: Have to Add Checkbox of Yes/No Self Employed
  // TODO: Have to Add Checkbox of Yes/No No Earning

  // Earning From Work 1
  form.getTextField('earningFromWork.0.name').setText(data?.['earningFromWork.0.name'] || '');
  form.getTextField('earningFromWork.0.tyoeOfWork').setText(data?.['earningFromWork.0.tyoeOfWork'] || '');
  form.getTextField('earningFromWork.0.howMuchEarned').setText(data?.['earningFromWork.0.howMuchEarned'] || '');
  form.getTextField('earningFromWork.0.howOftenPaid').setText(data?.['earningFromWork.0.howOftenPaid'] || '');
  // Earning From Work 2
  form.getTextField('earningFromWork.1.name').setText(data?.['earningFromWork.1.name'] || '');
  form.getTextField('earningFromWork.1.tyoeOfWork').setText(data?.['earningFromWork.1.tyoeOfWork'] || '');
  form.getTextField('earningFromWork.1.howMuchEarned').setText(data?.['earningFromWork.1.howMuchEarned'] || '');
  form.getTextField('earningFromWork.1.howOftenPaid').setText(data?.['earningFromWork.1.howOftenPaid'] || '');
  // Earning From Work 3
  form.getTextField('earningFromWork.2.name').setText(data?.['earningFromWork.2.name'] || '');
  form.getTextField('earningFromWork.2.tyoeOfWork').setText(data?.['earningFromWork.2.tyoeOfWork'] || '');
  form.getTextField('earningFromWork.2.howMuchEarned').setText(data?.['earningFromWork.2.howMuchEarned'] || '');
  form.getTextField('earningFromWork.2.howOftenPaid').setText(data?.['earningFromWork.2.howOftenPaid'] || '');

  // TODO: Have to Add Checkbox of Yes/No if no unearned income
  //Unearned Income 1
  form.getTextField('unearnedIncome.0.name').setText(data?.['unearnedIncome.0.name'] || '');
  form.getTextField('unearnedIncome.0.tyoeOfWork').setText(data?.['unearnedIncome.0.tyoeOfWork'] || '');
  form.getTextField('unearnedIncome.0.howMuchEarned').setText(data?.['unearnedIncome.0.howMuchEarned'] || '');
  form.getTextField('unearnedIncome.0.howOftenPaid').setText(data?.['unearnedIncome.0.howOftenPaid'] || '');
  //Unearned Income 2
  form.getTextField('unearnedIncome.1.name').setText(data?.['unearnedIncome.1.name'] || '');
  form.getTextField('unearnedIncome.1.tyoeOfWork').setText(data?.['unearnedIncome.1.tyoeOfWork'] || '');
  form.getTextField('unearnedIncome.1.howMuchEarned').setText(data?.['unearnedIncome.1.howMuchEarned'] || '');
  form.getTextField('unearnedIncome.1.howOftenPaid').setText(data?.['unearnedIncome.1.howOftenPaid'] || '');
  //Unearned Income 3
  form.getTextField('unearnedIncome.2.name').setText(data?.['unearnedIncome.2.name'] || '');
  form.getTextField('unearnedIncome.2.tyoeOfWork').setText(data?.['unearnedIncome.2.tyoeOfWork'] || '');
  form.getTextField('unearnedIncome.2.howMuchEarned').setText(data?.['unearnedIncome.2.howMuchEarned'] || '');
  form.getTextField('unearnedIncome.2.howOftenPaid').setText(data?.['unearnedIncome.2.howOftenPaid'] || '');
  
  // TODO: Have to Add Checkbox of Yes/No if no contributions
  //Contributions 1
  form.getTextField('contributions.0.name').setText(data?.['contributions.0.name'] || '');
  form.getTextField('contributions.0.tyoeOfWork').setText(data?.['contributions.0.tyoeOfWork'] || '');
  form.getTextField('contributions.0.howMuchEarned').setText(data?.['contributions.0.howMuchEarned'] || '');
  form.getTextField('contributions.0.howOftenPaid').setText(data?.['contributions.0.howOftenPaid'] || '');
  //Contributions 2
  form.getTextField('contributions.1.name').setText(data?.['contributions.1.name'] || '');
  form.getTextField('contributions.1.tyoeOfWork').setText(data?.['contributions.1.tyoeOfWork'] || '');
  form.getTextField('contributions.1.howMuchEarned').setText(data?.['contributions.1.howMuchEarned'] || '');
  form.getTextField('contributions.1.howOftenPaid').setText(data?.['contributions.1.howOftenPaid'] || '');
  //Contributions 3
  form.getTextField('contributions.2.name').setText(data?.['contributions.2.name'] || '');
  form.getTextField('contributions.2.tyoeOfWork').setText(data?.['contributions.2.tyoeOfWork'] || '');
  form.getTextField('contributions.2.howMuchEarned').setText(data?.['contributions.2.howMuchEarned'] || '');
  form.getTextField('contributions.2.howOftenPaid').setText(data?.['contributions.2.howOftenPaid'] || '');

  // TODO: Have to Add Checkbox of Yes/No if no other income
  //Other Income 1
  form.getTextField('otherIncome.0.name').setText(data?.['otherIncome.0.name'] || '');
  form.getTextField('otherIncome.0.tyoeOfWork').setText(data?.['otherIncome.0.tyoeOfWork'] || '');
  form.getTextField('otherIncome.0.howMuchEarned').setText(data?.['otherIncome.0.howMuchEarned'] || '');
  form.getTextField('otherIncome.0.howOftenPaid').setText(data?.['otherIncome.0.howOftenPaid'] || '');
  //Other Income 2
  form.getTextField('otherIncome.1.name').setText(data?.['otherIncome.1.name'] || '');
  form.getTextField('otherIncome.1.tyoeOfWork').setText(data?.['otherIncome.1.tyoeOfWork'] || '');
  form.getTextField('otherIncome.1.howMuchEarned').setText(data?.['otherIncome.1.howMuchEarned'] || '');
  form.getTextField('otherIncome.1.howOftenPaid').setText(data?.['otherIncome.1.howOftenPaid'] || '');
  //Other Income 3
  form.getTextField('otherIncome.2.name').setText(data?.['otherIncome.2.name'] || '');
  form.getTextField('otherIncome.2.tyoeOfWork').setText(data?.['otherIncome.2.tyoeOfWork'] || '');
  form.getTextField('otherIncome.2.howMuchEarned').setText(data?.['otherIncome.2.howMuchEarned'] || '');
  form.getTextField('otherIncome.2.howOftenPaid').setText(data?.['otherIncome.2.howOftenPaid'] || '');

  form.getTextField('applingAdulthaveNoIncome').setText(data?.applingAdulthaveNoIncome || '');
  form.getTextField('explainHowLiving').setText(data?.explainHowLiving || '');
  // todo: applierChangeJob.changeJobin3Month checkbox 
  form.getTextField('applierChangeJob.lastJobDate.month').setText(data?.['applierChangeJob.lastJobDate.month'] || '');
  form.getTextField('applierChangeJob.lastJobDate.day').setText(data?.['applierChangeJob.lastJobDate.day'] || '');
  form.getTextField('applierChangeJob.lastJobDate.year').setText(data?.['applierChangeJob.lastJobDate.year'] || '');
  form.getTextField('applierChangeJob.nameofEmployer').setText(data?.['applierChangeJob.nameofEmployer'] || '');

  // applierStudent.student checkbox
  // applierStudent.studentType checkbox
  form.getTextField('applierStudent.nameOfStudent').setText(data?.['applierStudent.nameOfStudent'] || '');
  // payForChildCare checkbox

  // payForChildCare 1
  form.getTextField('childCare.0.childName').setText(data?.['childCare.0.childName'] || '');
  form.getTextField('childCare.0.howMuchPaid').setText(data?.['childCare.0.howMuchPaid'] || '');
  form.getTextField('childCare.0.howOftenPaid').setText(data?.['childCare.0.howOftenPaid'] || '');
  // payForChildCare 2
  form.getTextField('childCare.1.childName').setText(data?.['childCare.1.childName'] || '');
  form.getTextField('childCare.1.howMuchPaid').setText(data?.['childCare.1.howMuchPaid'] || '');
  form.getTextField('childCare.1.howOftenPaid').setText(data?.['childCare.1.howOftenPaid'] || '');
  // payForChildCare 3
  form.getTextField('childCare.2.childName').setText(data?.['childCare.2.childName'] || '');
  form.getTextField('childCare.2.howMuchPaid').setText(data?.['childCare.2.howMuchPaid'] || '');
  form.getTextField('childCare.2.howOftenPaid').setText(data?.['childCare.2.howOftenPaid'] || '');

  // familyPlanningServiceOnly checkbox
  // isPayCourtOrdered.payCourtOrdered checkbox
  form.getTextField('isPayCourtOrdered.payCourtOrderedAmount').setText(data?.['isPayCourtOrdered.payCourtOrderedAmount'] || '');
  form.getTextField('isPayCourtOrdered.whoPayCourtOrdered').setText(data?.['isPayCourtOrdered.whoPayCourtOrdered'] || '');

  //applyingHavingMedicare checkbox
  // applyingHavingCommercialInsurance.commercialInsurance
  form.getTextField('applyingHavingCommercialInsurance.nameOfInsured').setText(data?.['applyingHavingCommercialInsurance.nameOfInsured'] || '');
  form.getTextField('applyingHavingCommercialInsurance.personCovered').setText(data?.['applyingHavingCommercialInsurance.personCovered'] || '');
  form.getTextField('applyingHavingCommercialInsurance.costOfPolicy').setText(data?.['applyingHavingCommercialInsurance.costOfPolicy'] || '');
  form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.month').setText(data?.['applyingHavingCommercialInsurance.endOfCoverage.month'] || '');
  form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.day').setText(data?.['applyingHavingCommercialInsurance.endOfCoverage.day'] || '');
  form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.year').setText(data?.['applyingHavingCommercialInsurance.endOfCoverage.year'] || '');
  //currentJobInsurance
  form.getTextField('monthlyHousingPayment').setText(data?.['monthlyHousingPayment'] || '');
  form.getTextField('payForWater.payForWaterAmount').setText(data?.['payForWater.payForWaterAmount'] || '');
  // payForWater.howOftenPaid checkbox
  // freeHousingAsPartofYourPay checkbox
  //nursingHomeCare
  // blindOrDisabledOrChronicallyIll

  //prescriptionBill3Month.prescriptionBill
  form.getTextField('prescriptionBill3Month.name').setText(data?.['prescriptionBill3Month.name'] || '');
  form.getTextField('prescriptionBill3Month.whichMonth').setText(data?.['prescriptionBill3Month.whichMonth'] || '');

  //prescriptionBillOlder
  //moveIntoThisCounty.move 
  form.getTextField('moveIntoThisCounty.who').setText(data?.['moveIntoThisCounty.who'] || '');
  form.getTextField('moveIntoThisCounty.whichState').setText(data?.['moveIntoThisCounty.whichState'] || '');
  form.getTextField('moveIntoThisCounty.whichCounty').setText(data?.['moveIntoThisCounty.whichCounty'] || '');

  //pendingLawSuit.pending
  form.getTextField('pendingLawSuit.who').setText(data?.['pendingLawSuit.who'] || '');
  //workersCompensationCase.workersCompensation
  form.getTextField('workersCompensationCase.who').setText(data?.['workersCompensationCase.who'] || '');
  //deceased.deceased
  form.getTextField('deceased.who').setText(data?.['deceased.who'] || '');

  //parentLiveOutside.parentLiveOutside
  //parentLiveOutside.fearOfHarm
  form.getTextField('parentLiveOutside.childName1').setText(data?.['parentLiveOutside.childName1'] || '');
  form.getTextField('parentLiveOutside.childName2').setText(data?.['parentLiveOutside.childName2'] || '');
  form.getTextField('parentLiveOutside.nameOfParent1').setText(data?.['parentLiveOutside.nameOfParent1'] || '');
  form.getTextField('parentLiveOutside.nameOfParent2').setText(data?.['parentLiveOutside.nameOfParent2'] || '');
  form.getTextField('parentLiveOutside.dateOfBirth1.month').setText(data?.['parentLiveOutside.dateOfBirth1.month'] || '');
  form.getTextField('parentLiveOutside.dateOfBirth1.day').setText(data?.['parentLiveOutside.dateOfBirth1.day'] || '');
  form.getTextField('parentLiveOutside.dateOfBirth1.year').setText(data?.['parentLiveOutside.dateOfBirth1.year'] || '');
  form.getTextField('parentLiveOutside.dateOfBirth2.month').setText(data?.['parentLiveOutside.dateOfBirth2.month'] || '');
  form.getTextField('parentLiveOutside.dateOfBirth2.day').setText(data?.['parentLiveOutside.dateOfBirth2.day'] || '');
  form.getTextField('parentLiveOutside.dateOfBirth2.year').setText(data?.['parentLiveOutside.dateOfBirth2.year'] || '');
  form.getTextField('parentLiveOutside.street1').setText(data?.['parentLiveOutside.street1'] || '');
  form.getTextField('parentLiveOutside.street2').setText(data?.['parentLiveOutside.street2'] || '');
  form.getTextField('parentLiveOutside.city1').setText(data?.['parentLiveOutside.city1'] || '');
  form.getTextField('parentLiveOutside.city2').setText(data?.['parentLiveOutside.city2'] || '');
  form.getTextField('parentLiveOutside.ssn1').setText(data?.['parentLiveOutside.ssn1'] || '');
  form.getTextField('parentLiveOutside.ssn2').setText(data?.['parentLiveOutside.ssn2'] || '');

  //marriedLivesOutside.marriedLivesOutside
  //marriedLivesOutside.fearOfHarm
  form.getTextField('marriedLivesOutside.applyingPerson').setText(data?.['marriedLivesOutside.applyingPerson'] || '');
  form.getTextField('marriedLivesOutside.spouseName').setText(data?.['marriedLivesOutside.spouseName'] || '');
  form.getTextField('marriedLivesOutside.dateOfBirth.month').setText(data?.['marriedLivesOutside.dateOfBirth.month'] || '');
  form.getTextField('marriedLivesOutside.dateOfBirth.day').setText(data?.['marriedLivesOutside.dateOfBirth.day'] || '');
  form.getTextField('marriedLivesOutside.dateOfBirth.year').setText(data?.['marriedLivesOutside.dateOfBirth.year'] || '');
  form.getTextField('marriedLivesOutside.street').setText(data?.['marriedLivesOutside.street'] || '');
  form.getTextField('marriedLivesOutside.city').setText(data?.['marriedLivesOutside.city'] || '');
  form.getTextField('marriedLivesOutside.ssn').setText(data?.['marriedLivesOutside.ssn'] || '');

  // doWanttoJoinHealthPlan checkbox 
  // healthPlan 1
  form.getTextField('healthPlan.0.lastName').setText(data?.['healthPlan.0.lastName'] || '');
  form.getTextField('healthPlan.0.firstName').setText(data?.['healthPlan.0.firstName'] || '');
  form.getTextField('healthPlan.0.dob').setText(data?.['healthPlan.0.dob'] || '');
  form.getTextField('healthPlan.0.ssn').setText(data?.['healthPlan.0.ssn'] || '');
  form.getTextField('healthPlan.0.nameOfHealthPlan').setText(data?.['healthPlan.0.nameOfHealthPlan'] || '');
  form.getTextField('healthPlan.0.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.0.preferred.preferredDoctorOrClinic'] || '');
  // healthPlan.0.preferred.currentProvider checkbox
  form.getTextField('healthPlan.0.obGyn').setText(data?.['healthPlan.0.obGyn'] || '');

  // healthPlan 2
  form.getTextField('healthPlan.1.lastName').setText(data?.['healthPlan.1.lastName'] || '');
  form.getTextField('healthPlan.1.firstName').setText(data?.['healthPlan.1.firstName'] || '');
  form.getTextField('healthPlan.1.dob').setText(data?.['healthPlan.1.dob'] || '');
  form.getTextField('healthPlan.1.ssn').setText(data?.['healthPlan.1.ssn'] || '');
  form.getTextField('healthPlan.1.nameOfHealthPlan').setText(data?.['healthPlan.1.nameOfHealthPlan'] || '');
  form.getTextField('healthPlan.1.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.1.preferred.preferredDoctorOrClinic'] || '');
  // healthPlan.1.preferred.currentProvider checkbox
  form.getTextField('healthPlan.1.obGyn').setText(data?.['healthPlan.1.obGyn'] || '');

  // healthPlan 3
  form.getTextField('healthPlan.2.lastName').setText(data?.['healthPlan.2.lastName'] || '');
  form.getTextField('healthPlan.2.firstName').setText(data?.['healthPlan.2.firstName'] || '');
  form.getTextField('healthPlan.2.dob').setText(data?.['healthPlan.2.dob'] || '');
  form.getTextField('healthPlan.2.ssn').setText(data?.['healthPlan.2.ssn'] || '');
  form.getTextField('healthPlan.2.nameOfHealthPlan').setText(data?.['healthPlan.2.nameOfHealthPlan'] || '');
  form.getTextField('healthPlan.2.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.2.preferred.preferredDoctorOrClinic'] || '');
  // healthPlan.2.preferred.currentProvider checkbox
  form.getTextField('healthPlan.2.obGyn').setText(data?.['healthPlan.2.obGyn'] || '');

  // healthPlan 4
  form.getTextField('healthPlan.3.lastName').setText(data?.['healthPlan.3.lastName'] || '');
  form.getTextField('healthPlan.3.firstName').setText(data?.['healthPlan.3.firstName'] || '');
  form.getTextField('healthPlan.3.dob').setText(data?.['healthPlan.3.dob'] || '');
  form.getTextField('healthPlan.3.ssn').setText(data?.['healthPlan.3.ssn'] || '');
  form.getTextField('healthPlan.3.nameOfHealthPlan').setText(data?.['healthPlan.3.nameOfHealthPlan'] || '');
  form.getTextField('healthPlan.3.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.3.preferred.preferredDoctorOrClinic'] || '');
  // healthPlan.3.preferred.currentProvider checkbox
  form.getTextField('healthPlan.3.obGyn').setText(data?.['healthPlan.3.obGyn'] || '');

  // healthPlan 5
  form.getTextField('healthPlan.4.lastName').setText(data?.['healthPlan.4.lastName'] || '');
  form.getTextField('healthPlan.4.firstName').setText(data?.['healthPlan.4.firstName'] || '');
  form.getTextField('healthPlan.4.dob').setText(data?.['healthPlan.4.dob'] || '');
  form.getTextField('healthPlan.4.ssn').setText(data?.['healthPlan.4.ssn'] || '');
  form.getTextField('healthPlan.4.nameOfHealthPlan').setText(data?.['healthPlan.4.nameOfHealthPlan'] || '');
  form.getTextField('healthPlan.4.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.4.preferred.preferredDoctorOrClinic'] || '');
  // healthPlan.4.preferred.currentProvider checkbox
  form.getTextField('healthPlan.4.obGyn').setText(data?.['healthPlan.4.obGyn'] || '');



  // Save the pdf to the file system
  const filledPdfBytes = await pdfDoc.save();
  const filledPdfBuffer = Buffer.from(filledPdfBytes);
  fs.writeFileSync('./processed_files/filled.pdf', filledPdfBuffer);

  console.log('PDF processing complete!');
  

  } catch (error) {
    console.log(error);
  } 

const values = Object.values(data);
// const headers = Object.keys(data);

// const csvString = headers.join(',') + '\n' + values.join(',');
const csvString = values.join(',');


// Write the string to a .txt file
// fs.writeFile('./processed_files/output.csv', csvString, (err) => {
fs.writeFile('./processed_files/output.txt', csvString, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File saved successfully as output.txt');
  }
});

  return { data, file };
};

export const formServices = {
  takeAndProcessData,
};
