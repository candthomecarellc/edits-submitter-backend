/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { Express } from 'express';

const takeAndProcessData = async (data: any, file: Express.Multer.File[]): Promise<unknown> => {
  try {
    const pdfBytes = fs.readFileSync('./input.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    // Section A: Applicant's Information
    form.getTextField('applicantName').setText(data.applicantName || '');
    form.getTextField('applicationDate').setText(data.applicationDate || '');

    // Personal Information
    form.getTextField('personalInfo.firstName').setText(data.personalInfo.firstName || '');
    form.getTextField('personalInfo.middleName').setText(data.personalInfo.middleName || '');
    form.getTextField('personalInfo.lastName').setText(data.personalInfo.lastName || '');
    form.getTextField('personalInfo.primaryPhoneNumber').setText(data.personalInfo.primaryPhoneNumber || '');
    form.getTextField('personalInfo.secondaryPhoneNumber').setText(data.personalInfo.secondaryPhoneNumber || '');
    form.getTextField('personalInfo.languageSpeak').setText(data.personalInfo.languageSpeak || '');
    form.getTextField('personalInfo.languageRead').setText(data.personalInfo.languageRead || '');

    // Home Address
    form.getTextField('homeAddress.street').setText(data.homeAddress.street || '');
    form.getTextField('homeAddress.city').setText(data.homeAddress.city || '');
    form.getTextField('homeAddress.state').setText(data.homeAddress.state || '');
    form.getTextField('homeAddress.zip').setText(data.homeAddress.zip || '');
    form.getTextField('homeAddress.county').setText(data.homeAddress.county || '');
    form.getTextField('homeAddress.apt').setText(data.homeAddress.apt || '');

    // Mailing Address
    form.getTextField('mailingAddress.street').setText(data.mailingAddress.street || '');
    form.getTextField('mailingAddress.city').setText(data.mailingAddress.city || '');
    form.getTextField('mailingAddress.state').setText(data.mailingAddress.state || '');
    form.getTextField('mailingAddress.zip').setText(data.mailingAddress.zip || '');
    form.getTextField('mailingAddress.apt').setText(data.mailingAddress.apt || '');

    // Another Person
    form.getTextField('anotherPerson.name').setText(data.anotherPerson.name || '');
    form.getTextField('anotherPerson.phoneNumber').setText(data.anotherPerson.phoneNumber || '');
    form.getTextField('anotherPerson.street').setText(data.anotherPerson.street || '');
    form.getTextField('anotherPerson.city').setText(data.anotherPerson.city || '');
    form.getTextField('anotherPerson.state').setText(data.anotherPerson.state || '');
    form.getTextField('anotherPerson.zip').setText(data.anotherPerson.zip || '');
    form.getTextField('anotherPerson.apt').setText(data.anotherPerson.apt || '');

    // Family Information
    data.familyInfo.forEach((member: { name: any; birthName: any; cityOfBirth: any; stateOfBirth: any; countryOfBirth: any; dateOfBirth: { month: any; day: any; year: any; }; genderIdentity: any; pregnantDueDate: { month: any; day: any; year: any; }; relationship: any; publicHealthCoverage: { idNumber: any; }; ssn: any; usCitizenship: { receivedImmigrationStatusDate: { month: any; day: any; year: any; }; }; race: any; }, index: any) => {
      form.getTextField(`familyInfo.${index}.name`).setText(member.name || '');
      form.getTextField(`familyInfo.${index}.birthName`).setText(member.birthName || '');
      form.getTextField(`familyInfo.${index}.cityOfBirth`).setText(member.cityOfBirth || '');
      form.getTextField(`familyInfo.${index}.stateOfBirth`).setText(member.stateOfBirth || '');
      form.getTextField(`familyInfo.${index}.countryOfBirth`).setText(member.countryOfBirth || '');
      form.getTextField(`familyInfo.${index}.dateOfBirth.month`).setText(member.dateOfBirth.month || '');
      form.getTextField(`familyInfo.${index}.dateOfBirth.day`).setText(member.dateOfBirth.day || '');
      form.getTextField(`familyInfo.${index}.dateOfBirth.year`).setText(member.dateOfBirth.year || '');
      form.getTextField(`familyInfo.${index}.genderIdentity`).setText(member.genderIdentity || '');
      form.getTextField(`familyInfo.${index}.pregnantDueDate.month`).setText(member.pregnantDueDate.month || '');
      form.getTextField(`familyInfo.${index}.pregnantDueDate.day`).setText(member.pregnantDueDate.day || '');
      form.getTextField(`familyInfo.${index}.pregnantDueDate.year`).setText(member.pregnantDueDate.year || '');
      form.getTextField(`familyInfo.${index}.relationship`).setText(member.relationship || '');
      form.getTextField(`familyInfo.${index}.publicHealthCoverage.idNumber`).setText(member.publicHealthCoverage.idNumber || '');
      form.getTextField(`familyInfo.${index}.ssn`).setText(member.ssn || '');
      form.getTextField(`familyInfo.${index}.usCitizenship.receivedImmigrationStatusDate.month`).setText(member.usCitizenship.receivedImmigrationStatusDate.month || '');
      form.getTextField(`familyInfo.${index}.usCitizenship.receivedImmigrationStatusDate.day`).setText(member.usCitizenship.receivedImmigrationStatusDate.day || '');
      form.getTextField(`familyInfo.${index}.usCitizenship.receivedImmigrationStatusDate.year`).setText(member.usCitizenship.receivedImmigrationStatusDate.year || '');
      form.getTextField(`familyInfo.${index}.race`).setText(member.race || '');
    });

    // Section C: Family Income
    data.earningFromWork.forEach((income: { name: any; typeOfWork: any; howMuchEarned: any; howOftenPaid: any; }, index: any) => {
      form.getTextField(`earningFromWork.${index}.name`).setText(income.name || '');
      form.getTextField(`earningFromWork.${index}.typeOfWork`).setText(income.typeOfWork || '');
      form.getTextField(`earningFromWork.${index}.howMuchEarned`).setText(income.howMuchEarned || '');
      form.getTextField(`earningFromWork.${index}.howOftenPaid`).setText(income.howOftenPaid || '');
    });

    data.unearnedIncome.forEach((income: { name: any; typeOfIncome: any; howMuchEarned: any; howOftenPaid: any; }, index: any) => {
      form.getTextField(`unearnedIncome.${index}.name`).setText(income.name || '');
      form.getTextField(`unearnedIncome.${index}.typeOfIncome`).setText(income.typeOfIncome || '');
      form.getTextField(`unearnedIncome.${index}.howMuchEarned`).setText(income.howMuchEarned || '');
      form.getTextField(`unearnedIncome.${index}.howOftenPaid`).setText(income.howOftenPaid || '');
    });

    data.contributions.forEach((contribution: { name: any; typeOfIncome: any; howMuch: any; howOftenPaid: any; }, index: any) => {
      form.getTextField(`contributions.${index}.name`).setText(contribution.name || '');
      form.getTextField(`contributions.${index}.typeOfIncome`).setText(contribution.typeOfIncome || '');
      form.getTextField(`contributions.${index}.howMuch`).setText(contribution.howMuch || '');
      form.getTextField(`contributions.${index}.howOftenPaid`).setText(contribution.howOftenPaid || '');
    });

    data.otherIncome.forEach((income: { name: any; typeOfIncome: any; howMuch: any; howOftenPaid: any; }, index: any) => {
      form.getTextField(`otherIncome.${index}.name`).setText(income.name || '');
      form.getTextField(`otherIncome.${index}.typeOfIncome`).setText(income.typeOfIncome || '');
      form.getTextField(`otherIncome.${index}.howMuch`).setText(income.howMuch || '');
      form.getTextField(`otherIncome.${index}.howOftenPaid`).setText(income.howOftenPaid || '');
    });

    // Section D: Health Insurance
    form.getTextField('applyingHavingMedicare').setText(data.applyingHavingMedicare || '');
    form.getTextField('applyingHavingCommercialInsurance.nameOfInsured').setText(data.applyingHavingCommercialInsurance.nameOfInsured || '');
    form.getTextField('applyingHavingCommercialInsurance.personCovered').setText(data.applyingHavingCommercialInsurance.personCovered || '');
    form.getTextField('applyingHavingCommercialInsurance.costOfPolicy').setText(data.applyingHavingCommercialInsurance.costOfPolicy || '');
    form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.month').setText(data.applyingHavingCommercialInsurance.endOfCoverage.month || '');
    form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.day').setText(data.applyingHavingCommercialInsurance.endOfCoverage.day || '');
    form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.year').setText(data.applyingHavingCommercialInsurance.endOfCoverage.year || '');

    // Section E: Housing Expenses
    form.getTextField('monthlyHousingPayment').setText(data.monthlyHousingPayment || '');
    form.getTextField('payForWater.payForWaterAmount').setText(data.payForWater.payForWaterAmount || '');
    form.getTextField('payForWater.howOftenPaid').setText(data.payForWater.howOftenPaid || '');

    // Section F: Blind, Disabled, Chronically Ill or Nursing Home Care
    form.getTextField('nursingHomeCare').setText(data.nursingHomeCare || '');
    form.getTextField('blindOrDisabledOrChronicallyIll').setText(data.blindOrDisabledOrChronicallyIll || '');

    // Section G: Additional Health Questions
    form.getTextField('prescriptionBill3Month.name').setText(data.prescriptionBill3Month.name || '');
    form.getTextField('prescriptionBill3Month.whichMonth').setText(data.prescriptionBill3Month.whichMonth || '');
    form.getTextField('moveIntoThisCounty.who').setText(data.moveIntoThisCounty.who || '');
    form.getTextField('moveIntoThisCounty.whichState').setText(data.moveIntoThisCounty.whichState || '');
    form.getTextField('moveIntoThisCounty.whichCounty').setText(data.moveIntoThisCounty.whichCounty || '');
    form.getTextField('pendingLawSuit.who').setText(data.pendingLawSuit.who || '');
    form.getTextField('workersCompensationCase.who').setText(data.workersCompensationCase.who || '');
    form.getTextField('deceased.who').setText(data.deceased.who || '');

    // Section H: Parent or Spouse Not Living in the Family or Deceased
    form.getTextField('parentLiveOutside.childName1').setText(data.parentLiveOutside.childName1 || '');
    form.getTextField('parentLiveOutside.childName2').setText(data.parentLiveOutside.childName2 || '');
    form.getTextField('parentLiveOutside.nameOfParent1').setText(data.parentLiveOutside.nameOfParent1 || '');
    form.getTextField('parentLiveOutside.nameOfParent2').setText(data.parentLiveOutside.nameOfParent2 || '');
    form.getTextField('parentLiveOutside.dateOfBirth1.month').setText(data.parentLiveOutside.dateOfBirth1.month || '');
    form.getTextField('parentLiveOutside.dateOfBirth1.day').setText(data.parentLiveOutside.dateOfBirth1.day || '');
    form.getTextField('parentLiveOutside.dateOfBirth1.year').setText(data.parentLiveOutside.dateOfBirth1.year || '');
    form.getTextField('parentLiveOutside.dateOfBirth2.month').setText(data.parentLiveOutside.dateOfBirth2.month || '');
    form.getTextField('parentLiveOutside.dateOfBirth2.day').setText(data.parentLiveOutside.dateOfBirth2.day || '');
    form.getTextField('parentLiveOutside.dateOfBirth2.year').setText(data.parentLiveOutside.dateOfBirth2.year || '');
    form.getTextField('parentLiveOutside.street1').setText(data.parentLiveOutside.street1 || '');
    form.getTextField('parentLiveOutside.street2').setText(data.parentLiveOutside.street2 || '');
    form.getTextField('parentLiveOutside.city1').setText(data.parentLiveOutside.city1 || '');
    form.getTextField('parentLiveOutside.city2').setText(data.parentLiveOutside.city2 || '');
    form.getTextField('parentLiveOutside.ssn1').setText(data.parentLiveOutside.ssn1 || '');
    form.getTextField('parentLiveOutside.ssn2').setText(data.parentLiveOutside.ssn2 || '');

    // Section I: Health Plan Selection
    data.healthPlan.forEach((plan: { lastName: any; firstName: any; dob: any; ssn: any; nameOfHealthPlan: any; preferred: { preferredDoctorOrClinic: any; }; obGyn: any; }, index: any) => {
      form.getTextField(`healthPlan.${index}.lastName`).setText(plan.lastName || '');
      form.getTextField(`healthPlan.${index}.firstName`).setText(plan.firstName || '');
      form.getTextField(`healthPlan.${index}.dob`).setText(plan.dob || '');
      form.getTextField(`healthPlan.${index}.ssn`).setText(plan.ssn || '');
      form.getTextField(`healthPlan.${index}.nameOfHealthPlan`).setText(plan.nameOfHealthPlan || '');
      form.getTextField(`healthPlan.${index}.preferred.preferredDoctorOrClinic`).setText(plan.preferred.preferredDoctorOrClinic || '');
      form.getTextField(`healthPlan.${index}.obGyn`).setText(plan.obGyn || '');
    });

    // Save the filled PDF
    const filledPdfBytes = await pdfDoc.save();
    const filledPdfBuffer = Buffer.from(filledPdfBytes);
    fs.writeFileSync('./processed_files/filled.pdf', filledPdfBuffer);
    console.log('PDF processing complete!');
  } catch (error) {
    console.log(error);
  }

  const values = Object.values(data);
  const csvString = values.join(',');

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