/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import CustomError from '../../errors/CusromError';
import formImageFileUpload from './form.imageFileUpload';
  
const takeAndProcessData = async (
  data: any,
  // eslint-disable-next-line no-undef
  file: Express.Multer.File[],
): Promise<unknown> => {
  const pdfBytes = fs.readFileSync('./Access NY Health Care Application DOH-4220.pdf');
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  try {
    // Helper function to safely set text field values
    const setTextField = (fieldName: string, value: string | undefined) => {
      form.getTextField(fieldName).setText(value || '');
    };

    // Helper function to safely check checkbox values
    const checkCheckbox = (checkboxName: string | undefined) => {
      if (checkboxName) {
        form.getCheckBox(checkboxName).check();
      }
    };

    // Helper function to safely select radio group value
    const selectRadioGroup = (groupName: string, value: string | undefined) => {
      if (value) {
        try {
          form.getRadioGroup(groupName).select(value);
        } catch (e) {
          console.log('Error selecting radio group', groupName, value, e);
        }
      }
    };

    // Set applicant information
    setTextField('Applicant Name', data.applicantName);
    setTextField('Application Date', data.applicationDate);

    // Check citizenship and identity checkboxes
    checkCheckbox(data.uscitizenshiporDOB);
    checkCheckbox(data.usCitizenship);
    checkCheckbox(data.identityDocument);
    checkCheckbox(data.identityDocumentExtra);
    checkCheckbox(data.ImmigrationstatesIdentity);
    checkCheckbox(data.ImmigrationStatus);
    checkCheckbox(data.dobIdentity);
    checkCheckbox(data.homeAddressDocument);

    // Check income checkboxes
    checkCheckbox(data.wagesAndSalary);
    checkCheckbox(data.selfEmployment);
    checkCheckbox(data.unemploymentBenefits);
    checkCheckbox(data.privatePensionsAnnuities);
    checkCheckbox(data.socialSecurity);
    checkCheckbox(data.workersCompensation);
    checkCheckbox(data.childSupportAlimony);
    checkCheckbox(data.veteransBenefits);
    checkCheckbox(data.militaryPay);
    checkCheckbox(data.incomeFromRent);
    checkCheckbox(data.interestDividendsRoyalties);
    checkCheckbox(data.careForChildrenorAdults);

    // Check additional checkboxes
    checkCheckbox(data.proofOfstudentStatus);

    // Set personal information
    setTextField('Legal First Name', data?.['personalInfo.firstName']);
    setTextField('Middle Initial', data?.['personalInfo.middleName']);
    setTextField('Legal Last Name', data?.['personalInfo.lastName']);
    setTextField(
      'personalInfo.primaryPhoneNumber',
      data?.['personalInfo.primaryPhoneNumber'],
    );
    selectRadioGroup(
      'Primary Phone Type',
      data?.['personalInfo.primaryPhoneType'],
    );
    setTextField(
      'personalInfo.secondaryPhoneNumber',
      data?.['personalInfo.secondaryPhoneNumber'],
    );
    selectRadioGroup(
      'Another Phone Type',
      data?.['personalInfo.secondaryPhoneType'],
    );
    setTextField(
      'Speak',
      data?.['personalInfo.languageSpeak'],
    );
    setTextField(
      'Read',
      data?.['personalInfo.languageRead'],
    );
    checkCheckbox(data?.homeLess ? 'homeLess' : undefined); // only check if truthy

    // Set address information
    setTextField('Street', data?.['homeAddress.street']);
    setTextField('City', data?.['homeAddress.city']);
    setTextField('State', data?.['homeAddress.state']);
    setTextField('Zip Code', data?.['homeAddress.zip']);
    setTextField('County', data?.['homeAddress.county']);
    setTextField('Apt', data?.['homeAddress.apt']);

    setTextField('Street_2', data?.['mailingAddress.street']);
    setTextField('City_2', data?.['mailingAddress.city']);
    setTextField('State_2', data?.['mailingAddress.state']);
    setTextField('Zip Code_2', data?.['mailingAddress.zip']);
    setTextField('Apt_2', data?.['mailingAddress.apt']);

    // Set another person information
    setTextField('Name', data?.['anotherPerson.Name']);
    setTextField(
      'anotherPerson.phoneNumber',
      data?.['anotherPerson.phoneHome'],
    );
    selectRadioGroup('Phone type', data?.['anotherPerson.phoneType']);
    setTextField('Street_3', data?.['anotherPerson.street']);
    setTextField('Phone', data?.['anotherPerson.city']);
    setTextField('State_3', data?.['anotherPerson.state']);
    setTextField('Zip Code_3', data?.['anotherPerson.zip']);
    setTextField('Apt_3', data?.['anotherPerson.apt']);
    checkCheckbox(
      data?.['anotherPerson.permissions.ApplyMedicaidForMe']
        ? 'anotherPerson.permissions.ApplyMedicaidForMe'
        : undefined,
    );
    checkCheckbox(
      data?.['anotherPerson.permissions.disussMyCase']
        ? 'anotherPerson.permissions.disussMyCase'
        : undefined,
    );
    checkCheckbox(
      data?.['anotherPerson.permissions.getNoticesAndCorrespondence']
        ? 'anotherPerson.permissions.getNoticesAndCorrespondence'
        : undefined,
    );
    selectRadioGroup(
      'If you are blind or visually impaired and require information in an alternative format, check the type of mail you want to receive from us. Please return this form with your application',
      data?.blindNoticeType,
    );

    // Function to process family member info.
    const processFamilyMember = (index: number) => {
      const firstName = data?.[`familyInfo.${index}.legalName.firstName`];
      const middleName = data?.[`familyInfo.${index}.legalName.middleName`];
      const lastName = data?.[`familyInfo.${index}.legalName.lastName`];
      
      // Only include non-undefined values in the name
      const nameParts = [firstName, middleName, lastName].filter(Boolean);
      const fullName = nameParts.join(' ');
      
      setTextField(
        `familyInfo.${index}.name`,
        fullName
      );
      
      const birthFirstName = data?.[`familyInfo.${index}.birthName.firstName`];
      const birthMiddleName = data?.[`familyInfo.${index}.birthName.middleName`];
      const birthLastName = data?.[`familyInfo.${index}.birthName.lastName`];
      
      // Only include non-undefined values in the birth name
      const birthNameParts = [birthFirstName, birthMiddleName, birthLastName].filter(Boolean);
      const fullBirthName = birthNameParts.join(' ');
      
      setTextField(
        `familyInfo.${index}.birthName`,
        fullBirthName
      );
      setTextField(
        `familyInfo.${index}.stateOfBirth`,
        data?.[`familyInfo.${index}.stateOfBirth`],
      );
      setTextField(
        `familyInfo.${index}.cityOfBirth`,
        data?.[`familyInfo.${index}.cityOfBirth`],
      );
      setTextField(
        `familyInfo.${index}.countryOfBirth`,
        data?.[`familyInfo.${index}.countryOfBirth`],
      );
      setTextField(
        `familyInfo.${index}.dateOfBirth.month`,
        data?.[`familyInfo.${index}.dateOfBirth.month`],
      );
      setTextField(
        `familyInfo.${index}.dateOfBirth.day`,
        data?.[`familyInfo.${index}.dateOfBirth.day`],
      );
      setTextField(
        `familyInfo.${index}.dateOfBirth.year`,
        data?.[`familyInfo.${index}.dateOfBirth.year`],
      );

      selectRadioGroup(
        `familyInfo.${index}.sex`,
        data?.[`familyInfo.${index}.sex`],
      );
      selectRadioGroup(
        `familyInfo.${index}.isApplying`,
        data?.[`familyInfo.${index}.isApplying`],
      );
      setTextField(
        `familyInfo.${index}.genderIdentity`,
        data?.[`familyInfo.${index}.genderIdentity`],
      );
      selectRadioGroup(
        `familyInfo.${index}.isPregnant`,
        data?.[`familyInfo.${index}.isPregnant`],
      );
      setTextField(
        `familyInfo.${index}.pregnantDueDate.month`,
        data?.[`familyInfo.${index}.pregnantDueDate.month`],
      );
      setTextField(
        `familyInfo.${index}.pregnantDueDate.day`,
        data?.[`familyInfo.${index}.pregnantDueDate.day`],
      );
      setTextField(
        `familyInfo.${index}.pregnantDueDate.year`,
        data?.[`familyInfo.${index}.pregnantDueDate.year`],
      );
      selectRadioGroup(
        `familyInfo.${index}.isParent`,
        data?.[`familyInfo.${index}.isParent`],
      );
      if (index !== 0) {
        setTextField(
          `familyInfo.${index}.relationship`,
          data?.[`familyInfo.${index}.relationship`],
        );
      }

      selectRadioGroup(
        `familyInfo.${index}.publicHealthCoverage`,
        data?.[`familyInfo.${index}.publicHealthCoverage`],
      );
      setTextField(
        `familyInfo.${index}.publicHealthCoverageidNumber`,
        data?.[`familyInfo.${index}.publicHealthCoverageidNumber`],
      );
      setTextField(
        `familyInfo.${index}.ssn`,
        data?.[`familyInfo.${index}.ssn`],
      );
      selectRadioGroup(
        `familyInfo.${index}.usCitizenship`,
        data?.[`familyInfo.${index}.usCitizenship`],
      );
      setTextField(
        `familyInfo.${index}.usCitizenshipReceivedImmigrationStatusDate.month`,
        data?.[
          `familyInfo.${index}.usCitizenshipReceivedImmigrationStatusDate.month`
        ],
      );
      setTextField(
        `familyInfo.${index}.usCitizenshipReceivedImmigrationStatusDate.day`,
        data?.[
          `familyInfo.${index}.usCitizenshipReceivedImmigrationStatusDate.day`
        ],
      );
      setTextField(
        `familyInfo.${index}.usCitizenshipReceivedImmigrationStatusDate.year`,
        data?.[
          `familyInfo.${index}.usCitizenshipReceivedImmigrationStatusDate.year`
        ],
      );
      setTextField(
        `familyInfo.${index}.race`,
        data?.[`familyInfo.${index}.race`],
      );
      selectRadioGroup(
        `familyInfo.${index}.receivedAServiceFromIHS`,
        data?.[`familyInfo.${index}.receivedAServiceFromIHS`],
      );
    };

    // Process family members
    for (let i = 0; i < 5; i++) {
      processFamilyMember(i);
    }

    selectRadioGroup('householdVeteran', data.householdVeteran);
    setTextField('veteranName', data.veteranName);

    selectRadioGroup('selfEmploymentInfo', data.selfEmploymentInfo);
    selectRadioGroup('noEarningsFromWork', 'no');

    // Function to process earning from work info.
    const processEarningFromWork = (index: number) => {
      setTextField(
        `earningFromWork.${index}.name`,
        data?.[`earningFromWork.${index}.name`],
      );
      setTextField(
        `earningFromWork.${index}.tyoeOfWork`,
        data?.[`earningFromWork.${index}.tyoeOfWork`],
      );
      setTextField(
        `earningFromWork.${index}.howMuchEarned`,
        data?.[`earningFromWork.${index}.howMuchEarned`],
      );
      setTextField(
        `earningFromWork.${index}.howOftenPaid`,
        data?.[`earningFromWork.${index}.howOftenPaid`],
      );
    };

    // Process earning from work
    for (let i = 0; i < 3; i++) {
      processEarningFromWork(i);
    }

    checkCheckbox(data?.noUnearnedIncome ? 'noUnearnedIncome' : undefined);

    // Function to process unearned income info.
    const processUnearnedIncome = (index: number) => {
      setTextField(
        `unearnedIncome.${index}.name`,
        data?.[`unearnedIncome.${index}.name`],
      );
      setTextField(
        `unearnedIncome.${index}.tyoeOfWork`,
        data?.[`unearnedIncome.${index}.tyoeOfWork`],
      );
      setTextField(
        `unearnedIncome.${index}.howMuchEarned`,
        data?.[`unearnedIncome.${index}.howMuchEarned`],
      );
      setTextField(
        `unearnedIncome.${index}.howOftenPaid`,
        data?.[`unearnedIncome.${index}.howOftenPaid`],
      );
    };

    // Process Unearned Income
    for (let i = 0; i < 3; i++) {
      processUnearnedIncome(i);
    }

    checkCheckbox(data?.noContributions ? 'noContributions' : undefined);

    // Function to process contributions info.
    const processContributions = (index: number) => {
      setTextField(
        `contributions.${index}.name`,
        data?.[`contributions.${index}.name`],
      );
      setTextField(
        `contributions.${index}.tyoeOfWork`,
        data?.[`contributions.${index}.tyoeOfWork`],
      );
      setTextField(
        `contributions.${index}.howMuchEarned`,
        data?.[`contributions.${index}.howMuchEarned`],
      );
      setTextField(
        `contributions.${index}.howOftenPaid`,
        data?.[`contributions.${index}.howOftenPaid`],
      );
    };

    // Process Contributions
    for (let i = 0; i < 3; i++) {
      processContributions(i);
    }

    checkCheckbox(data?.noOtherIncome ? 'noOtherIncome' : undefined);

    // Function to process Other Income info.
    const processOtherIncome = (index: number) => {
      setTextField(
        `otherIncome.${index}.name`,
        data?.[`otherIncome.${index}.name`],
      );
      setTextField(
        `otherIncome.${index}.tyoeOfWork`,
        data?.[`otherIncome.${index}.tyoeOfWork`],
      );
      setTextField(
        `otherIncome.${index}.howMuchEarned`,
        data?.[`otherIncome.${index}.howMuchEarned`],
      );
      setTextField(
        `otherIncome.${index}.howOftenPaid`,
        data?.[`otherIncome.${index}.howOftenPaid`],
      );
    };

    // Process Other Income
    for (let i = 0; i < 3; i++) {
      processOtherIncome(i);
    }

    setTextField('applingAdulthaveNoIncome', data?.applingAdulthaveNoIncome);
    setTextField('explainHowLiving', data?.explainHowLiving);
    selectRadioGroup(
      'applierChangeJob.changeJobin3Month',
      data?.['applierChangeJob.changeJobin3Month'],
    );
    setTextField(
      'applierChangeJob.lastJobDate.month',
      data?.['applierChangeJob.lastJobDate.month'],
    );
    setTextField(
      'applierChangeJob.lastJobDate.day',
      data?.['applierChangeJob.lastJobDate.day'],
    );
    setTextField(
      'applierChangeJob.lastJobDate.year',
      data?.['applierChangeJob.lastJobDate.year'],
    );
    setTextField(
      'applierChangeJob.nameofEmployer',
      data?.['applierChangeJob.nameofEmployer'],
    );

    selectRadioGroup(
      'applierStudent.student',
      data?.['applierStudent.student'],
    );
    selectRadioGroup(
      'applierStudent.studentType',
      data?.['applierStudent.studentType'],
    );
    setTextField(
      'applierStudent.nameOfStudent',
      data?.['applierStudent.nameOfStudent'],
    );
    selectRadioGroup('payForChildCare', data.payForChildCare);

    const processChildCare = (index: number) => {
      setTextField(
        `childCare.${index}.childName`,
        data?.[`childCare.${index}.childName`],
      );
      setTextField(
        `childCare.${index}.howMuchPaid`,
        data?.[`childCare.${index}.howMuchPaid`],
      );
      setTextField(
        `childCare.${index}.howOftenPaid`,
        data?.[`childCare.${index}.howOftenPaid`],
      );
    };

    // Process payForChildCare
    for (let i = 0; i < 3; i++) {
      processChildCare(i);
    }

    selectRadioGroup(
      'familyPlanningServiceOnly',
      data?.familyPlanningServiceOnly,
    );
    selectRadioGroup(
      'isPayCourtOrdered.payCourtOrdered',
      data?.['isPayCourtOrdered.payCourtOrdered'],
    );
    setTextField(
      'isPayCourtOrdered.payCourtOrderedAmount',
      data?.['isPayCourtOrdered.payCourtOrderedAmount'],
    );
    setTextField(
      'isPayCourtOrdered.whoPayCourtOrdered',
      data?.['isPayCourtOrdered.whoPayCourtOrdered'],
    );

    selectRadioGroup('applyingHavingMedicare', data?.applyingHavingMedicare);

    setTextField(
      'applyingHavingCommercialInsurance.nameOfInsured',
      data?.['applyingHavingCommercialInsurance.nameOfInsured'],
    );
    setTextField(
      'applyingHavingCommercialInsurance.personCovered',
      data?.['applyingHavingCommercialInsurance.personCovered'],
    );
    setTextField(
      'applyingHavingCommercialInsurance.costOfPolicy',
      data?.['applyingHavingCommercialInsurance.costOfPolicy'],
    );
    setTextField(
      'applyingHavingCommercialInsurance.endOfCoverage.month',
      data?.['applyingHavingCommercialInsurance.endOfCoverage.month'],
    );
    setTextField(
      'applyingHavingCommercialInsurance.endOfCoverage.day',
      data?.['applyingHavingCommercialInsurance.endOfCoverage.day'],
    );
    setTextField(
      'applyingHavingCommercialInsurance.endOfCoverage.year',
      data?.['applyingHavingCommercialInsurance.endOfCoverage.year'],
    );
    selectRadioGroup('currentJobInsurance', data.currentJobInsurance);
    setTextField('monthlyHousingPayment', data?.['monthlyHousingPayment']);
    setTextField(
      'payForWater.payForWaterAmount',
      data?.['payForWater.payForWaterAmount'],
    );
    selectRadioGroup(
      'payForWater.howOftenPaid',
      data?.['payForWater.howOftenPaid'],
    );
    selectRadioGroup(
      'freeHousingAsPartofYourPay',
      data?.freeHousingAsPartofYourPay,
    );
    selectRadioGroup('nursingHomeCare', data?.nursingHomeCare);
    selectRadioGroup(
      'blindOrDisabledOrChronicallyIll',
      data?.blindOrDisabledOrChronicallyIll,
    );

    selectRadioGroup(
      'prescriptionBill3Month.prescriptionBill',
      data?.['prescriptionBill3Month.prescriptionBill'],
    );
    setTextField(
      'prescriptionBill3Month.name',
      data?.['prescriptionBill3Month.name'],
    );
    setTextField(
      'prescriptionBill3Month.whichMonth',
      data?.['prescriptionBill3Month.whichMonth'],
    );

    selectRadioGroup('prescriptionBillOlder', data?.prescriptionBillOlder);
    selectRadioGroup(
      'moveIntoThisCounty.move',
      data?.['moveIntoThisCounty.move'],
    );
    setTextField('moveIntoThisCounty.who', data?.['moveIntoThisCounty.who']);
    setTextField(
      'moveIntoThisCounty.whichState',
      data?.['moveIntoThisCounty.whichState'],
    );
    setTextField(
      'moveIntoThisCounty.whichCounty',
      data?.['moveIntoThisCounty.whichCounty'],
    );

    selectRadioGroup(
      'pendingLawSuit.pending',
      data?.['pendingLawSuit.pending'],
    );
    setTextField('pendingLawSuit.who', data?.['pendingLawSuit.who']);
    selectRadioGroup(
      'workersCompensationCase.workersCompensation',
      data?.['workersCompensationCase.workersCompensation'],
    );
    setTextField(
      'workersCompensationCase.who',
      data?.['workersCompensationCase.who'],
    );
    selectRadioGroup('deceased.deceased', data?.['deceased.deceased']);
    setTextField('deceased.who', data?.['deceased.who']);

    selectRadioGroup(
      'parentLiveOutside.parentLiveOutside',
      data?.['parentLiveOutside.parentLiveOutside'],
    );
    checkCheckbox(
      data?.['parentLiveOutside.fearOfHarm']
        ? 'parentLiveOutside.fearOfHarm'
        : undefined,
    );
    setTextField(
      'parentLiveOutside.childName1',
      data?.['parentLiveOutside.childName1'],
    );
    setTextField(
      'parentLiveOutside.childName2',
      data?.['parentLiveOutside.childName2'],
    );
    setTextField(
      'parentLiveOutside.nameOfParent1',
      data?.['parentLiveOutside.nameOfParent1'],
    );
    setTextField(
      'parentLiveOutside.nameOfParent2',
      data?.['parentLiveOutside.nameOfParent2'],
    );
    setTextField(
      'parentLiveOutside.dateOfBirth1.month',
      data?.['parentLiveOutside.dateOfBirth1.month'],
    );
    setTextField(
      'parentLiveOutside.dateOfBirth1.day',
      data?.['parentLiveOutside.dateOfBirth1.day'],
    );
    setTextField(
      'parentLiveOutside.dateOfBirth1.year',
      data?.['parentLiveOutside.dateOfBirth1.year'],
    );
    setTextField(
      'parentLiveOutside.dateOfBirth2.month',
      data?.['parentLiveOutside.dateOfBirth2.month'],
    );
    setTextField(
      'parentLiveOutside.dateOfBirth2.day',
      data?.['parentLiveOutside.dateOfBirth2.day'],
    );
    setTextField(
      'parentLiveOutside.dateOfBirth2.year',
      data?.['parentLiveOutside.dateOfBirth2.year'],
    );
    setTextField(
      'parentLiveOutside.street1',
      data?.['parentLiveOutside.street1'],
    );
    setTextField(
      'parentLiveOutside.street2',
      data?.['parentLiveOutside.street2'],
    );
    setTextField('parentLiveOutside.city1', data?.['parentLiveOutside.city1']);
    setTextField('parentLiveOutside.city2', data?.['parentLiveOutside.city2']);
    setTextField('parentLiveOutside.ssn1', data?.['parentLiveOutside.ssn1']);
    setTextField('parentLiveOutside.ssn2', data?.['parentLiveOutside.ssn2']);

    selectRadioGroup(
      'marriedLivesOutside.marriedLivesOutside',
      data?.['marriedLivesOutside.marriedLivesOutside'],
    );
    checkCheckbox(
      data?.['marriedLivesOutside.fearOfHarm']
        ? 'marriedLivesOutside.fearOfHarm'
        : undefined,
    );
    setTextField(
      'marriedLivesOutside.applyingPerson',
      data?.['marriedLivesOutside.applyingPerson'],
    );
    setTextField(
      'marriedLivesOutside.spouseName',
      data?.['marriedLivesOutside.spouseName'],
    );
    setTextField(
      'marriedLivesOutside.dateOfBirth.month',
      data?.['marriedLivesOutside.dateOfBirth.month'],
    );
    setTextField(
      'marriedLivesOutside.dateOfBirth.day',
      data?.['marriedLivesOutside.dateOfBirth.day'],
    );
    setTextField(
      'marriedLivesOutside.dateOfBirth.year',
      data?.['marriedLivesOutside.dateOfBirth.year'],
    );
    setTextField(
      'marriedLivesOutside.street',
      data?.['marriedLivesOutside.street'],
    );
    setTextField(
      'marriedLivesOutside.city',
      data?.['marriedLivesOutside.city'],
    );
    setTextField('marriedLivesOutside.ssn', data?.['marriedLivesOutside.ssn']);
    checkCheckbox(
      data?.doWanttoJoinHealthPlan ? 'doWanttoJoinHealthPlan' : undefined,
    );

    // Function to process health Plan info.
    const processHealthPlan = (index: number) => {
      setTextField(
        `healthPlan.${index}.lastName`,
        data?.[`healthPlan.${index}.lastName`],
      );
      setTextField(
        `healthPlan.${index}.firstName`,
        data?.[`healthPlan.${index}.firstName`],
      );
      setTextField(
        `healthPlan.${index}.dob`,
        data?.[`healthPlan.${index}.dob`],
      );
      setTextField(
        `healthPlan.${index}.ssn`,
        data?.[`healthPlan.${index}.ssn`],
      );
      setTextField(
        `healthPlan.${index}.nameOfHealthPlan`,
        data?.[`healthPlan.${index}.nameOfHealthPlan`],
      );
      setTextField(
        `healthPlan.${index}.preferred.preferredDoctorOrClinic`,
        data?.[`healthPlan.${index}.preferred.preferredDoctorOrClinic`],
      );
      checkCheckbox(
        data?.[`healthPlan.${index}.preferred.currentProvider`]
          ? `healthPlan.${index}.preferred.currentProvider`
          : undefined,
      );
      setTextField(
        `healthPlan.${index}.obGyn`,
        data?.[`healthPlan.${index}.obGyn`],
      );
    };

    // Process Health Plan
    for (let i = 0; i < 5; i++) {
      processHealthPlan(i);
    }

    // Save the pdf to the file system
    const filledPdfBytes = await pdfDoc.save();
    const filledPdfBuffer = Buffer.from(filledPdfBytes);
    const values = Object.values(data);
    const csvString = values.join(',');
    await formImageFileUpload.createBatchFolder(data, file, csvString, filledPdfBuffer);

    console.log('PDF processing complete!');
  } catch (error) {
    console.log(error);
    throw new CustomError(String(error), 400);
  }

  // calculate the number of image records file uploaded
  const noOfImageRecords = file.length;

  console.log(`noOfImageRecords: ${noOfImageRecords}`);
  console.log(file);

  return { data, file };
};

export const formServices = {
  takeAndProcessData,
};
