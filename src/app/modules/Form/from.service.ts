/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Express } from 'express'; 
import { PDFDocument } from 'pdf-lib';
import CustomError from '../../errors/CusromError';

const takeAndProcessData = async (
  data: any,
  file: Express.Multer.File[],
): Promise<unknown> => {
    const pdfBytes = fs.readFileSync('./input.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    console.log(data); 
  try {
    // Set the value of the formTextField
    form.getTextField('applicantName').setText(data.applicantName || '');
    form.getTextField('applicationDate').setText(data.applicationDate || '');
    
    // Check the checkbox US Citizen DOB
    if(data.uscitizenshiporDOB === 'US passportcard') form.getCheckBox('US passportcard').check();
    if(data.uscitizenshiporDOB === 'Certificate of Naturalization DHS Forms N550 or N570') form.getCheckBox('Certificate of Naturalization DHS Forms N550 or N570').check();
    if(data.uscitizenshiporDOB === 'Certificate of US Citizenship DHS Forms N560 or N561') form.getCheckBox('Certificate of US Citizenship DHS Forms N560 or N561').check();
    if(data.uscitizenshiporDOB === 'NYS Enhanced Drivers License EDL') form.getCheckBox('NYS Enhanced Drivers License EDL').check();
    if(data.uscitizenshiporDOB === 'Native American Tribal Document issued by a Federally Recognized Tribe') form.getCheckBox('Native American Tribal Document issued by a Federally Recognized Tribe').check();
    
    // Check the checkbox US Citizen
    if(data.usCitizenship === 'US Birth Certificate') form.getCheckBox('US Birth Certificate').check();
    if(data.usCitizenship === 'Certification of Birth issued by Department of State Forms FS545 or DS1350') form.getCheckBox('Certification of Birth issued by Department of State Forms FS545 or DS1350').check();
    if(data.usCitizenship === 'US Citizen ID Card Form I197') form.getCheckBox('US Citizen ID Card Form I197').check();
    if(data.usCitizenship === 'Report of Birth Abroad FS240') form.getCheckBox('Report of Birth Abroad FS240').check();
    if(data.usCitizenship === 'US National ID card Form I197 or I179') form.getCheckBox('US National ID card Form I197 or I179').check();
    if(data.usCitizenship === 'ReligiousSchool Records') form.getCheckBox('ReligiousSchool Records').check();
    if(data.usCitizenship === 'Military record of service showing US place of birth') form.getCheckBox('Military record of service showing US place of birth').check();
    if(data.usCitizenship === 'Final adoption decree') form.getCheckBox('Final adoption decree').check();
    if(data.usCitizenship === 'Evidence of qualifying for US citizenship under the Child Citizenship Act of 2000') form.getCheckBox('Evidence of qualifying for US citizenship under the Child Citizenship Act of 2000').check();
    
    // Check the checkbox identityDocument
    if(data.identityDocument === 'State Drivers license or ID card with photo') form.getCheckBox('State Drivers license or ID card with photo').check();
    if(data.identityDocument === 'ID card issued by a federal state or local government agency') form.getCheckBox('ID card issued by a federal state or local government agency').check();
    if(data.identityDocument === 'US Military card or draft record or US Coast Guard Merchant Mariner Card') form.getCheckBox('US Military card or draft record or US Coast Guard Merchant Mariner Card').check();
    if(data.identityDocument === 'School ID card with a photo may also show date of birth') form.getCheckBox('School ID card with a photo may also show date of birth').check();
    if(data.identityDocument === 'Certificate of Degree of Indian blood or other American IndianAlaska Native tribal document') form.getCheckBox('Certificate of Degree of Indian blood or other American IndianAlaska Native tribal document').check();
    if(data.identityDocument === 'Verified School Nursery or Daycare records for children under 18') form.getCheckBox('Verified School Nursery or Daycare records for children under 18').check();
    if(data.identityDocument === 'Clinic Doctor or Hospital records for children under 18') form.getCheckBox('Clinic Doctor or Hospital records for children under 18').check();

    // Check the checkbox identityDocumentExtra
    if(data.identityDocumentExtra === 'Marriage certificate') form.getCheckBox('Marriage certificate').check();
    if(data.identityDocumentExtra === 'NYS Benefit Identification Card') form.getCheckBox('NYS Benefit Identification Card').check();


    if(data.ImmigrationstatesIdentity) form.getCheckBox(data.ImmigrationstatesIdentity).check();


    if(data.ImmigrationStatus) form.getCheckBox(data.ImmigrationStatus).check();

    // Check the checkbox dobIdentity
    if(data.dobIdentity === 'Visa') form.getCheckBox('Visa').check();
    if(data.dobIdentity === 'US Passport') form.getCheckBox('US Passport').check();

    // Check the checkbox homeAddressDocument
    if(data.homeAddressDocument === 'Lease letter rent receipt with your home address from landlord') form.getCheckBox('Lease letter rent receipt with your home address from landlord').check();
    if(data.homeAddressDocument === 'Utility Bill gas electric phone cable fuel or water') form.getCheckBox('Utility Bill gas electric phone cable fuel or water').check();
    if(data.homeAddressDocument === 'Property tax records or mortgage statement') form.getCheckBox('Property tax records or mortgage statement').check();
    if(data.homeAddressDocument === 'Drivers license if issued in the past 6 months') form.getCheckBox('Drivers license if issued in the past 6 months').check();
    if(data.homeAddressDocument === 'Government ID card with address') form.getCheckBox('Government ID card with address').check();
    if(data.homeAddressDocument === 'Postmarked envelope or post card cannot use if sent to a PO Box') form.getCheckBox('Postmarked envelope or post card cannot use if sent to a PO Box').check();

    // Check the checkbox wagesAndSalary
    if(data.wagesAndSalary === 'Paycheck stubs') form.getCheckBox('Paycheck stubs').check();
    if(data.wagesAndSalary === 'Letter from employer on company') form.getCheckBox('Letter from employer on company').check();
    if(data.wagesAndSalary === 'Businesspayroll records') form.getCheckBox('Businesspayroll records').check();

    // Check the checkbox selfEmployment
    if(data.selfEmployment === 'Current signed and dated income tax return') form.getCheckBox('Current signed and dated income tax return').check();
    if(data.selfEmployment === 'Records of earnings and expenses') form.getCheckBox('Records of earnings and expenses').check();
    
    // Check the checkbox unemploymentBenefits
    if(data.unemploymentBenefits === 'Award lettercertificate') form.getCheckBox('Award lettercertificate').check();
    if(data.unemploymentBenefits === 'Monthly benefit statement from NYS') form.getCheckBox('Monthly benefit statement from NYS').check();
    if(data.unemploymentBenefits === 'Printout of recipients account information') form.getCheckBox('Printout of recipients account information').check();
    if(data.unemploymentBenefits === 'Copy of Direct Payment Card with printout') form.getCheckBox('Copy of Direct Payment Card with printout').check();
    if(data.unemploymentBenefits === 'Correspondence from the NYS Department') form.getCheckBox('Correspondence from the NYS Department').check();

    // Check the checkbox privatePensionsAnnuities
    if(data.privatePensionsAnnuities === 'tatement from pensionannuity') form.getCheckBox('tatement from pensionannuity').check();
   
    // Check the checkbox socialSecurity
    if(data.socialSecurity === 'Award lettercertificate_2') form.getCheckBox('Award lettercertificate_2').check();
    if(data.socialSecurity === 'Annual benefit statement') form.getCheckBox('Annual benefit statement').check();
    if(data.socialSecurity === 'Correspondence from Social Security') form.getCheckBox('Correspondence from Social Security').check();
  
    // Check the checkbox workersCompensation
    if(data.workersCompensation === 'Award letter') form.getCheckBox('Award letter').check();
    if(data.workersCompensation === 'Check stub') form.getCheckBox('Check stub').check();

    // Check the checkbox childSupportAlimony
    if(data.childSupportAlimony === 'Letter from person providing support') form.getCheckBox('Letter from person providing support').check();
    if(data.childSupportAlimony === 'Letter from court') form.getCheckBox('Letter from court').check();
    if(data.childSupportAlimony === 'Child supportalimony check stub') form.getCheckBox('Child supportalimony check stub').check();
    if(data.childSupportAlimony === 'Copy of NY EPPICard with printout') form.getCheckBox('Copy of NY EPPICard with printout').check();
    if(data.childSupportAlimony === 'Copy of child support account information') form.getCheckBox('Copy of child support account information').check();
    if(data.childSupportAlimony === 'Copy of bank statement showing') form.getCheckBox('Copy of bank statement showing').check();

    // Check the checkbox veteransBenefits
    if(data.veteransBenefits === 'Award letter_2') form.getCheckBox('Award letter_2').check();
    if(data.veteransBenefits === 'Benefit check stub') form.getCheckBox('Benefit check stub').check();
    if(data.veteransBenefits === 'Correspondence from Veterans Affairs') form.getCheckBox('Correspondence from Veterans Affairs').check();

    // Check the checkbox militaryPay
    if(data.militaryPay === 'Award letter_3') form.getCheckBox('Award letter_3').check();
    if(data.militaryPay === 'Check stub_2') form.getCheckBox('Check stub_2').check();

    // Check the checkbox incomeFromRent
    if(data.incomeFromRent === 'Letter from roomer boarder tenant') form.getCheckBox('Letter from roomer boarder tenant').check();
    if(data.incomeFromRent === 'Check stub_3') form.getCheckBox('Check stub_3').check();

    // Check the checkbox interestDividendsRoyalties
    if(data.interestDividendsRoyalties === 'Recent statement from bank credit union') form.getCheckBox('Recent statement from bank credit union').check();
    if(data.interestDividendsRoyalties === 'Letter from broker') form.getCheckBox('Letter from broker').check();
    if(data.interestDividendsRoyalties === 'Letter from agent') form.getCheckBox('Letter from agent').check();
    if(data.interestDividendsRoyalties === '1099 or tax return if no other') form.getCheckBox('1099 or tax return if no other').check();

    // Check the checkbox careForChildrenorAdults
    if(data.careForChildrenorAdults === 'Written statement from day care center or other childadult care provider') form.getCheckBox('Written statement from day care center or other childadult care provider').check();
    if(data.careForChildrenorAdults === 'Canceled checks or receipts that show your payments') form.getCheckBox('Canceled checks or receipts that show your payments').check();

    /*---------- TODO: Have to Add Checkbox of courtOrdered from file ----------------*/
    /*---------- TODO: Have to Add Checkbox healthInsurance.proofOfCurrentHealthInsurance from file ------------*/
    /*---------- TODO: Have to Add Checkbox healthInsurance.healthInsuranceTerminationLetter from file ------------*/
    /*---------- TODO: Have to Add Checkbox healthInsurance.medicareCard from file ------------*/
    /*---------- TODO: Have to Add Checkbox healthInsurance.confirmationOfMedicareApplication from file ------------*/
    /*---------- TODO: Have to Add Checkbox healthInsurance.medicareAwardorDenialLetter from file ------------*/
    /*---------- TODO: Have to Add Checkbox medicalBills.proofofIncomeforMedicalBills from file ------------*/
    /*---------- TODO: Have to Add Checkbox medicalBills.proofofhomeAddress from file ------------*/
    /*---------- TODO: Have to Add Checkbox medicalBills.medicalBillsforLast3Months from file ------------*/
    /*---------- TODO: Have to Add Checkbox resources.bankStatements from file ------------*/
    /*---------- TODO: Have to Add Checkbox resources.stocksBonds from file ------------*/
    /*---------- TODO: Have to Add Checkbox resources.copyOfLifeInsurancePolicy from file ------------*/
    /*---------- TODO: Have to Add Checkbox resources.burialtrust from file ------------*/
    /*---------- TODO: Have to Add Checkbox resources.deedForRealEstate from file ------------*/

    // Check the checkbox proofOfstudentStatus
    if(data.proofOfstudentStatus === 'Copy of schedule') form.getCheckBox('Copy of schedule').check();
    if(data.proofOfstudentStatus === 'Statement from college or university') form.getCheckBox('Statement from college or university').check();
    if(data.proofOfstudentStatus === 'Other correspondence from college showing student status') form.getCheckBox('Other correspondence from college showing student status').check();  


    form.getTextField('personalInfo.firstName').setText(data?.['personalInfo.firstName'] || '');
    form.getTextField('personalInfo.middleName').setText(data?.['personalInfo.middleName'] || '');
    form.getTextField('personalInfo.lastName').setText(data?.['personalInfo.lastName'] || '');
    form.getTextField('personalInfo.primaryPhoneNumber').setText(data?.['personalInfo.primaryPhoneNumber'] || '');
    if(data?.['personalInfo.primaryPhoneType']) form.getRadioGroup('Primary Phone Type').select(data?.['personalInfo.primaryPhoneType']);
    form.getTextField('personalInfo.secondaryPhoneNumber').setText(data?.['personalInfo.secondaryPhoneNumber'] || '');
    if(data?.['personalInfo.secondaryPhoneType']) form.getRadioGroup('Another Phone Type').select(data?.['personalInfo.secondaryPhoneType']);
    form.getTextField('personalInfo.languageSpeak').setText(data?.['personalInfo.languageSpeak'] || '');
    form.getTextField('personalInfo.languageRead').setText(data?.['personalInfo.languageRead'] || '');
    if(data?.homeLess) form.getCheckBox('homeLess').check();
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
    if(data?.['anotherPerson.phoneType']) form.getRadioGroup('Phone type').select(data?.['anotherPerson.phoneType']);
    form.getTextField('anotherPerson.street').setText(data?.['anotherPerson.street'] || '');
    form.getTextField('anotherPerson.city').setText(data?.['anotherPerson.city'] || '');
    form.getTextField('anotherPerson.state').setText(data?.['anotherPerson.state'] || '');
    form.getTextField('anotherPerson.zip').setText(data?.['anotherPerson.zip'] || '');
    form.getTextField('anotherPerson.apt').setText(data?.['anotherPerson.apt'] || '');
    if(data?.['anotherPerson.permissions.ApplyMedicaidForMe']) form.getCheckBox('anotherPerson.permissions.ApplyMedicaidForMe').check();
    if(data?.['anotherPerson.permissions.disussMyCase']) form.getCheckBox('anotherPerson.permissions.disussMyCase').check();
    if(data?.['anotherPerson.permissions.getNoticesAndCorrespondence']) form.getCheckBox('anotherPerson.permissions.getNoticesAndCorrespondence').check();
    if(data.blindNoticeType) form.getRadioGroup('If you are blind or visually impaired and require information in an alternative format, check the type of mail you want to receive from us. Please return this form with your application').select(data.blindNoticeType);

    form.getTextField('familyInfo.0.name').setText(data?.['familyInfo.0.name'] || '');
    form.getTextField('familyInfo.0.birthName').setText(data?.['familyInfo.0.birthName'] || '');
    form.getTextField('familyInfo.0.stateOfBirth').setText(data?.['familyInfo.0.stateOfBirth'] || '');
    form.getTextField('familyInfo.0.cityOfBirth').setText(data?.['familyInfo.0.cityOfBirth'] || '');
    form.getTextField('familyInfo.0.countryOfBirth').setText(data?.['familyInfo.0.countryOfBirth'] || '');
    form.getTextField('familyInfo.0.dateOfBirth.month').setText(data?.['familyInfo.0.dateOfBirth.month'] || '');
    form.getTextField('familyInfo.0.dateOfBirth.day').setText(data?.['familyInfo.0.dateOfBirth.day'] || '');
    form.getTextField('familyInfo.0.dateOfBirth.year').setText(data?.['familyInfo.0.dateOfBirth.year'] || '');

    if(data?.['familyInfo.0.sex']) form.getRadioGroup('familyInfo.0.sex').select(data?.['familyInfo.0.sex']);
    if(data?.['familyInfo.0.isApplying']) form.getRadioGroup('familyInfo.0.isApplying').select(data?.['familyInfo.0.isApplying']);
    form.getTextField('familyInfo.0.genderIdentity').setText(data?.['familyInfo.0.genderIdentity'] || '');
    if(data?.['familyInfo.0.isPregnant']) form.getRadioGroup('familyInfo.0.isPregnant').select(data?.['familyInfo.0.isPregnant']);
    form.getTextField('familyInfo.0.pregnantDueDate.month').setText(data?.['familyInfo.0.pregnantDueDate.month'] || '');
    form.getTextField('familyInfo.0.pregnantDueDate.day').setText(data?.['familyInfo.0.pregnantDueDate.day'] || '');
    form.getTextField('familyInfo.0.pregnantDueDate.year').setText(data?.['familyInfo.0.pregnantDueDate.year'] || '');
    if(data?.['familyInfo.0.isParent']) form.getRadioGroup('familyInfo.0.isParent').select(data?.['familyInfo.0.isParent']);
    // form.getTextField('familyInfo.0.relationship').setText(data?.['familyInfo.0.relationship'] || ''); // for this field it is fixed value 'Self'
    if(data?.['familyInfo.0.publicHealthCoverage']) form.getRadioGroup('familyInfo.0.publicHealthCoverage').select(data?.['familyInfo.0.publicHealthCoverage']);
    form.getTextField('familyInfo.0.publicHealthCoverageidNumber').setText(data?.['familyInfo.0.publicHealthCoverageidNumber'] || '');
    form.getTextField('familyInfo.0.ssn').setText(data?.['familyInfo.0.ssn'] || '');
    if(data?.['familyInfo.0.usCitizenship']) form.getRadioGroup('familyInfo.0.usCitizenship').select(data?.['familyInfo.0.usCitizenship']);
    form.getTextField('familyInfo.0.usCitizenshipReceivedImmigrationStatusDate.month',).setText(data?.['familyInfo.0.usCitizenshipReceivedImmigrationStatusDate.month'] || '',);
    form.getTextField('familyInfo.0.usCitizenshipReceivedImmigrationStatusDate.day',).setText(data?.['familyInfo.0.usCitizenshipReceivedImmigrationStatusDate.day'] || '',);
    form.getTextField('familyInfo.0.usCitizenshipReceivedImmigrationStatusDate.year',).setText(data?.['familyInfo.0.usCitizenshipReceivedImmigrationStatusDate.year'] || '',);
    form.getTextField('familyInfo.0.race').setText(data?.['familyInfo.0.race'] || '');
    if(data?.['familyInfo.0.receivedAServiceFromIHS']) form.getRadioGroup('familyInfo.0.receivedAServiceFromIHS').select(data?.['familyInfo.0.receivedAServiceFromIHS']);

    // 2nd Member
    form.getTextField('familyInfo.1.name').setText(data?.['familyInfo.1.name'] || '');
    form.getTextField('familyInfo.1.birthName').setText(data?.['familyInfo.1.birthName'] || '');
    form.getTextField('familyInfo.1.stateOfBirth').setText(data?.['familyInfo.1.stateOfBirth'] || '');
    form.getTextField('familyInfo.1.cityOfBirth').setText(data?.['familyInfo.1.cityOfBirth'] || '');
    form.getTextField('familyInfo.1.countryOfBirth').setText(data?.['familyInfo.1.countryOfBirth'] || '');
    form.getTextField('familyInfo.1.dateOfBirth.month').setText(data?.['familyInfo.1.dateOfBirth.month'] || '');
    form.getTextField('familyInfo.1.dateOfBirth.day').setText(data?.['familyInfo.1.dateOfBirth.day'] || '');
    form.getTextField('familyInfo.1.dateOfBirth.year').setText(data?.['familyInfo.1.dateOfBirth.year'] || '');
    if(data?.['familyInfo.1.sex']) form.getRadioGroup('familyInfo.1.sex').select(data?.['familyInfo.1.sex']);
  
    form.getTextField('familyInfo.1.genderIdentity').setText(data?.['familyInfo.1.genderIdentity'] || '');
  
    if(data?.['familyInfo.1.isApplying']) form.getRadioGroup('familyInfo.1.isApplying').select(data?.['familyInfo.1.isApplying']);
    if(data?.['familyInfo.1.isPregnant']) form.getRadioGroup('familyInfo.1.isPregnant').select(data?.['familyInfo.1.isPregnant']);

    form.getTextField('familyInfo.1.pregnantDueDate.month').setText(data?.['familyInfo.1.pregnantDueDate.month'] || '');
    form.getTextField('familyInfo.1.pregnantDueDate.day').setText(data?.['familyInfo.1.pregnantDueDate.day'] || '');
    form.getTextField('familyInfo.1.pregnantDueDate.year').setText(data?.['familyInfo.1.pregnantDueDate.year'] || '');
    if(data?.['familyInfo.1.isParent']) form.getRadioGroup('familyInfo.1.isParent').select(data?.['familyInfo.1.isParent']);
    form.getTextField('familyInfo.1.relationship').setText(data?.['familyInfo.1.relationship'] || '');
    if(data?.['familyInfo.1.publicHealthCoverage']) form.getRadioGroup('familyInfo.1.publicHealthCoverage').select(data?.['familyInfo.1.publicHealthCoverage']);
    form.getTextField('familyInfo.1.publicHealthCoverageidNumber').setText(data?.['familyInfo.1.publicHealthCoverageidNumber'] || '');
    form.getTextField('familyInfo.1.ssn').setText(data?.['familyInfo.1.ssn'] || '');
    if(data?.['familyInfo.1.usCitizenship']) form.getRadioGroup('familyInfo.1.usCitizenship').select(data?.['familyInfo.1.usCitizenship']);
    form.getTextField('familyInfo.1.usCitizenshipReceivedImmigrationStatusDate.month',).setText(data?.['familyInfo.1.usCitizenshipReceivedImmigrationStatusDate.month'] || '',);
    form.getTextField('familyInfo.1.usCitizenshipReceivedImmigrationStatusDate.day',).setText(data?.['familyInfo.1.usCitizenshipReceivedImmigrationStatusDate.day'] || '',);
    form.getTextField('familyInfo.1.usCitizenshipReceivedImmigrationStatusDate.year',).setText(data?.['familyInfo.1.usCitizenshipReceivedImmigrationStatusDate.year'] || '',);
    form.getTextField('familyInfo.1.race').setText(data?.['familyInfo.1.race'] || '');
    if(data?.['familyInfo.1.receivedAServiceFromIHS']) form.getRadioGroup('familyInfo.1.receivedAServiceFromIHS').select(data?.['familyInfo.1.receivedAServiceFromIHS']);

    // 3nd Member
    form.getTextField('familyInfo.2.name').setText(data?.['familyInfo.2.name'] || '');
    form.getTextField('familyInfo.2.birthName').setText(data?.['familyInfo.2.birthName'] || '');
    form.getTextField('familyInfo.2.stateOfBirth').setText(data?.['familyInfo.2.stateOfBirth'] || '');
    form.getTextField('familyInfo.2.cityOfBirth').setText(data?.['familyInfo.2.cityOfBirth'] || '');
    form.getTextField('familyInfo.2.countryOfBirth').setText(data?.['familyInfo.2.countryOfBirth'] || '');
    form.getTextField('familyInfo.2.dateOfBirth.month').setText(data?.['familyInfo.2.dateOfBirth.month'] || '');
    form.getTextField('familyInfo.2.dateOfBirth.day').setText(data?.['familyInfo.2.dateOfBirth.day'] || '');
    form.getTextField('familyInfo.2.dateOfBirth.year').setText(data?.['familyInfo.2.dateOfBirth.year'] || '');
    if(data?.['familyInfo.2.sex']) form.getRadioGroup('familyInfo.2.sex').select(data?.['familyInfo.2.sex']);
    form.getTextField('familyInfo.2.genderIdentity').setText(data?.['familyInfo.2.genderIdentity'] || '');
    if(data?.['familyInfo.2.isApplying']) form.getRadioGroup('familyInfo.2.isApplying').select(data?.['familyInfo.2.isApplying']);
    if(data?.['familyInfo.2.isPregnant']) form.getRadioGroup('familyInfo.2.isPregnant').select(data?.['familyInfo.2.isPregnant']);
    form.getTextField('familyInfo.2.pregnantDueDate.month').setText(data?.['familyInfo.2.pregnantDueDate.month'] || '');
    form.getTextField('familyInfo.2.pregnantDueDate.day').setText(data?.['familyInfo.2.pregnantDueDate.day'] || '');
    form.getTextField('familyInfo.2.pregnantDueDate.year').setText(data?.['familyInfo.2.pregnantDueDate.year'] || '');
    if(data?.['familyInfo.2.isParent']) form.getRadioGroup('familyInfo.2.isParent').select(data?.['familyInfo.2.isParent']);
    form.getTextField('familyInfo.2.relationship').setText(data?.['familyInfo.2.relationship'] || '');
    if(data?.['familyInfo.2.publicHealthCoverage']) form.getRadioGroup('familyInfo.2.publicHealthCoverage').select(data?.['familyInfo.2.publicHealthCoverage']);
    form.getTextField('familyInfo.2.publicHealthCoverageidNumber').setText(data?.['familyInfo.2.publicHealthCoverageidNumber'] || '');
    form.getTextField('familyInfo.2.ssn').setText(data?.['familyInfo.2.ssn'] || '');
    if(data?.['familyInfo.2.usCitizenship']) form.getRadioGroup('familyInfo.2.usCitizenship').select(data?.['familyInfo.2.usCitizenship']);
    form.getTextField('familyInfo.2.usCitizenshipReceivedImmigrationStatusDate.month',).setText(data?.['familyInfo.2.usCitizenshipReceivedImmigrationStatusDate.month'] || '',);
    form.getTextField('familyInfo.2.usCitizenshipReceivedImmigrationStatusDate.day',).setText(data?.['familyInfo.2.usCitizenshipReceivedImmigrationStatusDate.day'] || '',);
    form.getTextField('familyInfo.2.usCitizenshipReceivedImmigrationStatusDate.year',).setText(data?.['familyInfo.2.usCitizenshipReceivedImmigrationStatusDate.year'] || '',);
    form.getTextField('familyInfo.2.race').setText(data?.['familyInfo.2.race'] || '');
    if(data?.['familyInfo.2.receivedAServiceFromIHS']) form.getRadioGroup('familyInfo.2.receivedAServiceFromIHS').select(data?.['familyInfo.2.receivedAServiceFromIHS']);

    // 4rd Member
    form.getTextField('familyInfo.3.name').setText(data?.['familyInfo.3.name'] || '');
    form.getTextField('familyInfo.3.birthName').setText(data?.['familyInfo.3.birthName'] || '');
    form.getTextField('familyInfo.3.stateOfBirth').setText(data?.['familyInfo.3.stateOfBirth'] || '');
    form.getTextField('familyInfo.3.cityOfBirth').setText(data?.['familyInfo.3.cityOfBirth'] || '');
    form.getTextField('familyInfo.3.countryOfBirth').setText(data?.['familyInfo.3.countryOfBirth'] || '');
    form.getTextField('familyInfo.3.dateOfBirth.month').setText(data?.['familyInfo.3.dateOfBirth.month'] || '');
    form.getTextField('familyInfo.3.dateOfBirth.day').setText(data?.['familyInfo.3.dateOfBirth.day'] || '');
    form.getTextField('familyInfo.3.dateOfBirth.year').setText(data?.['familyInfo.3.dateOfBirth.year'] || '');
    if(data?.['familyInfo.3.sex']) form.getRadioGroup('familyInfo.3.sex').select(data?.['familyInfo.3.sex']);
    form.getTextField('familyInfo.3.genderIdentity').setText(data?.['familyInfo.3.genderIdentity'] || '');
    if(data?.['familyInfo.3.isApplying']) form.getRadioGroup('familyInfo.3.isApplying').select(data?.['familyInfo.3.isApplying']);
    if(data?.['familyInfo.3.isPregnant']) form.getRadioGroup('familyInfo.3.isPregnant').select(data?.['familyInfo.3.isPregnant']);
    form.getTextField('familyInfo.3.pregnantDueDate.month').setText(data?.['familyInfo.3.pregnantDueDate.month'] || '');
    form.getTextField('familyInfo.3.pregnantDueDate.day').setText(data?.['familyInfo.3.pregnantDueDate.day'] || '');
    form.getTextField('familyInfo.3.pregnantDueDate.year').setText(data?.['familyInfo.3.pregnantDueDate.year'] || '');
    if(data?.['familyInfo.3.isParent']) form.getRadioGroup('familyInfo.3.isParent').select(data?.['familyInfo.3.isParent']);
    form.getTextField('familyInfo.3.relationship').setText(data?.['familyInfo.3.relationship'] || '');
    if(data?.['familyInfo.3.publicHealthCoverage']) form.getRadioGroup('familyInfo.3.publicHealthCoverage').select(data?.['familyInfo.3.publicHealthCoverage']);
    form.getTextField('familyInfo.3.publicHealthCoverageidNumber').setText(data?.['familyInfo.3.publicHealthCoverageidNumber'] || '');
    form.getTextField('familyInfo.3.ssn').setText(data?.['familyInfo.3.ssn'] || '');
    if(data?.['familyInfo.3.usCitizenship']) form.getRadioGroup('familyInfo.3.usCitizenship').select(data?.['familyInfo.3.usCitizenship']);
    form.getTextField('familyInfo.3.usCitizenshipReceivedImmigrationStatusDate.month',).setText(data?.['familyInfo.3.usCitizenshipReceivedImmigrationStatusDate.month'] || '',);
    form.getTextField('familyInfo.3.usCitizenshipReceivedImmigrationStatusDate.day',).setText(data?.['familyInfo.3.usCitizenshipReceivedImmigrationStatusDate.day'] || '',);
    form.getTextField('familyInfo.3.usCitizenshipReceivedImmigrationStatusDate.year',).setText(data?.['familyInfo.3.usCitizenshipReceivedImmigrationStatusDate.year'] || '',);
    form.getTextField('familyInfo.3.race').setText(data?.['familyInfo.3.race'] || '');
    if(data?.['familyInfo.3.receivedAServiceFromIHS']) form.getRadioGroup('familyInfo.3.receivedAServiceFromIHS').select(data?.['familyInfo.3.receivedAServiceFromIHS']);

    // 5th Member
    form.getTextField('familyInfo.4.name').setText(data?.['familyInfo.4.name'] || '');
    form.getTextField('familyInfo.4.birthName').setText(data?.['familyInfo.4.birthName'] || '');
    form.getTextField('familyInfo.4.stateOfBirth').setText(data?.['familyInfo.4.stateOfBirth'] || '');
    form.getTextField('familyInfo.4.cityOfBirth').setText(data?.['familyInfo.4.cityOfBirth'] || '');
    form.getTextField('familyInfo.4.countryOfBirth').setText(data?.['familyInfo.4.countryOfBirth'] || '');
    form.getTextField('familyInfo.4.dateOfBirth.month').setText(data?.['familyInfo.4.dateOfBirth.month'] || '');
    form.getTextField('familyInfo.4.dateOfBirth.day').setText(data?.['familyInfo.4.dateOfBirth.day'] || '');
    form.getTextField('familyInfo.4.dateOfBirth.year').setText(data?.['familyInfo.4.dateOfBirth.year'] || '');
    if(data?.['familyInfo.4.sex']) form.getRadioGroup('Birth Choose Sex').select(data?.['familyInfo.4.sex']);
    form.getTextField('familyInfo.4.genderIdentity').setText(data?.['familyInfo.4.genderIdentity'] || '');
    if(data?.['familyInfo.4.isApplying']) form.getRadioGroup('familyInfo.4.isApplying').select(data?.['familyInfo.4.isApplying']);
    if(data?.['familyInfo.4.isPregnant']) form.getRadioGroup('familyInfo.4.isPregnant').select(data?.['familyInfo.4.isPregnant']);
    form.getTextField('familyInfo.4.pregnantDueDate.month').setText(data?.['familyInfo.4.pregnantDueDate.month'] || '');
    form.getTextField('familyInfo.4.pregnantDueDate.day').setText(data?.['familyInfo.4.pregnantDueDate.day'] || '');
    form.getTextField('familyInfo.4.pregnantDueDate.year').setText(data?.['familyInfo.4.pregnantDueDate.year'] || '');
    if(data?.['familyInfo.4.isParent']) form.getRadioGroup('familyInfo.4.isParent').select(data?.['familyInfo.4.isParent']);
    form.getTextField('familyInfo.4.relationship').setText(data?.['familyInfo.4.relationship'] || '');
    if(data?.['familyInfo.4.publicHealthCoverage']) form.getRadioGroup('familyInfo.4.publicHealthCoverage').select(data?.['familyInfo.4.publicHealthCoverage']);
    form.getTextField('familyInfo.4.publicHealthCoverageidNumber').setText(data?.['familyInfo.4.publicHealthCoverageidNumber'] || '');
    form.getTextField('familyInfo.4.ssn').setText(data?.['familyInfo.4.ssn'] || '');
    if(data?.['familyInfo.4.usCitizenship']) form.getRadioGroup('familyInfo.4.usCitizenship').select(data?.['familyInfo.4.usCitizenship']);
    form.getTextField('familyInfo.4.usCitizenshipReceivedImmigrationStatusDate.month',).setText(data?.['familyInfo.4.usCitizenshipReceivedImmigrationStatusDate.month'] || '',);
    form.getTextField('familyInfo.4.usCitizenshipReceivedImmigrationStatusDate.day',).setText(data?.['familyInfo.4.usCitizenshipReceivedImmigrationStatusDate.day'] || '',);
    form.getTextField('familyInfo.4.usCitizenshipReceivedImmigrationStatusDate.year',).setText(data?.['familyInfo.4.usCitizenshipReceivedImmigrationStatusDate.year'] || '',);
    form.getTextField('familyInfo.4.race').setText(data?.['familyInfo.4.race'] || '');
    if(data?.['familyInfo.4.receivedAServiceFromIHS']) form.getRadioGroup('familyInfo.4.receivedAServiceFromIHS').select(data?.['familyInfo.4.receivedAServiceFromIHS']);

    if(data.householdVeteran) form.getRadioGroup('householdVeteran').select(data.householdVeteran);
    form.getTextField('veteranName').setText(data.veteranName || '');

    if(data.selfEmploymentInfo) form.getRadioGroup('selfEmploymentInfo').select(data.selfEmploymentInfo);
    if(data.noEarningsFromWork) form.getRadioGroup('noEarningsFromWork').select('no');

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

    if(data.noUnearnedIncome) form.getCheckBox('noUnearnedIncome').check();
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

    if(data.noContributions) form.getCheckBox('noContributions').check();
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

    if(data.noOtherIncome) form.getCheckBox('noOtherIncome').check();
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
    if(data?.['applierChangeJob.changeJobin3Month']) form.getRadioGroup('applierChangeJob.changeJobin3Month').select(data?.['applierChangeJob.changeJobin3Month']);
    form.getTextField('applierChangeJob.lastJobDate.month').setText(data?.['applierChangeJob.lastJobDate.month'] || '');
    form.getTextField('applierChangeJob.lastJobDate.day').setText(data?.['applierChangeJob.lastJobDate.day'] || '');
    form.getTextField('applierChangeJob.lastJobDate.year').setText(data?.['applierChangeJob.lastJobDate.year'] || '');
    form.getTextField('applierChangeJob.nameofEmployer').setText(data?.['applierChangeJob.nameofEmployer'] || '');

    if(data?.['applierStudent.student']) form.getRadioGroup('applierStudent.student').select(data?.['applierStudent.student']);
    if(data?.['applierStudent.studentType']) form.getRadioGroup('applierStudent.studentType').select(data?.['applierStudent.studentType']);
    form.getTextField('applierStudent.nameOfStudent').setText(data?.['applierStudent.nameOfStudent'] || '');
    if(data.payForChildCare) form.getRadioGroup('payForChildCare').select(data.payForChildCare);

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

    if(data?.familyPlanningServiceOnly) form.getRadioGroup('familyPlanningServiceOnly').select(data?.familyPlanningServiceOnly);
    if(data?.['isPayCourtOrdered.payCourtOrdered']) form.getRadioGroup('isPayCourtOrdered.payCourtOrdered').select(data?.['isPayCourtOrdered.payCourtOrdered']);
    form.getTextField('isPayCourtOrdered.payCourtOrderedAmount').setText(data?.['isPayCourtOrdered.payCourtOrderedAmount'] || '');
    form.getTextField('isPayCourtOrdered.whoPayCourtOrdered').setText(data?.['isPayCourtOrdered.whoPayCourtOrdered'] || '');

    if(data?.applyingHavingMedicare) form.getRadioGroup('applyingHavingMedicare').select(data?.applyingHavingMedicare);
    // applyingHavingCommercialInsurance.commercialInsurance
    form.getTextField('applyingHavingCommercialInsurance.nameOfInsured').setText(data?.['applyingHavingCommercialInsurance.nameOfInsured'] || '');
    form.getTextField('applyingHavingCommercialInsurance.personCovered').setText(data?.['applyingHavingCommercialInsurance.personCovered'] || '');
    form.getTextField('applyingHavingCommercialInsurance.costOfPolicy').setText(data?.['applyingHavingCommercialInsurance.costOfPolicy'] || '');
    form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.month').setText(data?.['applyingHavingCommercialInsurance.endOfCoverage.month'] || '',);
    form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.day').setText(data?.['applyingHavingCommercialInsurance.endOfCoverage.day'] || '',);
    form.getTextField('applyingHavingCommercialInsurance.endOfCoverage.year').setText(data?.['applyingHavingCommercialInsurance.endOfCoverage.year'] || '',);
    if(data.currentJobInsurance) form.getRadioGroup('currentJobInsurance').select(data.currentJobInsurance);
    form.getTextField('monthlyHousingPayment').setText(data?.['monthlyHousingPayment'] || '');
    form.getTextField('payForWater.payForWaterAmount').setText(data?.['payForWater.payForWaterAmount'] || '');
    if(data?.['payForWater.howOftenPaid']) form.getRadioGroup('payForWater.howOftenPaid').select(data?.['payForWater.howOftenPaid']);
    if(data?.freeHousingAsPartofYourPay) form.getRadioGroup('freeHousingAsPartofYourPay').select(data?.freeHousingAsPartofYourPay);
    if(data?.nursingHomeCare) form.getRadioGroup('nursingHomeCare').select(data?.nursingHomeCare);
    if(data?.blindOrDisabledOrChronicallyIll) form.getRadioGroup('blindOrDisabledOrChronicallyIll').select(data?.blindOrDisabledOrChronicallyIll);

    if(data?.['prescriptionBill3Month.prescriptionBill']) form.getRadioGroup('prescriptionBill3Month.prescriptionBill').select(data?.['prescriptionBill3Month.prescriptionBill']);
    form.getTextField('prescriptionBill3Month.name').setText(data?.['prescriptionBill3Month.name'] || '');
    form.getTextField('prescriptionBill3Month.whichMonth').setText(data?.['prescriptionBill3Month.whichMonth'] || '');

    if(data?.prescriptionBillOlder) form.getRadioGroup('prescriptionBillOlder').select(data?.prescriptionBillOlder);
    if(data?.['moveIntoThisCounty.move']) form.getRadioGroup('moveIntoThisCounty.move').select(data?.['moveIntoThisCounty.move']);
    form.getTextField('moveIntoThisCounty.who').setText(data?.['moveIntoThisCounty.who'] || '');
    form.getTextField('moveIntoThisCounty.whichState').setText(data?.['moveIntoThisCounty.whichState'] || '');
    form.getTextField('moveIntoThisCounty.whichCounty').setText(data?.['moveIntoThisCounty.whichCounty'] || '');

    if(data?.['pendingLawSuit.pending']) form.getRadioGroup('pendingLawSuit.pending').select(data?.['pendingLawSuit.pending']);
    form.getTextField('pendingLawSuit.who').setText(data?.['pendingLawSuit.who'] || '');
    if(data?.['workersCompensationCase.workersCompensation']) form.getRadioGroup('workersCompensationCase.workersCompensation').select(data?.['workersCompensationCase.workersCompensation']);
    form.getTextField('workersCompensationCase.who').setText(data?.['workersCompensationCase.who'] || '');
    if(data?.['deceased.deceased']) form.getRadioGroup('deceased.deceased').select(data?.['deceased.deceased']);
    form.getTextField('deceased.who').setText(data?.['deceased.who'] || '');

    if(data?.['parentLiveOutside.parentLiveOutside']) form.getRadioGroup('parentLiveOutside.parentLiveOutside').select(data?.['parentLiveOutside.parentLiveOutside']);
    if(data?.['parentLiveOutside.fearOfHarm']) form.getCheckBox('parentLiveOutside.fearOfHarm').check();
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

    if(data?.['marriedLivesOutside.marriedLivesOutside']) form.getRadioGroup('marriedLivesOutside.marriedLivesOutside').select(data?.['marriedLivesOutside.marriedLivesOutside']);
    if(data?.['marriedLivesOutside.fearOfHarm']) form.getCheckBox('marriedLivesOutside.fearOfHarm').check();
    form.getTextField('marriedLivesOutside.applyingPerson').setText(data?.['marriedLivesOutside.applyingPerson'] || '');
    form.getTextField('marriedLivesOutside.spouseName').setText(data?.['marriedLivesOutside.spouseName'] || '');
    form.getTextField('marriedLivesOutside.dateOfBirth.month').setText(data?.['marriedLivesOutside.dateOfBirth.month'] || '');
    form.getTextField('marriedLivesOutside.dateOfBirth.day').setText(data?.['marriedLivesOutside.dateOfBirth.day'] || '');
    form.getTextField('marriedLivesOutside.dateOfBirth.year').setText(data?.['marriedLivesOutside.dateOfBirth.year'] || '');
    form.getTextField('marriedLivesOutside.street').setText(data?.['marriedLivesOutside.street'] || '');
    form.getTextField('marriedLivesOutside.city').setText(data?.['marriedLivesOutside.city'] || '');
    form.getTextField('marriedLivesOutside.ssn').setText(data?.['marriedLivesOutside.ssn'] || '');

    if(data?.doWanttoJoinHealthPlan) form.getCheckBox('doWanttoJoinHealthPlan').check();
    // healthPlan 1
    form.getTextField('healthPlan.0.lastName').setText(data?.['healthPlan.0.lastName'] || '');
    form.getTextField('healthPlan.0.firstName').setText(data?.['healthPlan.0.firstName'] || '');
    form.getTextField('healthPlan.0.dob').setText(data?.['healthPlan.0.dob'] || '');
    form.getTextField('healthPlan.0.ssn').setText(data?.['healthPlan.0.ssn'] || '');
    form.getTextField('healthPlan.0.nameOfHealthPlan').setText(data?.['healthPlan.0.nameOfHealthPlan'] || '');
    form.getTextField('healthPlan.0.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.0.preferred.preferredDoctorOrClinic'] || '');
    if(data?.['healthPlan.0.preferred.currentProvider']) form.getCheckBox('healthPlan.0.preferred.currentProvider').check();
    form.getTextField('healthPlan.0.obGyn').setText(data?.['healthPlan.0.obGyn'] || '');

    // healthPlan 2
    form.getTextField('healthPlan.1.lastName').setText(data?.['healthPlan.1.lastName'] || '');
    form.getTextField('healthPlan.1.firstName').setText(data?.['healthPlan.1.firstName'] || '');
    form.getTextField('healthPlan.1.dob').setText(data?.['healthPlan.1.dob'] || '');
    form.getTextField('healthPlan.1.ssn').setText(data?.['healthPlan.1.ssn'] || '');
    form.getTextField('healthPlan.1.nameOfHealthPlan').setText(data?.['healthPlan.1.nameOfHealthPlan'] || '');
    form.getTextField('healthPlan.1.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.1.preferred.preferredDoctorOrClinic'] || '');
    if(data?.['healthPlan.1.preferred.currentProvider']) form.getCheckBox('healthPlan.1.preferred.currentProvider').check();
    form.getTextField('healthPlan.1.obGyn').setText(data?.['healthPlan.1.obGyn'] || '');

    // healthPlan 3
    form.getTextField('healthPlan.2.lastName').setText(data?.['healthPlan.2.lastName'] || '');
    form.getTextField('healthPlan.2.firstName').setText(data?.['healthPlan.2.firstName'] || '');
    form.getTextField('healthPlan.2.dob').setText(data?.['healthPlan.2.dob'] || '');
    form.getTextField('healthPlan.2.ssn').setText(data?.['healthPlan.2.ssn'] || '');
    form.getTextField('healthPlan.2.nameOfHealthPlan').setText(data?.['healthPlan.2.nameOfHealthPlan'] || '');
    form.getTextField('healthPlan.2.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.2.preferred.preferredDoctorOrClinic'] || '');
    if(data?.['healthPlan.2.preferred.currentProvider']) form.getCheckBox('healthPlan.2.preferred.currentProvider').check();
    form.getTextField('healthPlan.2.obGyn').setText(data?.['healthPlan.2.obGyn'] || '');

    // healthPlan 4
    form.getTextField('healthPlan.3.lastName').setText(data?.['healthPlan.3.lastName'] || '');
    form.getTextField('healthPlan.3.firstName').setText(data?.['healthPlan.3.firstName'] || '');
    form.getTextField('healthPlan.3.dob').setText(data?.['healthPlan.3.dob'] || '');
    form.getTextField('healthPlan.3.ssn').setText(data?.['healthPlan.3.ssn'] || '');
    form.getTextField('healthPlan.3.nameOfHealthPlan').setText(data?.['healthPlan.3.nameOfHealthPlan'] || '');
    form.getTextField('healthPlan.3.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.3.preferred.preferredDoctorOrClinic'] || '');
    if(data?.['healthPlan.3.preferred.currentProvider']) form.getCheckBox('healthPlan.3.preferred.currentProvider').check();
    form.getTextField('healthPlan.3.obGyn').setText(data?.['healthPlan.3.obGyn'] || '');

    // healthPlan 5
    form.getTextField('healthPlan.4.lastName').setText(data?.['healthPlan.4.lastName'] || '');
    form.getTextField('healthPlan.4.firstName').setText(data?.['healthPlan.4.firstName'] || '');
    form.getTextField('healthPlan.4.dob').setText(data?.['healthPlan.4.dob'] || '');
    form.getTextField('healthPlan.4.ssn').setText(data?.['healthPlan.4.ssn'] || '');
    form.getTextField('healthPlan.4.nameOfHealthPlan').setText(data?.['healthPlan.4.nameOfHealthPlan'] || '');
    form.getTextField('healthPlan.4.preferred.preferredDoctorOrClinic').setText(data?.['healthPlan.4.preferred.preferredDoctorOrClinic'] || '');
    if(data?.['healthPlan.4.preferred.currentProvider']) form.getCheckBox('healthPlan.4.preferred.currentProvider').check();
    form.getTextField('healthPlan.4.obGyn').setText(data?.['healthPlan.4.obGyn'] || '');

    // Save the pdf to the file system
    const filledPdfBytes = await pdfDoc.save();
    const filledPdfBuffer = Buffer.from(filledPdfBytes);
    fs.writeFileSync('./processed_files/filled.pdf', filledPdfBuffer);

    console.log('PDF processing complete!');
  } catch (error) {
    console.log(error);
   throw new CustomError(String(error), 400);
  }
  const values = Object.values(data);
  console.log(values.length);
  
  /* 
  const headers = Object.keys(data);
  const csvString = headers.join(',') + '\n' + values.join(',');
  */

  const csvString = values.join(',');

/* fs.writeFile('./processed_files/output.csv', csvString, (err) => { */
  fs.writeFile('./processed_files/output.txt', csvString, (err) => {
    if (err) {
      new CustomError(String(err), 400);
    } else {
      console.log('File saved successfully as output.txt');
    }
  });
  return { data, file };
};

export const formServices = {
  takeAndProcessData,
};
