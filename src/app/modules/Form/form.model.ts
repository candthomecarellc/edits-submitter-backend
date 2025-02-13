/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Express } from 'express'; 
import { PDFDocument } from 'pdf-lib';
import CustomError from '../../errors/CusromError';

// Helper function to handle nested data paths
const getValue = (data: any, path: string) => data?.[path] || '';

const takeAndProcessData = async (
  data: any,
  file: Express.Multer.File[],
): Promise<unknown> => {
  const pdfBytes = fs.readFileSync('./input.pdf');
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  
  try {
    // Dynamic checkboxes (field name is the checkbox name)
    const dynamicCheckboxes = [
      'uscitizenshiporDOB', 'usCitizenship', 'identityDocument', 'identityDocumentExtra',
      'ImmigrationstatesIdentity', 'ImmigrationStatus', 'dobIdentity', 'homeAddressDocument',
      'wagesAndSalary', 'selfEmployment', 'unemploymentBenefits', 'privatePensionsAnnuities',
      'socialSecurity', 'workersCompensation', 'childSupportAlimony', 'veteransBenefits',
      'militaryPay', 'incomeFromRent', 'interestDividendsRoyalties', 'careForChildrenorAdults',
      'proofOfstudentStatus'
    ];
    dynamicCheckboxes.forEach(field => {
      if (data[field]) form.getCheckBox(data[field]).check();
    });

    // Fixed checkboxes (field name matches PDF checkbox name)
    const fixedCheckboxes = [
      'homeLess', 'anotherPerson.permissions.ApplyMedicaidForMe',
      'anotherPerson.permissions.disussMyCase', 'anotherPerson.permissions.getNoticesAndCorrespondence',
      'doWanttoJoinHealthPlan'
    ];
    fixedCheckboxes.forEach(field => {
      if (data[field]) form.getCheckBox(field).check();
    });

    // Radio groups configuration
    const radioGroups = [
      { dataField: 'personalInfo.primaryPhoneType', radioGroup: 'Primary Phone Type' },
      { dataField: 'personalInfo.secondaryPhoneType', radioGroup: 'Another Phone Type' },
      { dataField: 'anotherPerson.phoneType', radioGroup: 'Phone type' },
      { dataField: 'blindNoticeType', radioGroup: 'If you are blind or visually impaired and require information in an alternative format, check the type of mail you want to receive from us. Please return this form with your application' },
      { dataField: 'householdVeteran', radioGroup: 'householdVeteran' },
      { dataField: 'selfEmploymentInfo', radioGroup: 'selfEmploymentInfo' },
      { dataField: 'noEarningsFromWork', radioGroup: 'noEarningsFromWork' },
      { dataField: 'applierChangeJob.changeJobin3Month', radioGroup: 'applierChangeJob.changeJobin3Month' },
      { dataField: 'applierStudent.student', radioGroup: 'applierStudent.student' },
      { dataField: 'applierStudent.studentType', radioGroup: 'applierStudent.studentType' },
      { dataField: 'payForChildCare', radioGroup: 'payForChildCare' },
      { dataField: 'familyPlanningServiceOnly', radioGroup: 'familyPlanningServiceOnly' },
      { dataField: 'isPayCourtOrdered.payCourtOrdered', radioGroup: 'isPayCourtOrdered.payCourtOrdered' },
      { dataField: 'applyingHavingMedicare', radioGroup: 'applyingHavingMedicare' },
      { dataField: 'currentJobInsurance', radioGroup: 'currentJobInsurance' },
      { dataField: 'payForWater.howOftenPaid', radioGroup: 'payForWater.howOftenPaid' },
      { dataField: 'freeHousingAsPartofYourPay', radioGroup: 'freeHousingAsPartofYourPay' },
      { dataField: 'nursingHomeCare', radioGroup: 'nursingHomeCare' },
      { dataField: 'blindOrDisabledOrChronicallyIll', radioGroup: 'blindOrDisabledOrChronicallyIll' },
      { dataField: 'prescriptionBill3Month.prescriptionBill', radioGroup: 'prescriptionBill3Month.prescriptionBill' },
      { dataField: 'prescriptionBillOlder', radioGroup: 'prescriptionBillOlder' },
      { dataField: 'moveIntoThisCounty.move', radioGroup: 'moveIntoThisCounty.move' },
      { dataField: 'pendingLawSuit.pending', radioGroup: 'pendingLawSuit.pending' },
      { dataField: 'workersCompensationCase.workersCompensation', radioGroup: 'workersCompensationCase.workersCompensation' },
      { dataField: 'deceased.deceased', radioGroup: 'deceased.deceased' },
      { dataField: 'parentLiveOutside.parentLiveOutside', radioGroup: 'parentLiveOutside.parentLiveOutside' },
      { dataField: 'marriedLivesOutside.marriedLivesOutside', radioGroup: 'marriedLivesOutside.marriedLivesOutside' },
    ];

    // Add family member radio groups (0-4)
    for (let i = 0; i < 5; i++) {
      const fields = [
        { dataField: `familyInfo.${i}.sex`, radioGroup: `familyInfo.${i}.sex` },
        { dataField: `familyInfo.${i}.isApplying`, radioGroup: `familyInfo.${i}.isApplying` },
        { dataField: `familyInfo.${i}.isPregnant`, radioGroup: `familyInfo.${i}.isPregnant` },
        { dataField: `familyInfo.${i}.isParent`, radioGroup: `familyInfo.${i}.isParent` },
        { dataField: `familyInfo.${i}.publicHealthCoverage`, radioGroup: `familyInfo.${i}.publicHealthCoverage` },
        { dataField: `familyInfo.${i}.usCitizenship`, radioGroup: `familyInfo.${i}.usCitizenship` },
        { dataField: `familyInfo.${i}.receivedAServiceFromIHS`, radioGroup: `familyInfo.${i}.receivedAServiceFromIHS` },
      ];
      radioGroups.push(...fields);
    }

    radioGroups.forEach(({ dataField, radioGroup }) => {
      const value = getValue(data, dataField);
      if (value) form.getRadioGroup(radioGroup).select(value);
    });

    // Text fields configuration
    const textFields = [
      'applicantName', 'applicationDate',
      'personalInfo.firstName', 'personalInfo.middleName', 'personalInfo.lastName',
      'personalInfo.primaryPhoneNumber', 'personalInfo.secondaryPhoneNumber',
      'personalInfo.languageSpeak', 'personalInfo.languageRead',
      'homeAddress.street', 'homeAddress.city', 'homeAddress.state', 'homeAddress.zip', 'homeAddress.county', 'homeAddress.apt',
      'mailingAddress.street', 'mailingAddress.city', 'mailingAddress.state', 'mailingAddress.zip', 'mailingAddress.apt',
      'anotherPerson.Name', 'anotherPerson.phoneHome', 'anotherPerson.street', 'anotherPerson.city', 'anotherPerson.state', 'anotherPerson.zip', 'anotherPerson.apt',
      'veteranName',
      'applingAdulthaveNoIncome', 'explainHowLiving',
      'applierChangeJob.lastJobDate.month', 'applierChangeJob.lastJobDate.day', 'applierChangeJob.lastJobDate.year', 'applierChangeJob.nameofEmployer',
      'applierStudent.nameOfStudent',
      'isPayCourtOrdered.payCourtOrderedAmount', 'isPayCourtOrdered.whoPayCourtOrdered',
      'applyingHavingCommercialInsurance.nameOfInsured', 'applyingHavingCommercialInsurance.personCovered', 'applyingHavingCommercialInsurance.costOfPolicy',
      'applyingHavingCommercialInsurance.endOfCoverage.month', 'applyingHavingCommercialInsurance.endOfCoverage.day', 'applyingHavingCommercialInsurance.endOfCoverage.year',
      'monthlyHousingPayment', 'payForWater.payForWaterAmount',
      'prescriptionBill3Month.name', 'prescriptionBill3Month.whichMonth',
      'moveIntoThisCounty.who', 'moveIntoThisCounty.whichState', 'moveIntoThisCounty.whichCounty',
      'pendingLawSuit.who', 'workersCompensationCase.who', 'deceased.who',
      'parentLiveOutside.childName1', 'parentLiveOutside.childName2', 'parentLiveOutside.nameOfParent1', 'parentLiveOutside.nameOfParent2',
      'parentLiveOutside.dateOfBirth1.month', 'parentLiveOutside.dateOfBirth1.day', 'parentLiveOutside.dateOfBirth1.year',
      'parentLiveOutside.dateOfBirth2.month', 'parentLiveOutside.dateOfBirth2.day', 'parentLiveOutside.dateOfBirth2.year',
      'parentLiveOutside.street1', 'parentLiveOutside.street2', 'parentLiveOutside.city1', 'parentLiveOutside.city2',
      'parentLiveOutside.ssn1', 'parentLiveOutside.ssn2',
      'marriedLivesOutside.applyingPerson', 'marriedLivesOutside.spouseName',
      'marriedLivesOutside.dateOfBirth.month', 'marriedLivesOutside.dateOfBirth.day', 'marriedLivesOutside.dateOfBirth.year',
      'marriedLivesOutside.street', 'marriedLivesOutside.city', 'marriedLivesOutside.ssn',
    ];

    // Add family member text fields (0-4)
    for (let i = 0; i < 5; i++) {
      const fields = [
        `familyInfo.${i}.name`, `familyInfo.${i}.birthName`, `familyInfo.${i}.stateOfBirth`, `familyInfo.${i}.cityOfBirth`,
        `familyInfo.${i}.countryOfBirth`, `familyInfo.${i}.dateOfBirth.month`, `familyInfo.${i}.dateOfBirth.day`,
        `familyInfo.${i}.dateOfBirth.year`, `familyInfo.${i}.genderIdentity`, `familyInfo.${i}.pregnantDueDate.month`,
        `familyInfo.${i}.pregnantDueDate.day`, `familyInfo.${i}.pregnantDueDate.year`, `familyInfo.${i}.relationship`,
        `familyInfo.${i}.publicHealthCoverageidNumber`, `familyInfo.${i}.ssn`,
        `familyInfo.${i}.usCitizenshipReceivedImmigrationStatusDate.month`, `familyInfo.${i}.usCitizenshipReceivedImmigrationStatusDate.day`,
        `familyInfo.${i}.usCitizenshipReceivedImmigrationStatusDate.year`, `familyInfo.${i}.race`,
      ];
      textFields.push(...fields);
    }

    // Add health plan text fields (0-4)
    for (let i = 0; i < 5; i++) {
      const fields = [
        `healthPlan.${i}.lastName`, `healthPlan.${i}.firstName`, `healthPlan.${i}.dob`, `healthPlan.${i}.ssn`,
        `healthPlan.${i}.nameOfHealthPlan`, `healthPlan.${i}.preferred.preferredDoctorOrClinic`, `healthPlan.${i}.obGyn`
      ];
      textFields.push(...fields);
    }

    textFields.forEach(pdfField => {
      const value = getValue(data, pdfField);
      form.getTextField(pdfField).setText(value);
    });

    // Save the PDF
    const filledPdfBytes = await pdfDoc.save();
    const filledPdfBuffer = Buffer.from(filledPdfBytes);
    fs.writeFileSync('./processed_files/filled.pdf', filledPdfBuffer);
    console.log('PDF processing complete!');
  } catch (error) {
    console.log(error);
    throw new CustomError(String(error), 400);
  }

  // Write CSV
  const values = Object.values(data);
  const csvString = values.join(',');
  fs.writeFile('./processed_files/output.txt', csvString, (err) => {
    if (err) throw new CustomError(String(err), 400);
    console.log('File saved successfully as output.txt');
  });

  return { data, file };
};

export const formServices = {
  takeAndProcessData,
};