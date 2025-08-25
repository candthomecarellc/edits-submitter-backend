/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import CustomError from '../../../errors/CusromError';
import { imageFileUpload } from '../imageFileUpload';
import { formatDate } from '../../../utils/utilityFunction';
import app from '../../../../app';
import { codeToValue } from '../../../utils/codeToValue';
  
export const formatForPdf = async (
  application: any,
  // eslint-disable-next-line no-undef
  // file: Express.Multer.File[],
): Promise<Buffer> => {
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
    // setTextField('applicantName', application.applicantName);
    // setTextField('applicationDate', application.applicationDate);

    // Check citizenship and identity checkboxes
    // checkCheckbox(application.uscitizenshiporDOB);
    // checkCheckbox(application.usCitizenship);
    // checkCheckbox(application.identityDocument);
    // checkCheckbox(application.identityDocumentExtra);
    // checkCheckbox(application.ImmigrationstatesIdentity);
    // checkCheckbox(application.ImmigrationStatus);
    // checkCheckbox(application.dobIdentity);
    // checkCheckbox(application.homeAddressDocument);

    // Check income checkboxes
    // checkCheckbox(application.wagesAndSalary);
    // checkCheckbox(application.selfEmployment);
    // checkCheckbox(application.unemploymentBenefits);
    // checkCheckbox(application.privatePensionsAnnuities);
    // checkCheckbox(application.socialSecurity);
    // checkCheckbox(application.workersCompensation);
    // checkCheckbox(application.childSupportAlimony);
    // checkCheckbox(application.veteransBenefits);
    // checkCheckbox(application.militaryPay);
    // checkCheckbox(application.incomeFromRent);
    // checkCheckbox(application.interestDividendsRoyalties);
    // checkCheckbox(application.careForChildrenorAdults);

    // Check additional checkboxes
    // checkCheckbox(application.proofOfstudentStatus);

    // Set personal information
    setTextField('applicant.first', application?.applicant?.first);
    setTextField('applicant.middle', application?.applicant?.middle);
    setTextField('applicant.last', application?.applicant?.last);
    setTextField(
      'primaryPhone.number',
      application?.primaryPhone?.number,
    );
    // selectRadioGroup(
    //   'Primary Phone Type',
    //   application?.personalInfo.primaryPhoneType,
    // );
    checkCheckbox(
      application?.primaryPhone?.type 
      ? 'primaryPhone.type.'+application?.primaryPhone?.type 
      : undefined
    );
    setTextField(
      'anotherPhone.number',
      application?.anotherPhone?.number,
    );
    // selectRadioGroup(
    //   'Another Phone Type',
    //   application?.personalInfo.secondaryPhoneType,
    // );
    checkCheckbox(
      application?.anotherPhone?.type 
      ? 'anotherPhone.type.'+application?.anotherPhone?.type 
      : undefined
    );
    setTextField(
      'languageSpoken',
      application?.languageSpoken,
    );
    setTextField(
      'languageRead',
      application?.languageRead,
    );
    checkCheckbox(application?.homeless ? 'homeless' : undefined); // only check if truthy

    // Set address information
    setTextField('residence.street', application?.residence?.street);
    setTextField('residence.city', application?.residence?.city);
    setTextField('residence.state', application?.residence?.state);
    setTextField('residence.zip', application?.residence?.zip);
    setTextField('residence.county', application?.residence?.county);
    setTextField('residence.apartment', application?.residence?.apartment);

    setTextField('mailingAddress.street', application?.mailingAddress?.street);
    setTextField('mailingAddress.city', application?.mailingAddress?.city);
    setTextField('mailingAddress.state', application?.mailingAddress?.state);
    setTextField('mailingAddress.zip', application?.mailingAddress?.zip);
    setTextField('mailingAddress.apartment', application?.mailingAddress?.apartment);

    // Set another person information
    setTextField('mailingAddress2.associateName', application?.mailingAddress2?.associateName);
    setTextField(
      'mailingAddress2.phoneNumber',
      application?.mailingAddress2?.phoneNumber,
    );
    // selectRadioGroup('Phone type', application?.anotherPerson.phoneType);
    checkCheckbox(
      application?.mailingAddress2?.phoneType 
      ? 'mailingAddress2.phoneType.'+application?.mailingAddress2?.phoneType 
      : undefined
    );
    setTextField('mailingAddress2.street', application?.mailingAddress2?.street);
    setTextField('mailingAddress2.city', application?.mailingAddress2?.city);
    setTextField('mailingAddress2.state', application?.mailingAddress2?.state);
    setTextField('mailingAddress2.zip', application?.mailingAddress2?.zip);
    setTextField('mailingAddress2.apartment', application?.mailingAddress2?.apartment);
    checkCheckbox(
      application?.applyOrRenew
        ? 'applyOrRenew'
        : undefined,
    );
    checkCheckbox(
      application?.discuss
        ? 'discuss'
        : undefined,
    );
    checkCheckbox(
      application?.getNotice
        ? 'getNotice'
        : undefined,
    );
    // selectRadioGroup(
    //   'If you are blind or visually impaired and require information in an alternative format, check the type of mail you want to receive from us. Please return this form with your application',
    //   application?.blindNoticeType,
    // );

    // Function to process family member info.
    const processFamilyMember = (index: number) => {
      const first = application?.householdMember[index]?.legalName?.first;
      const middle = application?.householdMember[index]?.legalName?.middle;
      const last = application?.householdMember[index]?.legalName?.last;
      
      // Only include non-undefined values in the name
      const nameParts = [first, middle, last].filter(Boolean);
      const fullName = nameParts.join(' ');
      
      setTextField(
        `householdMember[${index}].legalName`,
        fullName
      );
      
      const birthFirstName = application?.householdMember[index]?.otherName?.first;
      const birthMiddleName = application?.householdMember[index]?.otherName?.middle;
      const birthLastName = application?.householdMember[index]?.otherName?.last;
      
      // Only include non-undefined values in the birth name
      const birthNameParts = [birthFirstName, birthMiddleName, birthLastName].filter(Boolean);
      const fullBirthName = birthNameParts.join(' ');
      
      setTextField(
        `householdMember[${index}].otherName`,
        fullBirthName
      );
      setTextField(
        `householdMember[${index}].birthPlace.state`,
        application?.householdMember[index]?.birthState,
      );
      setTextField(
        `householdMember[${index}].birthPlace.city`,
        application?.householdMember[index]?.birthCity,
      );
      setTextField(
        `householdMember[${index}].birthPlace.country`,
        application?.householdMember[index]?.birthCountry,
      );
      setTextField(
        `householdMember[${index}].motherName`,
        application?.householdMember[index]?.motherName,
      );
      setTextField(
        `householdMember[${index}].dateOfBirth`,
        formatDate(application?.householdMember[index]?.dateOfBirth, 'mm/dd/yyyy'),
      );
      // setTextField(
      //   `familyInfo[index]?.dateOfBirth.day`,
      //   application?.familyInfo[index]?.dateOfBirth.day,
      // );
      // setTextField(
      //   `familyInfo[index]?.dateOfBirth.year`,
      //   application?.familyInfo[index]?.dateOfBirth.year,
      // );

      // selectRadioGroup(
      //   `familyInfo[index]?.sex`,
      //   application?.familyInfo[index]?.sex,
      // );
      checkCheckbox(
        application?.householdMember[index]?.sex
        ? `householdMember[${index}].sex.${application?.householdMember[index]?.sex}`
        : undefined
      );
      // selectRadioGroup(
      //   `familyInfo[index]?.isApplying`,
      //   application?.familyInfo[index]?.isApplying,
      // );
      checkCheckbox(
        application?.householdMember[index]?.applying
        ? `householdMember[${index}].applyingForHealthInsurance.true`
        : `householdMember[${index}].applyingForHealthInsurance.false`
      );
      // setTextField(
      //   `familyInfo[index]?.genderIdentity`,
      //   application?.familyInfo[index]?.genderIdentity,
      // );
      // selectRadioGroup(
      //   `familyInfo[index]?.isPregnant`,
      //   application?.familyInfo[index]?.isPregnant,
      // );
      checkCheckbox(
        application?.householdMember[index]?.pregnant
        ? `householdMember[${index}].pregnant.${application?.householdMember[index]?.pregnant}`
        : undefined
      );
      setTextField(
        `householdMember[${index}].pregnantDueDate`,
        formatDate(application?.householdMember[index]?.pregnantDueDate, 'mm/dd/yyyy'),
      );
      // setTextField(
      //   `familyInfo[index]?.pregnantDueDate.day`,
      //   application?.familyInfo[index]?.pregnantDueDate.day,
      // );
      // setTextField(
      //   `familyInfo[index]?.pregnantDueDate.year`,
      //   application?.familyInfo[index]?.pregnantDueDate.year,
      // );
      // selectRadioGroup(
      //   `familyInfo[index]?.isParent`,
      //   application?.familyInfo[index]?.isParent,
      // );
      checkCheckbox(
        application?.householdMember[index]?.responsibleAdult
        ? `householdMember[${index}].responsibleAdult.${application?.householdMember[index]?.responsibleAdult}`
        : undefined
      );
      if (index !== 0) {
        setTextField(
          `householdMember[${index}].relationshipToApplicant`,
          application?.householdMember[index]?.relationshipToApplicant,
        );
      }

      // selectRadioGroup(
      //   `familyInfo[index]?.publicHealthCoverage`,
      //   application?.familyInfo[index]?.publicHealthCoverage,
      // );
      // setTextField(
      //   `familyInfo[index]?.publicHealthCoverageidNumber`,
      //   application?.familyInfo[index]?.publicHealthCoverageidNumber,
      // );
      setTextField(
        `householdMember[${index}].ssn`,
        application?.householdMember[index]?.ssn,
      );
      // selectRadioGroup(
      //   `familyInfo[index]?.usCitizenship`,
      //   application?.familyInfo[index]?.usCitizenship,
      // );
      checkCheckbox(
        application?.householdMember[index]?.aci
        ? application?.householdMember[index]?.aci === 'citizen'
        ? `householdMember[${index}].aci.citizen`
        : `householdMember[${index}].aci.immigrant`
        : undefined
      );
      const alienDate = new Date(application?.householdMember[index]?.alienDateOfEntry);
      const alienMonth = (alienDate.getMonth() + 1).toString();
      const alienDay = alienDate.getDate().toString();
      const alienYear = alienDate.getFullYear().toString();
      setTextField(
        `householdMember[${index}].alienDateOfEntry.month`,
        alienMonth,
      );
      setTextField(
        `householdMember[${index}].alienDateOfEntry.day`,
        alienDay,
      );
      setTextField(
        `householdMember[${index}].alienDateOfEntry.year`,
        alienYear,
      );
      setTextField(
        `householdMember[${index}].ethnicity`,
        application?.householdMember[index]?.ethnicity?.hispanic === 'yes' ? 'H\n' : '' +
        application?.householdMember[index]?.ethnicity?.indian === 'yes' ? 'I\n' : '' +
        application?.householdMember[index]?.ethnicity?.asian === 'yes' ? 'A\n' : '' +
        application?.householdMember[index]?.ethnicity?.black === 'yes' ? 'B\n' : '' +
        application?.householdMember[index]?.ethnicity?.pacificIslander === 'yes' ? 'P\n' : '' +
        application?.householdMember[index]?.ethnicity?.white === 'yes' ? 'W\n' : '',
      );
      // selectRadioGroup(
      //   `familyInfo[index]?.receivedAServiceFromIHS`,
      //   application?.familyInfo[index]?.receivedAServiceFromIHS,
      // );
    };

    // Process family members
    for (let i = 0; i < 2; i++) {
      processFamilyMember(i);
    }

    // selectRadioGroup('householdVeteran', application.householdVeteran);
    checkCheckbox(
      application?.householdMember.some((member: any) => member.veteran)
      ? 'veteran.true'
      : 'veteran.false'
    );
    const veteranName = application?.householdMember.some((member: any) => member.veteran)
        ? application?.householdMember.find((member: any) => member.veteran)?.legalName?.first || '' + ' ' + application?.householdMember.find((member: any) => member.veteran)?.legalName?.middle || '' + ' ' + application?.householdMember.find((member: any) => member.veteran)?.legalName?.last || ''
        : '';
    setTextField('veteran.name', veteranName);

    // checkCheckbox(application?.selfEmploymentInfo ? 'selfEmployed' : undefined);
    checkCheckbox(application?.householdMember.some((member: any) => member.income.earnedIncome.length > 0) ? undefined : 'noEarnedIncome');

    // Function to process earning from work info.
    // const processEarningFromWork = (index: number) => {
    //   setTextField(
    //     `earnedIncome[${index}].name`,
    //     application?.earningFromWork[index]?.name,
    //   );
    //   setTextField(
    //     `earnedIncome[${index}].employerName`,
    //     application?.earningFromWork[index]?.tyoeOfWork,
    //   );
    //   setTextField(
    //     `earnedIncome[${index}].amount`,
    //     application?.earningFromWork[index]?.howMuchEarned,
    //   );
    //   setTextField(
    //     `earnedIncome[${index}].period`,
    //     application?.earningFromWork[index]?.howOftenPaid,
    //   );
    // };
    let index = 0;
    application?.householdMember.forEach((member: any) => {
      member.income.earnedIncome.forEach((income: any) => {
        if(index < 4){
          setTextField(
            `earnedIncome[${index}].name`,
            member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last,
          );
          setTextField(
            `earnedIncome[${index}].employerName`,
            income.employerName || '',
          );
          setTextField(
            `earnedIncome[${index}].amount`,
            income.amount.toString() || '',
          );
          setTextField(
            `earnedIncome[${index}].period`,
            income.period || '',
          );
          index++;
        }
      })
    })

    // Process earning from work
    // for (let i = 0; i < 3; i++) {
    //   processEarningFromWork(i);
    // }

    checkCheckbox(application?.householdMember.some((member: any) => member.income.unearnedIncome.length > 0) ? undefined : 'noUnearnedIncome');

    // Function to process unearned income info.
    // const processUnearnedIncome = (index: number) => {
    //   setTextField(
    //     `unearnedIncome[${index}].name`,
    //     application?.unearnedIncome[index]?.name,
    //   );
    //   setTextField(
    //     `unearnedIncome[${index}].source`,
    //     application?.unearnedIncome[index]?.tyoeOfWork,
    //   );
    //   setTextField(
    //     `unearnedIncome[${index}].amount`,
    //     application?.unearnedIncome[index]?.howMuchEarned,
    //   );
    //   setTextField(
    //     `unearnedIncome[${index}].period`,
    //     application?.unearnedIncome[index]?.howOftenPaid,
    //   );
    // };
    index = 0;
    application?.householdMember.forEach((member: any) => {
      member.income.unearnedIncome.forEach((income: any) => {
        if(index < 4){
          setTextField(
            `unearnedIncome[${index}].name`,
            member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last,
          );
          setTextField(
            `unearnedIncome[${index}].source`,
            income.source || '',
          );
          setTextField(
            `unearnedIncome[${index}].amount`,
            income.amount.toString() || '',
          );
          setTextField(
            `unearnedIncome[${index}].period`,
            income.period || '',
          );
          index++;
        }
      })
    })

    // Process Unearned Income
    // for (let i = 0; i < 3; i++) {
    //   processUnearnedIncome(i);
    // }

    // checkCheckbox(application?.noContributions ? 'noContribution' : undefined);

    // Function to process contributions info.
    // const processContributions = (index: number) => {
    //   setTextField(
    //     `contribution[${index}].name`,
    //     application?.contributions[index]?.name,
    //   );
    //   setTextField(
    //     `contribution[${index}].source`,
    //     application?.contributions[index]?.tyoeOfWork,
    //   );
    //   setTextField(
    //     `contribution[${index}].amount`,
    //     application?.contributions[index]?.howMuchEarned,
    //   );
    //   setTextField(
    //     `contribution[${index}].period`,
    //     application?.contributions[index]?.howOftenPaid,
    //   );
    // };

    // Process Contributions
    // for (let i = 0; i < 3; i++) {
    //   processContributions(i);
    // }

    checkCheckbox(application?.householdMember.some((member: any) => member.income.resource.length > 0) ? undefined : 'noOtherIncome');

    // Function to process Other Income info.
    // const processOtherIncome = (index: number) => {
    //   setTextField(
    //     `otherIncome[${index}].name`,
    //     application?.otherIncome[index]?.name,
    //   );
    //   setTextField(
    //     `otherIncome[${index}].source`,
    //     application?.otherIncome[index]?.tyoeOfWork,
    //   );
    //   setTextField(
    //     `otherIncome[${index}].amount`,
    //     application?.otherIncome[index]?.howMuchEarned,
    //   );
    //   setTextField(
    //     `otherIncome[${index}].period`,
    //     application?.otherIncome[index]?.howOftenPaid,
    //   );
    // };
    index = 0;
    application?.householdMember.forEach((member: any) => {
      member.income.resource.forEach((income: any) => {
        if(index < 4){
          setTextField(
            `otherIncome[${index}].name`,
            member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last,
          );
          setTextField(
            `otherIncome[${index}].source`,
            income.ctg || '',
          );
          setTextField(
            `otherIncome[${index}].amount`,
            income.value.toString() || '',
          );
          setTextField(
            `otherIncome[${index}].period`,
            income.period || '',
          );
          index++;
        }
      })
    })

    // Process Other Income
    // for (let i = 0; i < 3; i++) {
    //   processOtherIncome(i);
    // }
    const noIncomeMember = application?.householdMember.find((member: any) => member.income.earnedIncome.length === 0 && member.income.unearnedIncome.length === 0 && member.income.resource.length === 0);
    const noIncomeName = noIncomeMember?.legalName?.first + ' ' + noIncomeMember?.legalName?.middle + ' ' + noIncomeMember?.legalName?.last;
    checkCheckbox(noIncomeMember ? 'noIncome.true' : 'noIncome.false');
    setTextField('noIncomeName', noIncomeName);
    setTextField('wayOfLiving', application?.wayOfLiving);
    // selectRadioGroup(
    //   'applierChangeJob.changeJobin3Month',
    //   application?.applierChangeJob.changeJobin3Month,
    // );
    checkCheckbox(
      application?.householdMember.some((member: any) => member.changedJob)
      ? `changedJob.true` 
      : `changedJob.false` 
    );
    const lastJobDate = new Date(application?.householdMember.find((member: any) => member.changedJob)?.lastJobDate);
    setTextField(
      'lastJobDate.month',
      (lastJobDate.getMonth() + 1).toString(),
    );
    setTextField(
      'lastJobDate.day',
      lastJobDate.getDate().toString(),
    );
    setTextField(
      'lastJobDate.year',
      lastJobDate.getFullYear().toString(),
    );
    setTextField(
      'lastJobEmployerName',
      application?.householdMember.find((member: any) => member.changedJob)?.employerName || '',
    );

    // selectRadioGroup(
    //   'applierStudent.student',
    //   application?.applierStudent.student,
    // );
    const student = application?.householdMember.find((member: any) => member.studentId);
    checkCheckbox(
      student 
      ? `student.true` 
      : `student.false`
    );
    // selectRadioGroup(
    //   'applierStudent.studentType',
    //   application?.applierStudent.studentType,
    // );
    checkCheckbox(
      student?.studentType
      ? `studentType.${student?.studentType === 1 ? 'full-time' : 'part-time'}` 
      : undefined
    );
    setTextField(
      'studentName',
      student?.legalName?.first + ' ' + student?.legalName?.middle + ' ' + student?.legalName?.last,
    );
    checkCheckbox(application?.householdExpense?.childCare?.length > 0 ? 'childCare.true' : 'childCare.false');

    // const processChildCare = (index: number) => {
    //   setTextField(
    //     `householdExpense.childCare[${index}].name`,
    //     application?.childCare[index]?.childName,
    //   );
    //   setTextField(
    //     `householdExpense.childCare[${index}].amount`,
    //     application?.childCare[index]?.howMuchPaid,
    //   );
    //   setTextField(
    //     `householdExpense.childCare[${index}].period`,
    //     application?.childCare[index]?.howOftenPaid,
    //   );
    // };
    application?.householdExpense?.childCare.forEach((child: any) => {
      setTextField(
        `householdExpense.childCare[${index}].name`,
        child.name,
      );
      setTextField(
        `householdExpense.childCare[${index}].amount`,
        child.amount,
      );
      setTextField(
        `householdExpense.childCare[${index}].period`,
        child.period,
      );
    })

    // Process payForChildCare
    // for (let i = 0; i < 3; i++) {
    //   processChildCare(i);
    // }

    checkCheckbox(
      application?.familyPlanning
      ? 'familyPlanning.true'
      : 'familyPlanning.false'
    );
    // selectRadioGroup(
    //   'isPayCourtOrdered.payCourtOrdered',
    //   application?.isPayCourtOrdered.payCourtOrdered,
    // );
    // setTextField(
    //   'isPayCourtOrdered.payCourtOrderedAmount',
    //   application?.isPayCourtOrdered.payCourtOrderedAmount,
    // );
    // setTextField(
    //   'isPayCourtOrdered.whoPayCourtOrdered',
    //   application?.isPayCourtOrdered.whoPayCourtOrdered,
    // );

    checkCheckbox(
      application?.householdMember.some((member: any) => member.medicare)
      ? 'householdMember.medicare.true'
      : 'householdMember.medicare.false'
    );

    const comInsured = application?.householdMember.find((member: any) => member.commercialInsurance);
    const endOfCoverage = new Date(comInsured?.healthInsurance?.endDateOfCoverage);
    checkCheckbox(
      comInsured
      ? 'householdMember.commercialInsurance.true'
      : 'householdMember.commercialInsurance.false'
    );

    setTextField(
      'commercialInsurance.name',
      comInsured?.legalName?.first + ' ' + comInsured?.legalName?.middle + ' ' + comInsured?.legalName?.last,
    );
    setTextField(
      'householdMember.healthInsurance.personsCovered',
      comInsured?.healthInsurance?.personsCovered,
    );
    setTextField(
      'householdMember.healthInsurance.costOfPolicy',
      comInsured?.healthInsurance?.costOfPolicy,
    );
    setTextField(
      'householdMember.healthInsurance.endDateOfCoverage.month',
      (endOfCoverage?.getMonth() + 1).toString(),
    );
    setTextField(
      'householdMember.healthInsurance.endDateOfCoverage.day',
      endOfCoverage?.getDate().toString(),
    );
    setTextField(
      'householdMember.healthInsurance.endDateOfCoverage.year',
      endOfCoverage?.getFullYear().toString(),
    );
    checkCheckbox(
      application?.householdMember.some((member: any) => member.jobHealthInsurance)
      ? 'householdMember.jobHealthInsurance.true'
      : 'householdMember.jobHealthInsurance.false'
    );
    setTextField('householdExpense.shelterAmount', application?.householdExpense?.shelterAmount?.toString() || '');
    setTextField(
      'householdExpense.waterCostAmount',
      application?.householdExpense?.waterCostAmount?.toString() || '',
    );
    checkCheckbox(
      application?.householdExpense?.waterCostPeriod
      ? `householdExpense.waterCostPeriod.${application?.householdExpense?.waterCostPeriod}`
      : undefined
    );
    checkCheckbox(
      application?.householdExpense?.freeHousing
      ? 'householdExpense.freeHousing.true'
      : 'householdExpense.freeHousing.false'
    );
    checkCheckbox(application?.householdExpense?.nursingHome 
      ? 'householdExpense.nursingHome.true'
      : 'householdExpense.nursingHome.false'
    );
    checkCheckbox(
      application?.householdExpense?.blindDisableChronicallyIll
      ? 'householdExpense.blindDisableChronicallyIll.true'
      : 'householdExpense.blindDisableChronicallyIll.false'
    );

    const recentBill = application?.householdMember.find((member: any) => member.recentMedicalBill);

    checkCheckbox(
      recentBill
      ? 'householdMember.recentMedicalBill.true'
      : 'householdMember.recentMedicalBill.false'
    );
    setTextField(
      'recentMedicalBill.name',
      recentBill?.legalName?.first + ' ' + recentBill?.legalName?.middle + ' ' + recentBill?.legalName?.last,
    );
    setTextField(
      'householdMember.healthInsurance.monthBilled',
      recentBill?.healthInsurance?.monthBilled,
    );

    checkCheckbox(
      application?.householdMember.find((member: any) => member.oldMedicalBill)
      ? 'householdMember.oldMedicalBill.true'
      : 'householdMember.oldMedicalBill.false'
    );

    const recentMove = application?.householdMember.find((member: any) => member.recentMoveIn);

    checkCheckbox(
      recentMove
      ? 'householdMember.recentMoveIn.true'
      : 'householdMember.recentMoveIn.false'
    );
    setTextField('recentMoveIn.name', recentMove?.legalName?.first + ' ' + recentMove?.legalName?.middle + ' ' + recentMove?.legalName?.last);
    setTextField(
      'householdMember.healthInsurance.moveInState',
      recentMove?.healthInsurance?.moveInState,
    );
    setTextField(
      'householdMember.healthInsurance.moveInCounty',
      recentMove?.healthInsurance?.moveInCounty,
    );

    checkCheckbox(
      application?.householdMember.some((member: any) => member.pendingLawsuit)
      ? 'householdMember.pendingLawsuit.true'
      : 'householdMember.pendingLawsuit.false'
    );
    const pendingLawSuit = application?.householdMember.find((member: any) => member.pendingLawsuit);
    setTextField('pendingLawsuit.name', pendingLawSuit?.legalName?.first + ' ' + pendingLawSuit?.legalName?.middle + ' ' + pendingLawSuit?.legalName?.last);
    checkCheckbox(
      application?.householdMember.some((member: any) => member.injured)
      ? 'householdMember.injured.true'
      : 'householdMember.injured.false'
    );
    const injured = application?.householdMember.find((member: any) => member.injured);
    setTextField(
      'injured.name',
      injured?.legalName?.first + ' ' + injured?.legalName?.middle + ' ' + injured?.legalName?.last,
    );
    const deceased = application?.householdMember.find((member: any) => member.parentDeceased || member.spouseDeceased);
    checkCheckbox(deceased ? 'deceased.true' : 'deceased.false');
    setTextField('deceased.name', deceased?.legalName?.first + ' ' + deceased?.legalName?.middle + ' ' + deceased?.legalName?.last);

    const parentLivingOutside = application?.householdMember.filter((member: any) => member.parentLivingOutside);
    checkCheckbox(
      parentLivingOutside
      ? 'householdMember.parentLivingOutside.true'
      : 'householdMember.parentLivingOutside.false'
    );
    parentLivingOutside.forEach((member: any, index: number) => {
      if(index < 2){
        if(member.parentPrivacy){
          checkCheckbox('householdMember.parentPrivacy');
        }

        setTextField(
          `parentLivingOutside[${index}].name`,
          member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last,
        );
        setTextField(
          `householdMember[${index}].parentOutside.name`,
          member.parentOutside?.name,
        );
        const dob = new Date(member.parentOutside?.dob);
        setTextField(
          `householdMember[${index}].parentOutside.dob.month`,
          (dob.getMonth() + 1).toString(),
        );
        setTextField(
          `householdMember[${index}].parentOutside.dob.day`,
          dob.getDate().toString(),
        );
        setTextField(
          `householdMember[${index}].parentOutside.dob.year`,
          dob.getFullYear().toString(),
        );
        setTextField(
          `householdMember[${index}].parentOutside.street`,
          member.parentOutside?.street,
        );
        setTextField(`householdMember[${index}].parentOutside.city`, member.parentOutside?.city);
        setTextField(`householdMember[${index}].parentOutside.ssn`, member.parentOutside?.ssn);
      }
    })

    const spouseLivingOutside = application?.householdMember.find((member: any) => member.spouseLivingOutside);
    checkCheckbox(
      spouseLivingOutside
      ? 'householdMember.spouseLivingOutside.true'
      : 'householdMember.spouseLivingOutside.false'
    );
    if(spouseLivingOutside?.spousePrivacy){
      checkCheckbox('householdMember.spousePrivacy');
    }
    setTextField(
      'spouseLivingOutside.name',
      spouseLivingOutside?.legalName?.first + ' ' + spouseLivingOutside?.legalName?.middle + ' ' + spouseLivingOutside?.legalName?.last,
    );
    setTextField(
      'householdMember.spouseOutside.name',
      spouseLivingOutside?.spouseOutside?.name,
    );
    const dob = new Date(spouseLivingOutside?.spouseOutside?.dob);
    setTextField(
      'householdMember.spouseOutside.dob.month',
      (dob.getMonth() + 1).toString(),
    );
    setTextField(
      'householdMember.spouseOutside.dob.day',
      dob.getDate().toString(),
    );
    setTextField(
      'householdMember.spouseOutside.dob.year',
      dob.getFullYear().toString(),
    );
    setTextField(
      'householdMember.spouseOutside.street',
      spouseLivingOutside?.spouseOutside?.street,
    );
    setTextField(
      'householdMember.spouseOutside.city',
      spouseLivingOutside?.spouseOutside?.city,
    );
    setTextField('householdMember.spouseOutside.ssn', spouseLivingOutside?.spouseOutside?.ssn);
    checkCheckbox(
      application?.healthPlan ? 'householdMember.healthPlan' : undefined,
    );

    // Function to process health Plan info.
    // const processHealthPlan = (index: number) => {
    // };

    for(let index =0; index < 6; index++){
      setTextField(
        `member[${index}].legalName.last`,
        application?.householdMember[index]?.legalName?.last,
      );
      setTextField(
        `member[${index}].legalName.first`,
        application?.householdMember[index]?.legalName?.first,
      );
      setTextField(
        `member[${index}].dateOfBirth`,
        application?.householdMember[index]?.dateOfBirth,
      );
      setTextField(
        `member[${index}].ssn`,
        application?.householdMember[index]?.ssn,
      );
      setTextField(
        `member[${index}].healthInsurance.healthPlan.healthPlanName`,
        application?.householdMember[index]?.healthInsurance?.healthPlan?.healthPlanName,
      );
      setTextField(
        `member[${index}].healthInsurance.healthPlan.preferredDoctor`,
        application?.householdMember[index]?.healthInsurance?.healthPlan?.preferredDoctor,
      );
      checkCheckbox(
        application?.householdMember[index]?.currentDoctor
          ? `member[${index}].currentDoctor`
          : undefined,
      );
      setTextField(
        `member[${index}].healthInsurance.healthPlan.obGyn`,
        application?.householdMember[index]?.healthInsurance?.healthPlan?.obGyn,
      );
    }

    // Process Health Plan
    // for (let i = 0; i < 5; i++) {
    //   processHealthPlan(i);
    // }

    // Save the pdf to the file system
    const filledPdfBytes = await pdfDoc.save();
    const filledPdfBuffer = Buffer.from(filledPdfBytes);
    // await formImageFileUpload.createBatchFolder(application, file);

    console.log('PDF processing complete!');

    return filledPdfBuffer;
  } catch (error) {
    console.log(error);
    throw new CustomError(String(error), 400);
  }

  // calculate the number of image records file uploaded
  // const noOfImageRecords = file.length;

  // console.log(`noOfImageRecords: ${noOfImageRecords}`);
  // console.log(file);
};
