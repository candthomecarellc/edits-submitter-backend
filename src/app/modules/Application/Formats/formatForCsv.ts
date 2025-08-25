import { ApplicationFrontend } from '../application.frontend.interface';
import logger from '../../../utils/logger';
import { valueToCode } from '../../../utils/valueToCode';
import {
  formatDate,
  generateRecordSent,
  generateUniqueCaseId,
  getUniqueUID,
  getBatchNumber,
  countPdfPages,
  getTime,
} from '../../../utils/utilityFunction';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatForCsv = async (application: ApplicationFrontend, noOfDocuments: number) => {
  let HEADER_RECORD = '';
  let DATA_RECORD = '';
  let NHTX_RECORD = '';
  let HOUSEHOLD_COMPOSITION_RECORD = '';
  let IMAGE_RECORD = '';
  let TRAILER_RECORD = '';

  const SUBMITTER_ID = '0004';
  const UNIQUE_UID = getUniqueUID();
  const SIGNATURE_DATE = new Date();
  const CASE_ID = generateUniqueCaseId(SUBMITTER_ID, UNIQUE_UID, SIGNATURE_DATE);

  try {
    HEADER_RECORD +=
    /*Submission Type-----------*/        'H'
    /*Submitter ID--------------*/+ ',' + SUBMITTER_ID
    /*# Records Sent------------*/+ ',' + generateRecordSent()
    /*Submission Date-----------*/+ ',' + (formatDate(new Date(), 'mmddyyyy') || 'Submission Date')
    /*Submission Time-----------*/+ ',' + (getTime() || 'Submission Time')
    /*Provider ID---------------*/+ ',' + (application?.providerId || 'Provider ID') + ',\n';
  } catch (error) {
    logger.error(error);
  }
  logger.info(HEADER_RECORD);
  console.log(application?.submitionType === 'deferral' ? (application?.deferralExtension === 0 ? '15' : '30') : ((application?.householdMember?.length + 1).toString() || ''))
  try {
    // Data Record
    const m = application?.mailingAddress?.street && application?.mailingAddress?.street !== '' ? true : false;
    /*Submission Type-----------*/        DATA_RECORD += (valueToCode.submissionType(application?.submitionType) || 'N')
    /*# of HH Comp records------*/+ ',' + (application?.submitionType === 'deferral' ? (application?.deferralExtension === 0 ? '15' : '30') : (application?.householdMember?.length.toString() || ''))
    /*# of Image records--------*/+ ',' + (noOfDocuments + 1).toString().padStart(3, '0')
    /*Unique Case ID------------*/+ ',' + (CASE_ID || '')
    /*Unique TIFF ID------------*/+ ',' + (CASE_ID || '')
    /*Signature Date------------*/+ ',' + (formatDate(SIGNATURE_DATE, 'mm/dd/yy') || '')
    /*Case Name-----------------*/+ ',' + (application?.caseName || '')
    /*# of NHTX records expected*/+ ',' + ('')
    /*Application Type----------*/+ ',' + (application?.applicationType?.toUpperCase())
    /*Priority------------------*/+ ',' + ("")
    /*Client Notice Language----*/+ ',' + (application?.clientNoticeLanguage === 'spanish' ? 'S' : 'E')
    /*Language Read-------------*/+ ',' + (valueToCode.language(application?.languageRead))
    /*Date admitted to SNF------*/+ ',' + ("")
    /*Residence Address House No*/+ ',' + (application?.homeless ? '999' : application?.residence?.house || '')
    /*Street Name---------------*/+ ',' + (application?.homeless ? 'Undomiciled' : application?.residence?.street || '')
    /*Apt Num-------------------*/+ ',' + (application?.residence?.apartment || '')
    /*City----------------------*/+ ',' + (application?.homeless ? 'NY' : application?.residence?.city || '')
    /*State---------------------*/+ ',' + (application?.homeless ? 'NY' : application?.residence?.state || '')
    /*Zip Code------------------*/+ ',' + (application?.residence?.zip || '')
    /*Phone Num-----------------*/+ ',' + (application?.residence?.phone || '')
    /*House #/street------------*/+ ',' + (application?.mailingAddress?.street || '')
    /*Apt #---------------------*/+ ',' + (m ? application?.mailingAddress?.apartment : '')
    /*City----------------------*/+ ',' + (m ? application?.mailingAddress?.city : '')
    /*State---------------------*/+ ',' + (m ? application?.mailingAddress?.state : '')
    /*Zip Code------------------*/+ ',' + (m ? application?.mailingAddress?.zip : '')
    /*Associate Name------------*/+ ',' + (application?.mailingAddress2?.associateName || '')
    /*In Care of Name-----------*/+ ',' + (application?.mailingAddress2?.inCareOf || '')
    /*Second/Associate Street---*/+ ',' + (application?.mailingAddress2?.street || '')
    /*Second/Associate City-----*/+ ',' + (application?.mailingAddress2?.city || '')
    /*Second/Associate State----*/+ ',' + (application?.mailingAddress2?.state || '')
    /*Second/Associate Zip------*/+ ',' + (application?.mailingAddress2?.zip || '')
    /*Phone Num-----------------*/+ ',' + (application?.mailingAddress2?.phoneNumber || '')
    /*Language Spoken-----------*/+ ',' + (valueToCode.language(application?.languageSpoken))
    /*CONTACT NAME--------------*/+ ',' + (application?.contactName || '')
    /*CONTACT PHONE NUM---------*/+ ',' + (application?.contactPhone || '')
    /*CASE COMPOSITION----------*/+ ',' + (application?.caseComposition || '')
    /*EDC1----------------------*/+ ',' + (application?.edc1 ? formatDate(application?.edc1, 'mmddyy') : '')
    /*EDC2----------------------*/+ ',' + ('')//application?.edc2 ? formatDate(application?.edc2, 'mmddyy') : '';
    /*Fuel Type-----------------*/+ ',' + (valueToCode.fuelType(application?.householdExpense?.fuelType) || '0')
    /*Shelter  Type-------------*/+ ',' + (application?.householdExpense?.shelterType ? valueToCode.shelterTypes(application?.householdExpense?.shelterType)?.toString().padStart(2, '0') : '')
    /*Shelter Amount------------*/+ ',' + (application?.householdExpense?.shelterAmount || '0000000')
    /*Water Amount--------------*/+ ',' + (application?.householdExpense?.waterCostAmount || '')
    /*Add TY--------------------*/+ ',' + (application?.householdExpense?.addType ? valueToCode.additionalAllowanceTypes(application?.householdExpense?.addType)?.toString().padStart(2, '0') : '')
    /*Add TY Amount-------------*/+ ',' + (application?.householdExpense?.addType === '' ? '' :application?.householdExpense?.addAmount || '')
    /*SSI DM--------------------*/+ ',' + (valueToCode.ssiDM(application?.householdExpense?.ssi?.ssiDm) || '')
    /*SSI LA--------------------*/+ ',' + (valueToCode.ssiLA(application?.householdExpense?.ssi?.ssiLa) || '')
    /*SSI No-DM-----------------*/+ ',' + (application?.householdExpense?.ssi?.ssiNoDm || '')
    /*SSI No-All----------------*/+ ',' + (application?.householdExpense?.ssi?.ssiNoAll || '')
    /*SSI Buy-------------------*/+ ',' + (application?.householdExpense?.ssi?.ssiBuy || '')
    /*Chronic Care Date INS-----*/+ ',' + (formatDate(application?.householdExpense?.chronicCare?.chronicCareDateIns, 'mmddyyyy') || '')
    /*CHRONIC CARE_PIA----------*/+ ',' + (application?.householdExpense?.chronicCare?.chronicCarePia || '')
    /*Chronic Care CON----------*/+ ',' + (valueToCode.chronicCareCon(application?.householdExpense?.chronicCare?.chronicCareCon) || '')
    /*Chronic Care Amount-------*/+ ',' + (application?.householdExpense?.chronicCare?.chronicCareAmount || '')
    /*Chronic Care LOC----------*/+ ',' + (application?.householdExpense?.chronicCare?.chronicCareLoc || '');

    // Earned Income 1 & 2
    let i = 0;
    application?.householdMember?.some(member => {
      member.income?.earnedIncome?.some(income => {
        /*LN-------*/DATA_RECORD += ',' + (member.lineNumber?.toString().padStart(2, '0'))
        /*CTG-------------------*/+ ',' + (valueToCode.ctg(income.ctg) || '')
        /*Child Identifier------*/+ ',' + (member.childIdentifier || '')
        /*Chronic Care Indicator*/+ ',' + (member.chronicCareIndicator || '')
        /*EID-------------------*/+ ',' + (income.eid || '')
        /*SRC-------------------*/+ ',' + (income.source ? valueToCode.earnedIncomeSources(income.source)?.toString().padStart(2, '0') : '')
        /*PER-------------------*/+ ',' + (income.source && income.source !== '' ? valueToCode.period(income.period) || '' : '')
        /*Employment Status-----*/+ ',' + (income.employmentStatus === 'full-time' ? 'F' : income.employmentStatus === 'part-time' ? 'P' : '')
        /*Gross-----------------*/+ ',' + (income.amount || '')
        /*INSUR-----------------*/+ ',' + (income.insur || '')
        /*CT-SUP----------------*/+ ',' + (income.ctSup || '')
        /*WK-REL----------------*/+ ',' + (income.wkRel || '')
        /*IRWE------------------*/+ ',' + (income.irwe || '')
        /*Child Care 1 MOYR-----*/+ ',' + (application?.householdExpense?.childCare[0].month?.toString().padStart(2, '0') + application?.householdExpense?.childCare[0].year.toString().slice(-2) || '')
        /*Child Care 1 Amount---*/+ ',' + (application?.householdExpense?.childCare[0].amount || '')
        /*Child Care 2 MOYR-----*/+ ',' + (application?.householdExpense?.childCare[1].month?.toString().padStart(2, '0') + application?.householdExpense?.childCare[1].year.toString().slice(-2) || '')
        /*Child Care 2 Amount---*/+ ',' + (application?.householdExpense?.childCare[1].amount || '')
        /*Child Care 3 MOYR-----*/+ ',' + (application?.householdExpense?.childCare[2].month?.toString().padStart(2, '0') + application?.householdExpense?.childCare[2].year.toString().slice(-2) || '')
        /*Child Care 3 Amount---*/+ ',' + (application?.householdExpense?.childCare[2].amount || '');
        i++;
        return i === 2;
      })
      return i === 2;
    });
    DATA_RECORD += (i === 0 ? ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,' : i === 1 ? ',,,,,,,,,,,,,,,,,,,' : '');

    // Unearned Income 1-6
    i = 0;
    application?.householdMember?.some(member => {
      member.income?.unearnedIncome?.some(income => {
        /*Ln-------*/DATA_RECORD += ',' + (member.lineNumber?.toString().padStart(2, '0') || '')
        /*CTG-------------------*/+ ',' + (valueToCode.ctg(income.ctg) || '')
        /*Child Identifier------*/+ ',' + (member.childIdentifier || '')
        /*Chronic Care Indicator*/+ ',' + (member.chronicCareIndicator || '')
        /*Income Source Code----*/+ ',' + (income.source ? valueToCode.unearnedIncomeSources(income.source)?.toString().padStart(2, '0') : '' )
        /*Period----------------*/+ ',' + (income.source && income.source !== '' ? valueToCode.period(income.period) || '' : '')
        /*Amount----------------*/+ ',' + (income.source && income.source !== '' ? income.amount || '' : '')
        /*CD 1------------------*/+ ',' + (income.cd1 ? valueToCode.unearnedIncomeCd(income.cd1)?.toString().padStart(2, '0') : '')
        /*Exempt 1--------------*/+ ',' + (income.cd1 && income.cd1 !== '' ? income.exempt1 || '' : '')
        /*CD 2------------------*/+ ',' + (income.cd2 ? valueToCode.unearnedIncomeCd(income.cd2)?.toString().padStart(2, '0') : '')
        /*Exempt 2--------------*/+ ',' + (income.cd2 && income.cd2 !== '' ? income.exempt2 || '' : '');
        i++;
        return i === 6;
      });
      return i === 6;
    });
    for(; i < 6; i++) DATA_RECORD += ',,,,,,,,,,,';

    // Resources
    i = 0;
    application?.householdMember?.some(member => {
      member.income?.resource?.some(resource => {
        /*Ln-------*/DATA_RECORD += ',' + (member.lineNumber?.toString().padStart(2, '0') || '')
        /*Categorical Indicator-*/+ ',' + (valueToCode.ctg(resource.ctg) || '')
        /*Child Identifier------*/+ ',' + (member.childIdentifier || '')
        /*Chronic Care Indicator*/+ ',' + (member.chronicCareIndicator || '')
        /*unused----------------*/+ ',' + ('')
        /*CD--------------------*/+ ',' + (resource.cd ? valueToCode.resourceCd(resource.cd)?.toString().padStart(2, '0') : '')
        /*Res Value-------------*/+ ',' + (resource.value || '')
        /*UTXN2 flag------------*/+ ',' + (valueToCode.utxn2Flag(resource.utxn2Flag) || '');
        i++;
        return i === 6;
      });
      return i === 6;
    });
    for(; i < 6; i++) DATA_RECORD += ',,,,,,,,';

    DATA_RECORD += '\n';
  } catch (error) {
    logger.error(error);
  }

  try {
    // NH-TX Record
    //const nhTxRecord = '';

    //NHTX_RECORD = 'X';

  } catch (error) {
    logger.error(error);
  }

  // Household Composition Record
  try {
    application?.householdMember?.forEach(member => {
      HOUSEHOLD_COMPOSITION_RECORD +=     'M'
      /*Line #------------------*/+ ',' + (member.lineNumber?.toString().padStart(2, '0'))
      /*Name First--------------*/+ ',' + (member.legalName?.first || '')
      /*M-----------------------*/+ ',' + (member.legalName?.middle || '')
      /*Last--------------------*/+ ',' + (member.legalName?.last || '')
      /*Birth date--------------*/+ ',' + (formatDate(member.dateOfBirth, 'mmddyyyy') || '')
      /*Sex---------------------*/+ ',' + (valueToCode.sex(member.sex) || '')
      /*SSN---------------------*/+ ',' + (member.ssn || '')
      /*MA----------------------*/+ ',' + (member.medicalAssistance ? 'Y' : 'N')
      /*Resp Adult--------------*/+ ',' + (member.responsibleAdult ? 'Y' : 'N')
      /*Ethnic - H--------------*/+ ',' + (member.ethnicity?.hispanic === 'yes' ? 'Y' : member.ethnicity?.hispanic === 'no' ? 'N' : member.ethnicity?.hispanic === 'unknown' ? 'U' : '')
      /*Ethnic– I---------------*/+ ',' + (member.ethnicity?.indian === 'yes' ? 'Y' : member.ethnicity?.indian === 'no' ? 'N' : member.ethnicity?.indian === 'unknown' ? 'U' : '')
      /*Ethnic – A--------------*/+ ',' + (member.ethnicity?.asian === 'yes' ? 'Y' : member.ethnicity?.asian === 'no' ? 'N' : member.ethnicity?.asian === 'unknown' ? 'U' : '')
      /*Ethnic - B--------------*/+ ',' + (member.ethnicity?.black === 'yes' ? 'Y' : member.ethnicity?.black === 'no' ? 'N' : member.ethnicity?.black === 'unknown' ? 'U' : '')
      /*Ethnic – P--------------*/+ ',' + (member.ethnicity?.pacificIslander === 'yes' ? 'Y' : member.ethnicity?.pacificIslander === 'no' ? 'N' : member.ethnicity?.pacificIslander === 'unknown' ? 'U' : '')
      /*Ethnic - W--------------*/+ ',' + (member.ethnicity?.white === 'yes' ? 'Y' : member.ethnicity?.white === 'no' ? 'N' : member.ethnicity?.white === 'unknown' ? 'U' : '')
      /*Name Code---------------*/+ ',' + (member.otherName?.code === 'alias' ? 'A' : member.otherName?.code === 'maiden' ? 'M' : '')
      /*First-------------------*/+ ',' + (member.otherName?.first || '')
      /*MI----------------------*/+ ',' + (member.otherName?.middle || '')
      /*Last--------------------*/+ ',' + (member.otherName?.last || '')
      /*Pregnant----------------*/+ ',' + (member.pregnant ? 'Y' : 'N')
      /*Add Filler/CIN----------*/+ ',' + ('')//member.cin || ''
      /*State/Fed Charge Cd-----*/+ ',' + (member.fedChargeCd ? valueToCode.fedChargeCd(member.fedChargeCd)?.toString().padStart(2, '0') : '')
      /*State/Fed Chg Date------*/+ ',' + (formatDate(member.fedChargeDate, 'mmddyy') || '')
      /*TASA--------------------*/+ ',' + (valueToCode.tasa(member.tasa) || '')
      /*EMP---------------------*/+ ',' + (valueToCode.employability(member.emp) || '')
      /*SSI---------------------*/+ ',' + (valueToCode.ssiIndicator(member.ssi) || '')
      /*BCS---------------------*/+ ',' + (valueToCode.bcs(member.bcs) || '')
      /*Relationship to applicant*/+',' + (member.relationshipToApplicant ? valueToCode.relationship(member.relationshipToApplicant)?.toString().padStart(2, '0') : '')
      /*CIBIC CC----------------*/+ ',' + (valueToCode.cbicCc(member.cbicCc) || '')
      /*CIBIC CDC---------------*/+ ',' + (valueToCode.cbicCdc(member.cbicCdc) || '')
      /*Student ID--------------*/+ ',' + (member.studentId || '')
      /*ACI---------------------*/+ ',' + (valueToCode.alienIndicator(member.aci) || '')
      /*Alien #-----------------*/+ ',' + (member.alienNumber || '')
      /*Alien Date of Entry-----*/+ ',' + (formatDate(member.alienDateOfEntry, 'mmddyyyy') || '')
      /*Marital Status----------*/+ ',' + (valueToCode.maritalStatus(member.maritalStatus) || '')
      /*Education Level---------*/+ ',' + (member.educationLevel ? member.educationLevel.toString().padStart(2, '0') : '')
      /*Alien Date Entered------*/+ ',' + (formatDate(member.alienDateEnteredCountry, 'mmddyyyy') || '')
      /*PID---------------------*/+ ',' + (member.pid || '')
      /*Filler /SSN Validation--*/+ ',' + (member.documentVerifications.ssn ? 'Y' : 'N')
      /*DOH Birth Verification--*/+ ',' + (member.documentVerifications.dohBirth ? 'Y' : 'N')
      /*WMS Cat Cd--------------*/+ ',' + ''//(member.documentVerifications.wmsCatCD ? 'Y' : 'N')
      /*DAI---------------------*/+ ',' + ''//(member.documentVerifications.dai ? 'Y' : 'N')
      /*NH Stay-----------------*/+ ',' + (member.documentVerifications.nhStay ? 'Y' : 'N')
      /*Submission of MAP-3044--*/+ ',' + (member.documentVerifications.map3044 ? 'Y' : 'N')
      /*Submission of DOH-5178A-*/+ ',' + (member.documentVerifications.doh5178A ? 'Y' : 'N')
      /*Submission of DOH-4495A-*/+ ',' + (member.documentVerifications.doh4495A ? 'Y' : 'N')
      /*Submission of DOH-5149--*/+ ',' + ''//(member.documentVerifications.doh5149 ? 'Y' : 'N')
      /*Gender------------------*/+ ',' + (valueToCode.gender(member.gender) || '') + '\n';
    });

  } catch (error) {
    logger.error(error);
  }
  const fileName = `${SUBMITTER_ID}${UNIQUE_UID}${formatDate(SIGNATURE_DATE, 'mmddyy')}`;
  const folderName = `${formatDate(new Date(), 'mmddyyyy')}${getBatchNumber()}`;
  const filePath = `processed_files/${folderName}/${folderName}`;
  
  // Image Record
  for (let i = 0; i < noOfDocuments; i++) {
    try {
      const imageFileName = `${fileName}${(i + 1).toString().padStart(4, '0')}.pdf`;
      const imageFilePath = `${filePath}/${imageFileName}`;
      const pageCount = await countPdfPages(imageFilePath);
      IMAGE_RECORD += 'I'
      /*Image Filename----------*/+ ',' + imageFileName
      /*Sequence#---------------*/+ ',' + (i + 1).toString().padStart(4, '0')
      /*Multi Page Count--------*/+ ',' + pageCount.toString().padStart(3, '0')
      /*Doc Category Code-------*/+ ',' + ''
      /*Doc Type----------------*/+ ',' + '' + '\n';
    } catch (error) {
      logger.error(error);
    }
  }

  try {
    TRAILER_RECORD = 'T,' + formatDate(new Date(), 'mm/dd/yy');
  } catch (error) {
    logger.error(error);
  }

  const finalText = `${HEADER_RECORD}${DATA_RECORD}${NHTX_RECORD}${HOUSEHOLD_COMPOSITION_RECORD}${IMAGE_RECORD}${TRAILER_RECORD}`;

  return finalText;
};

