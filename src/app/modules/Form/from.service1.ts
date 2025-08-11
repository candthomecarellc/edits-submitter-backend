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
  const pdfBytes = fs.readFileSync('./fillable.pdf');
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
    // setTextField('applicantName', data.applicantName);
    // setTextField('applicationDate', data.applicationDate);

    // Check citizenship and identity checkboxes
    // checkCheckbox(data.uscitizenshiporDOB);
    // checkCheckbox(data.usCitizenship);
    // checkCheckbox(data.identityDocument);
    // checkCheckbox(data.identityDocumentExtra);
    // checkCheckbox(data.ImmigrationstatesIdentity);
    // checkCheckbox(data.ImmigrationStatus);
    // checkCheckbox(data.dobIdentity);
    // checkCheckbox(data.homeAddressDocument);

    // Check income checkboxes
    // checkCheckbox(data.wagesAndSalary);
    // checkCheckbox(data.selfEmployment);
    // checkCheckbox(data.unemploymentBenefits);
    // checkCheckbox(data.privatePensionsAnnuities);
    // checkCheckbox(data.socialSecurity);
    // checkCheckbox(data.workersCompensation);
    // checkCheckbox(data.childSupportAlimony);
    // checkCheckbox(data.veteransBenefits);
    // checkCheckbox(data.militaryPay);
    // checkCheckbox(data.incomeFromRent);
    // checkCheckbox(data.interestDividendsRoyalties);
    // checkCheckbox(data.careForChildrenorAdults);

    // Check additional checkboxes
    // checkCheckbox(data.proofOfstudentStatus);

    // Set personal information
    setTextField('applicant.first', data?.personalInfo?.firstName);
    setTextField('applicant.middle', data?.personalInfo?.middleName);
    setTextField('applicant.last', data?.personalInfo?.lastName);
    setTextField(
      'primaryPhone.number',
      data?.personalInfo?.primaryPhoneNumber,
    );
    // selectRadioGroup(
    //   'Primary Phone Type',
    //   data?.personalInfo.primaryPhoneType,
    // );
    checkCheckbox(
      data?.personalInfo?.primaryPhoneType 
      ? 'primaryPhone.type.'+data?.personalInfo?.primaryPhoneType 
      : undefined
    );
    setTextField(
      'anotherPhone.number',
      data?.personalInfo?.secondaryPhoneNumber,
    );
    // selectRadioGroup(
    //   'Another Phone Type',
    //   data?.personalInfo.secondaryPhoneType,
    // );
    checkCheckbox(
      data?.personalInfo?.secondaryPhoneType 
      ? 'anotherPhone.type.'+data?.personalInfo?.secondaryPhoneType 
      : undefined
    );
    setTextField(
      'languageSpoken',
      data?.personalInfo?.languageSpeak,
    );
    setTextField(
      'languageRead',
      data?.personalInfo?.languageRead,
    );
    checkCheckbox(data?.homeLess ? 'homeless' : undefined); // only check if truthy

    // Set address information
    setTextField('residence.street', data?.homeAddress?.street);
    setTextField('residence.city', data?.homeAddress?.city);
    setTextField('residence.state', data?.homeAddress?.state);
    setTextField('residence.zip', data?.homeAddress?.zip);
    setTextField('residence.county', data?.homeAddress?.county);
    setTextField('residence.apartment', data?.homeAddress?.apt);

    setTextField('mailingAddress.street', data?.mailingAddress?.street);
    setTextField('mailingAddress.city', data?.mailingAddress?.city);
    setTextField('mailingAddress.state', data?.mailingAddress?.state);
    setTextField('mailingAddress.zip', data?.mailingAddress?.zip);
    setTextField('mailingAddress.apartment', data?.mailingAddress?.apt);

    // Set another person information
    setTextField('mailingAddress2.associateName', data?.anotherPerson?.Name);
    setTextField(
      'mailingAddress2.phoneNumber',
      data?.anotherPerson?.phoneHome,
    );
    // selectRadioGroup('Phone type', data?.anotherPerson.phoneType);
    checkCheckbox(
      data?.anotherPerson?.phoneType 
      ? 'mailingAddress2.phoneType.'+data?.anotherPerson?.phoneType 
      : undefined
    );
    setTextField('mailingAddress2.street', data?.anotherPerson?.street);
    setTextField('mailingAddress2.city', data?.anotherPerson?.city);
    setTextField('mailingAddress2.state', data?.anotherPerson?.state);
    setTextField('mailingAddress2.zip', data?.anotherPerson?.zip);
    setTextField('mailingAddress2.apartment', data?.anotherPerson?.apt);
    checkCheckbox(
      data?.anotherPerson?.permissions?.ApplyMedicaidForMe
        ? 'applyOrRenew'
        : undefined,
    );
    checkCheckbox(
      data?.anotherPerson?.permissions?.disussMyCase
        ? 'discuss'
        : undefined,
    );
    checkCheckbox(
      data?.anotherPerson?.permissions?.getNoticesAndCorrespondence
        ? 'getNotice'
        : undefined,
    );
    // selectRadioGroup(
    //   'If you are blind or visually impaired and require information in an alternative format, check the type of mail you want to receive from us. Please return this form with your application',
    //   data?.blindNoticeType,
    // );

    // Function to process family member info.
    const processFamilyMember = (index: number) => {
      const first = data?.familyInfo[index]?.legalName?.firstName;
      const middle = data?.familyInfo[index]?.legalName?.middleName;
      const last = data?.familyInfo[index]?.legalName?.lastName;
      
      // Only include non-undefined values in the name
      const nameParts = [first, middle, last].filter(Boolean);
      const fullName = nameParts.join(' ');
      
      setTextField(
        `householdMember[${index}].legalName`,
        fullName
      );
      
      const birthFirstName = data?.familyInfo[index]?.birthName?.firstName;
      const birthMiddleName = data?.familyInfo[index]?.birthName?.middleName;
      const birthLastName = data?.familyInfo[index]?.birthName?.lastName;
      
      // Only include non-undefined values in the birth name
      const birthNameParts = [birthFirstName, birthMiddleName, birthLastName].filter(Boolean);
      const fullBirthName = birthNameParts.join(' ');
      
      setTextField(
        `householdMember[${index}].otherName`,
        fullBirthName
      );
      setTextField(
        `householdMember[${index}].birthPlace.state`,
        data?.familyInfo[index]?.stateOfBirth,
      );
      setTextField(
        `householdMember[${index}].birthPlace.city`,
        data?.familyInfo[index]?.cityOfBirth,
      );
      setTextField(
        `householdMember[${index}].birthPlace.country`,
        data?.familyInfo[index]?.countryOfBirth,
      );
      // setTextField(
      //   `householdMember[${index}].motherName`,
      //   data?.familyInfo[index]?.motherName,
      // );
      setTextField(
        `householdMember[${index}].dateOfBirth`,
        data?.familyInfo[index]?.dateOfBirth?.month + '/' + data?.familyInfo[index]?.dateOfBirth?.day + '/' + data?.familyInfo[index]?.dateOfBirth?.year,
      );
      // setTextField(
      //   `familyInfo[index]?.dateOfBirth.day`,
      //   data?.familyInfo[index]?.dateOfBirth.day,
      // );
      // setTextField(
      //   `familyInfo[index]?.dateOfBirth.year`,
      //   data?.familyInfo[index]?.dateOfBirth.year,
      // );

      // selectRadioGroup(
      //   `familyInfo[index]?.sex`,
      //   data?.familyInfo[index]?.sex,
      // );
      checkCheckbox(
        data?.familyInfo[index]?.sex
        ? `householdMember[${index}].sex.${data?.familyInfo[index]?.sex}`
        : undefined
      );
      // selectRadioGroup(
      //   `familyInfo[index]?.isApplying`,
      //   data?.familyInfo[index]?.isApplying,
      // );
      checkCheckbox(
        data?.familyInfo[index]?.isApplying
        ? `householdMember[${index}].applyingForHealthInsurance.${data?.familyInfo[index]?.isApplying}`
        : undefined
      );
      // setTextField(
      //   `familyInfo[index]?.genderIdentity`,
      //   data?.familyInfo[index]?.genderIdentity,
      // );
      // selectRadioGroup(
      //   `familyInfo[index]?.isPregnant`,
      //   data?.familyInfo[index]?.isPregnant,
      // );
      checkCheckbox(
        data?.familyInfo[index]?.isPregnant
        ? `householdMember[${index}].pregnant.${data?.familyInfo[index]?.isPregnant}`
        : undefined
      );
      setTextField(
        `householdMember[${index}].pregnantDueDate`,
        data?.familyInfo[index]?.pregnantDueDate?.month + '/' + data?.familyInfo[index]?.pregnantDueDate?.day + '/' + data?.familyInfo[index]?.pregnantDueDate?.year,
      );
      // setTextField(
      //   `familyInfo[index]?.pregnantDueDate.day`,
      //   data?.familyInfo[index]?.pregnantDueDate.day,
      // );
      // setTextField(
      //   `familyInfo[index]?.pregnantDueDate.year`,
      //   data?.familyInfo[index]?.pregnantDueDate.year,
      // );
      // selectRadioGroup(
      //   `familyInfo[index]?.isParent`,
      //   data?.familyInfo[index]?.isParent,
      // );
      checkCheckbox(
        data?.familyInfo[index]?.isParent
        ? `householdMember[${index}].responsibleAdult.${data?.familyInfo[index]?.isParent}`
        : undefined
      );
      if (index !== 0) {
        setTextField(
          `householdMember[${index}].relationshipToApplicant`,
          data?.familyInfo[index]?.relationship,
        );
      }

      // selectRadioGroup(
      //   `familyInfo[index]?.publicHealthCoverage`,
      //   data?.familyInfo[index]?.publicHealthCoverage,
      // );
      // setTextField(
      //   `familyInfo[index]?.publicHealthCoverageidNumber`,
      //   data?.familyInfo[index]?.publicHealthCoverageidNumber,
      // );
      setTextField(
        `householdMember[${index}].ssn`,
        data?.familyInfo[index]?.ssn,
      );
      // selectRadioGroup(
      //   `familyInfo[index]?.usCitizenship`,
      //   data?.familyInfo[index]?.usCitizenship,
      // );
      checkCheckbox(
        data?.familyInfo[index]?.usCitizenship
        ? `householdMember[${index}].aci.${data?.familyInfo[index]?.usCitizenship}`
        : undefined
      );
      setTextField(
        `householdMember[${index}].alienDateOfEntry.month`,
        data?.familyInfo[index]?.usCitizenshipReceivedImmigrationStatusDate?.month?.toString(),
      );
      setTextField(
        `householdMember[${index}].alienDateOfEntry.day`,
        data?.familyInfo[index]?.usCitizenshipReceivedImmigrationStatusDate?.day?.toString(),
      );
      setTextField(
        `householdMember[${index}].alienDateOfEntry.year`,
        data?.familyInfo[index]?.usCitizenshipReceivedImmigrationStatusDate?.year?.toString(),
      );
      setTextField(
        `householdMember[${index}].ethnicity`,
        data?.familyInfo[index]?.race,
      );
      // selectRadioGroup(
      //   `familyInfo[index]?.receivedAServiceFromIHS`,
      //   data?.familyInfo[index]?.receivedAServiceFromIHS,
      // );
    };

    // Process family members
    for (let i = 0; i < 2; i++) {
      processFamilyMember(i);
    }

    // selectRadioGroup('householdVeteran', data.householdVeteran);
      checkCheckbox(
        data?.householdVeteran
        ? `veteran.${data?.householdVeteran}`
        : undefined
      );
    setTextField('veteran.name', data?.veteranName);

    checkCheckbox(data?.selfEmploymentInfo ? 'selfEmployed' : undefined);
    // checkCheckbox(data.noEarningsFromWork ? 'noEarnedIncome' : undefined);

    // Function to process earning from work info.
    const processEarningFromWork = (index: number) => {
      setTextField(
        `earnedIncome[${index}].name`,
        data?.earningFromWork[index]?.name,
      );
      setTextField(
        `earnedIncome[${index}].employerName`,
        data?.earningFromWork[index]?.tyoeOfWork,
      );
      setTextField(
        `earnedIncome[${index}].amount`,
        data?.earningFromWork[index]?.howMuchEarned,
      );
      setTextField(
        `earnedIncome[${index}].period`,
        data?.earningFromWork[index]?.howOftenPaid,
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
        `unearnedIncome[${index}].name`,
        data?.unearnedIncome[index]?.name,
      );
      setTextField(
        `unearnedIncome[${index}].source`,
        data?.unearnedIncome[index]?.tyoeOfWork,
      );
      setTextField(
        `unearnedIncome[${index}].amount`,
        data?.unearnedIncome[index]?.howMuchEarned,
      );
      setTextField(
        `unearnedIncome[${index}].period`,
        data?.unearnedIncome[index]?.howOftenPaid,
      );
    };

    // Process Unearned Income
    for (let i = 0; i < 3; i++) {
      processUnearnedIncome(i);
    }

    checkCheckbox(data?.noContributions ? 'noContribution' : undefined);

    // Function to process contributions info.
    const processContributions = (index: number) => {
      setTextField(
        `contribution[${index}].name`,
        data?.contributions[index]?.name,
      );
      setTextField(
        `contribution[${index}].source`,
        data?.contributions[index]?.tyoeOfWork,
      );
      setTextField(
        `contribution[${index}].amount`,
        data?.contributions[index]?.howMuchEarned,
      );
      setTextField(
        `contribution[${index}].period`,
        data?.contributions[index]?.howOftenPaid,
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
        `otherIncome[${index}].name`,
        data?.otherIncome[index]?.name,
      );
      setTextField(
        `otherIncome[${index}].source`,
        data?.otherIncome[index]?.tyoeOfWork,
      );
      setTextField(
        `otherIncome[${index}].amount`,
        data?.otherIncome[index]?.howMuchEarned,
      );
      setTextField(
        `otherIncome[${index}].period`,
        data?.otherIncome[index]?.howOftenPaid,
      );
    };

    // Process Other Income
    for (let i = 0; i < 3; i++) {
      processOtherIncome(i);
    }

    checkCheckbox(data?.applingAdulthaveNoIncome ? 'noIncome.true' : 'noIncome.false');
    setTextField('noIncomeName', data?.applingAdulthaveNoIncome);
    setTextField('wayOfLiving', data?.explainHowLiving);
    // selectRadioGroup(
    //   'applierChangeJob.changeJobin3Month',
    //   data?.applierChangeJob.changeJobin3Month,
    // );
    checkCheckbox(
      data?.applierChangeJob?.changeJobin3Month 
      ? `changedJob.${data?.applierChangeJob?.changeJobin3Month}` 
      : undefined
    );
    setTextField(
      'lastJobDate.month',
      data?.applierChangeJob?.lastJobDate?.month?.toString(),
    );
    setTextField(
      'lastJobDate.day',
      data?.applierChangeJob?.lastJobDate?.day?.toString(),
    );
    setTextField(
      'lastJobDate.year',
      data?.applierChangeJob?.lastJobDate?.year?.toString(),
    );
    setTextField(
      'lastJobEmployerName',
      data?.applierChangeJob?.nameofEmployer,
    );

    // selectRadioGroup(
    //   'applierStudent.student',
    //   data?.applierStudent.student,
    // );
    checkCheckbox(
      data?.applierStudent?.student 
      ? `student.${data?.applierStudent?.student}` 
      : undefined
    );
    // selectRadioGroup(
    //   'applierStudent.studentType',
    //   data?.applierStudent.studentType,
    // );
    // checkCheckbox(
    //   data?.applierStudent?.studentType 
    //   ? `studentType.${data?.applierStudent?.studentType}` 
    //   : undefined
    // );
    setTextField(
      'studentName',
      data?.applierStudent?.nameOfStudent,
    );
    checkCheckbox(data?.payForChildCare ? 'childCare.true' : 'childCare.false');

    const processChildCare = (index: number) => {
      setTextField(
        `householdExpense.childCare[${index}].name`,
        data?.childCare[index]?.childName,
      );
      setTextField(
        `householdExpense.childCare[${index}].amount`,
        data?.childCare[index]?.howMuchPaid,
      );
      setTextField(
        `householdExpense.childCare[${index}].period`,
        data?.childCare[index]?.howOftenPaid,
      );
    };

    // Process payForChildCare
    for (let i = 0; i < 3; i++) {
      processChildCare(i);
    }

    checkCheckbox(
      data?.familyPlanningServiceOnly
      ? 'familyPlanning.true'
      : 'familyPlanning.false'
    );
    // selectRadioGroup(
    //   'isPayCourtOrdered.payCourtOrdered',
    //   data?.isPayCourtOrdered.payCourtOrdered,
    // );
    // setTextField(
    //   'isPayCourtOrdered.payCourtOrderedAmount',
    //   data?.isPayCourtOrdered.payCourtOrderedAmount,
    // );
    // setTextField(
    //   'isPayCourtOrdered.whoPayCourtOrdered',
    //   data?.isPayCourtOrdered.whoPayCourtOrdered,
    // );

    checkCheckbox(
      data?.applyingHavingMedicare
      ? 'householdMember.medicare.true'
      : 'householdMember.medicare.false'
    );
    // checkCheckbox(
    //   data?.applyingHavingCommercialInsurance
    //   ? 'householdMember.commercialInsurance.true'
    //   : 'householdMember.commercialInsurance.false'
    // );

    setTextField(
      'commercialInsurance.name',
      data?.applyingHavingCommercialInsurance?.nameOfInsured,
    );
    setTextField(
      'householdMember.healthInsurance.personsCovered',
      data?.applyingHavingCommercialInsurance?.personCovered,
    );
    setTextField(
      'householdMember.healthInsurance.costOfPolicy',
      data?.applyingHavingCommercialInsurance?.costOfPolicy,
    );
    setTextField(
      'householdMember.healthInsurance.endDateOfCoverage.month',
      data?.applyingHavingCommercialInsurance?.endOfCoverage?.month?.toString(),
    );
    setTextField(
      'householdMember.healthInsurance.endDateOfCoverage.day',
      data?.applyingHavingCommercialInsurance?.endOfCoverage?.day?.toString(),
    );
    setTextField(
      'householdMember.healthInsurance.endDateOfCoverage.year',
      data?.applyingHavingCommercialInsurance?.endOfCoverage?.year?.toString(),
    );
    checkCheckbox(
      data?.currentJobInsurance
      ? 'householdMember.jobHealthInsurance.true'
      : 'householdMember.jobHealthInsurance.false'
    );
    setTextField('householdExpense.shelterAmount', data?.monthlyHousingPayment);
    setTextField(
      'householdExpense.waterCostAmount',
      data?.payForWater?.payForWaterAmount,
    );
    checkCheckbox(
      data?.payForWater?.howOftenPaid
      ? `householdExpense.waterCostPeriod.${data?.payForWater?.howOftenPaid}`
      : undefined
    );
    checkCheckbox(
      data?.freeHousingAsPartofYourPay
      ? 'householdExpense.freeHousing.true'
      : 'householdExpense.freeHousing.false'
    );
    checkCheckbox(data?.nursingHomeCare 
      ? 'householdExpense.nursingHome.true'
      : 'householdExpense.nursingHome.false'
    );
    checkCheckbox(
      data?.blindOrDisabledOrChronicallyIll
      ? 'householdExpense.blindDisableChronicallyIll.true'
      : 'householdExpense.blindDisableChronicallyIll.false'
    );

    checkCheckbox(
      data?.prescriptionBill3Month?.prescriptionBill
      ? 'householdMember.recentMedicalBill.true'
      : 'householdMember.recentMedicalBill.false'
    );
    setTextField(
      'recentMedicalBill.name',
      data?.prescriptionBill3Month?.name,
    );
    setTextField(
      'householdMember.healthInsurance.monthBilled',
      data?.prescriptionBill3Month?.whichMonth,
    );

    checkCheckbox(
      data?.prescriptionBillOlder
      ? 'householdMember.oldMedicalBill.true'
      : 'householdMember.oldMedicalBill.false'
    );
    checkCheckbox(
      data?.moveIntoThisCounty?.move
      ? 'householdMember.recentMoveIn.true'
      : 'householdMember.recentMoveIn.false'
    );
    setTextField('recentMoveIn.name', data?.moveIntoThisCounty?.who);
    setTextField(
      'householdMember.healthInsurance.moveInState',
      data?.moveIntoThisCounty?.whichState,
    );
    setTextField(
      'householdMember.healthInsurance.moveInCounty',
      data?.moveIntoThisCounty?.whichCounty,
    );

    checkCheckbox(
      data?.pendingLawSuit?.pending
      ? 'householdMember.pendingLawsuit.true'
      : 'householdMember.pendingLawsuit.false'
    );
    setTextField('pendingLawsuit.name', data?.pendingLawSuit?.who);
    checkCheckbox(
      data?.workersCompensationCase?.workersCompensation
      ? 'householdMember.injured.true'
      : 'householdMember.injured.false'
    );
    setTextField(
      'injured.name',
      data?.workersCompensationCase?.who,
    );
    checkCheckbox(data?.deceased?.deceased ? 'deceased.true' : 'deceased.false');
    setTextField('deceased.name', data?.deceased?.who);

    checkCheckbox(
      data?.parentLiveOutside?.parentLiveOutside
      ? 'householdMember.parentLivingOutside.true'
      : 'householdMember.parentLivingOutside.false'
    );
    checkCheckbox(
      data?.parentLiveOutside?.fearOfHarm
        ? 'householdMember.parentPrivacy'
        : undefined,
    );
    setTextField(
      'parentLivingOutside[0].name',
      data?.parentLiveOutside?.childName1,
    );
    setTextField(
      'parentLivingOutside[1].name',
      data?.parentLiveOutside?.childName2,
    );
    setTextField(
      'householdMember[0].parentOutside.name',
      data?.parentLiveOutside?.nameOfParent1,
    );
    setTextField(
      'householdMember[1].parentOutside.name',
      data?.parentLiveOutside?.nameOfParent2,
    );
    setTextField(
      'householdMember[0].parentOutside.dob.month',
      data?.parentLiveOutside?.dateOfBirth1?.month?.toString(),
    );
    setTextField(
      'householdMember[0].parentOutside.dob.day',
      data?.parentLiveOutside?.dateOfBirth1?.day?.toString(),
    );
    setTextField(
      'householdMember[0].parentOutside.dob.year',
      data?.parentLiveOutside?.dateOfBirth1?.year?.toString(),
    );
    setTextField(
      'householdMember[1].parentOutside.dob.month',
      data?.parentLiveOutside?.dateOfBirth2?.month?.toString(),
    );
    setTextField(
      'householdMember[1].parentOutside.dob.day',
      data?.parentLiveOutside?.dateOfBirth2?.day?.toString(),
    );
    setTextField(
      'householdMember[1].parentOutside.dob.year',
      data?.parentLiveOutside?.dateOfBirth2?.year?.toString(),
    );
    setTextField(
      'householdMember[0].parentOutside.street',
      data?.parentLiveOutside?.street1,
    );
    setTextField(
      'householdMember[1].parentOutside.street',
      data?.parentLiveOutside?.street2,
    );
    setTextField('householdMember[0].parentOutside.city', data?.parentLiveOutside?.city1);
    setTextField('householdMember[1].parentOutside.city', data?.parentLiveOutside?.city2);
    setTextField('householdMember[0].parentOutside.ssn', data?.parentLiveOutside?.ssn1);
    setTextField('householdMember[1].parentOutside.ssn', data?.parentLiveOutside?.ssn2);

    checkCheckbox(
      data?.marriedLivesOutside?.marriedLivesOutside
      ? 'householdMember.spouseLivingOutside.true'
      : 'householdMember.spouseLivingOutside.false'
    );
    checkCheckbox(
      data?.marriedLivesOutside?.fearOfHarm
        ? 'householdMember.spousePrivacy'
        : undefined,
    );
    setTextField(
      'spouseLivingOutside.name',
      data?.marriedLivesOutside?.applyingPerson,
    );
    setTextField(
      'householdMember.spouseOutside.name',
      data?.marriedLivesOutside?.spouseName,
    );
    setTextField(
      'householdMember.spouseOutside.dob.month',
      data?.marriedLivesOutside?.dateOfBirth?.month?.toString(),
    );
    setTextField(
      'householdMember.spouseOutside.dob.day',
      data?.marriedLivesOutside?.dateOfBirth?.day?.toString(),
    );
    setTextField(
      'householdMember.spouseOutside.dob.year',
      data?.marriedLivesOutside?.dateOfBirth?.year?.toString(),
    );
    setTextField(
      'householdMember.spouseOutside.street',
      data?.marriedLivesOutside?.street,
    );
    setTextField(
      'householdMember.spouseOutside.city',
      data?.marriedLivesOutside?.city,
    );
    setTextField('householdMember.spouseOutside.ssn', data?.marriedLivesOutside?.ssn);
    checkCheckbox(
      data?.doWanttoJoinHealthPlan ? 'householdMember.healthPlan' : undefined,
    );

    // Function to process health Plan info.
    const processHealthPlan = (index: number) => {
      setTextField(
        `member[${index}].legalName.last`,
        data?.healthPlan[index]?.lastName,
      );
      setTextField(
        `member[${index}].legalName.first`,
        data?.healthPlan[index]?.firstName,
      );
      setTextField(
        `member[${index}].dateOfBirth`,
        data?.healthPlan[index]?.dob,
      );
      setTextField(
        `member[${index}].ssn`,
        data?.healthPlan[index]?.ssn,
      );
      setTextField(
        `member[${index}].healthInsurance.healthPlan.healthPlanName`,
        data?.healthPlan[index]?.nameOfHealthPlan,
      );
      setTextField(
        `member[${index}].healthInsurance.healthPlan.preferredDoctor`,
        data?.healthPlan[index]?.preferred?.preferredDoctorOrClinic,
      );
      checkCheckbox(
        data?.healthPlan[index]?.preferred?.currentProvider
          ? `member[${index}].currentDoctor`
          : undefined,
      );
      setTextField(
        `member[${index}].healthInsurance.healthPlan.obGyn`,
        data?.healthPlan[index]?.obGyn,
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
