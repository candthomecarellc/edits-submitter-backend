import logger from '../../utils/logger';
import { codeToValue } from '../../utils/codeToValue';
import { valueToCode } from '../../utils/valueToCode';
import {
  formatDate,
  generateRecordSent,
  generateSubmitionType,
  generateUniqueCaseId,
  getUniqueUID,
  getBatchNumber,
  countPdfPages,
  getTime,
} from '../../utils/utilityFunction';
import { generateLanguageCode } from '../../utils/languageCode';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formTextGenerator = async (data:any, file: Express.Multer.File[]) => {
  let HEADER_RECORD = '';
  let DATA_RECORD = '';
  let NHTX_RECORD = '';
  let HOUSEHOLD_COMPOSITION_RECORD = '';
  let IMAGE_RECORD = '';
  let TRAILER_RECORD = '';

  const SUBMITTER_ID = '0004';
  const noOfImageRecords = (file.length + 1).toString().padStart(3, '0');
  const uniqueUID = getUniqueUID();

  try {
    const submitionType = 'H';
    const RECORD_SENT = generateRecordSent();
    const SUBMISSION_DATE = formatDate(new Date(), 'mmddyyyy') || '';
    const SUBMISSION_TIME = getTime() || '';
    const PROVIDER_ID = '01215512';
    HEADER_RECORD = `${submitionType},${SUBMITTER_ID},${RECORD_SENT},${SUBMISSION_DATE},${SUBMISSION_TIME},${PROVIDER_ID},`;
  } catch (error) {
    logger.error(error);
  }

  try {
    // Data Record
    const submitionType = generateSubmitionType(data.submitionType);
    const noOfHHCompRecordsExpected = data.noOfHHCompRecordsExpected || '';
    const deferralExtensionDays = data.deferralExtensionDays || '';
    const uniqCaseId = generateUniqueCaseId(SUBMITTER_ID, uniqueUID, data.signatureDate);
    const uniqueTIFFID = uniqCaseId;
    const signatureDate = formatDate(data.signatureDate, 'mm/dd/yy');
    const caseName = `${data?.caseName?.lastName} ${data?.caseName?.firstName}`;
    const noOfNHTXRecords = '';
    const applcationType = "MA";
    const priority = "";
    const clientNoticeLanguage = (data?.clientNoticeLanguage || '') === 'spanish' ? 'S' : 'E';
    const languageRead = generateLanguageCode(data?.personalInfo?.languageRead || '');
    const dateAdmitted_SNF = "";
    const residenceAddressHouse = data?.homeAddress?.apt || '';
    const residenceAddressStreet = data?.homeAddress?.street || '';
    const residenceAddressApt = data?.homeAddress?.apt || '';
    const residenceAddressCity = data?.homeAddress?.city || '';
    const residenceAddressState = data?.homeAddress?.state || '';
    const residenceAddressZipCode = data?.homeAddress?.zip || '';
    const residenceAddressPhoneNumber = "";
    const mailingAddressHouse = data?.mailingAddress?.street || '';
    const mailingAddressApt = data?.mailingAddress?.apt || '';
    const mailingAddressCity = data?.mailingAddress?.city || '';
    const mailingAddressState = data?.mailingAddress?.state || '';
    const mailingAddressZipCode = data?.mailingAddress?.zip || '';
    const mail2AssociateName = data?.anotherPerson?.name || '';
    const mail2InCareName = data?.anotherPerson?.name || '';
    const mail2street = data?.anotherPerson?.street || '';
    const mail2City = data?.anotherPerson?.city || '';
    const mail2State = data?.anotherPerson?.state || '';
    const mail2ZipCode = data?.anotherPerson?.zip || '';
    const mail2PhoneNumber = data?.anotherPerson?.phoneHome || '';
    const languageSpoken = generateLanguageCode(data?.personalInfo?.languageSpeak || '');
    const contactName = data.contactName || '';
    const contactPhoneNumber = data.contactPhoneNumber || '';
    const caseComposition = data?.caseComposition || '';
    const EDC1 = data?.EDC1 ? formatDate(data?.EDC1, 'mmddyy') : '';
    const EDC2 = data?.EDC2 ? formatDate(data?.EDC2, 'mmddyy') : '';
    const fuelType = valueToCode.fuelType(data?.fuelType) || '0';
    const shelterType = valueToCode.shelterTypes(data?.shelterType) || '01';
    const shelterAmount = data?.shelterAmount || '0000000';
    const waterAmount = data?.waterAmount || '';
    const addTY = valueToCode.additionalAllowanceTypes(data?.addTY) || '';
    const addTYAmount = data?.addTYAmount || '';
    const SSI_DM = data?.SSI_DM || '';
    const SSI_LA = data?.SSI_LA || '';
    const SSI_noDM = data?.SSI_noDM || '';
    const SSI_noAll = data?.SSI_noAll || '';
    const SSI_buy = data?.SSI_buy || '';
    const chronicCareDate = formatDate(data?.chronicCare?.date, 'mmddyyyy') || '01011990';
    const chronicCarePIA = data?.chronicCare?.PIA || '';
    const chronicCareCON = valueToCode.chronicCareCon(data?.chronicCare?.CON) || '';
    const chronicCareAmount = data?.chronicCare?.amount || '';
    const chronicCareLOC = data?.chronicCare?.LOC || '';
    // Earned Income 1 & 2
    const earnedLN = data?.earnedIncome?.LN || '';
    const earnedCTG = valueToCode.ctg(data?.earnedIncome?.CTG) || '';
    const earnedChildIdentifier = data?.earnedIncome?.childIdentifier || '';
    const earnedChronicCareIndicator = data?.earnedIncome?.chronicCareIndicator || '';
    const earnedEID = data?.earnedIncome?.EID || '';
    const earnedSRC = valueToCode.earnedIncomeSources(data?.earnedIncome?.SRC) || '';
    const earnedPER = valueToCode.period(data?.earnedIncome?.PER) || '';
    const employmentStatus = data?.earnedIncome?.employmentStatus === 'full-time' ? 'F' : data?.earnedIncome?.employmentStatus === 'part-time' ? 'P' : '';
    const gross = data?.earnedIncome?.gross || '';
    const INSUR = data?.earnedIncome?.INSUR || '';
    const CTSUP = data?.earnedIncome?.CTSUP || '';
    const WKREL = data?.earnedIncome?.WKREL || '';
    const IRWE = data?.earnedIncome?.IRWE || '';
    // Child Care
    const childCare1MOYR = data?.child_Care?.MOYR1 || '';
    const childCare1Amount  = data?.child_Care?.amount1 || '';
    const childCare2MOYR = data?.child_Care?.MOYR2 || '';
    const childCare2Amount = data?.child_Care?.amount2 || '';
    const childCare3MOYR = data?.child_Care?.MOYR3 || '';
    const childCare3Amount = data?.child_Care?.amount3 || '';
    // Unearned Income 1-6
    const unearnedLN = data?.unearned_Income?.LN || '';
    const unearnedCTG = valueToCode.ctg(data?.unearned_Income?.CTG) || '';
    const unearnedChildIdentifier = data?.unearned_Income?.childIdentifier || '';
    const unearnedChronicCareIndicator = data?.unearned_Income?.chronicCareIndicator || '';
    const unearnedIncomeSourceCode= valueToCode.unearnedIncomeSources(data?.unearned_Income?.incomeSourceCode) || '' ;
    const unearnedPeriod = valueToCode.period(data?.unearned_Income?.period) || '';
    const unearnedAmount = data?.unearned_Income?.amount || '';
    const unearnedCD1 = valueToCode.unearnedIncomeCd(data?.unearned_Income?.CD1) || '';
    const unearnedExempt1 = data?.unearned_Income?.exempt1 || '';
    const unearnedCD2 = valueToCode.unearnedIncomeCd(data?.unearned_Income?.CD2) || '';
    const unearnedExempt2 = data?.unearnedIncome?.exempt2 || '';
    // Resources
    const resourceLN = data?.resource?.LN || '';
    const resourceCategoricalIndicator = valueToCode.ctg(data?.resource?.categoricalIndicator) || '';
    const resourceChildIdentifier = data?.resource?.childIdentifier || '';
    const resourceChronicCareIndicator= data?.resource?.chronicCareIndicator || '';
    const resourceUnused = data?.resource?.unused || '';
    const resourceCD = valueToCode.resourceCd(data?.resource?.CD) || '';
    const resourceResValue = data?.resource?.resValue || '';
    const resourceUTXN2_Flag= valueToCode.utxn2Flag(data?.resource?.UTXN2_Flag) || '';

    DATA_RECORD = `${submitionType},${noOfHHCompRecordsExpected || deferralExtensionDays || ''},${noOfImageRecords},${uniqCaseId},${uniqueTIFFID},${signatureDate},${caseName},${noOfNHTXRecords},${applcationType},${priority},${clientNoticeLanguage},${languageRead},${dateAdmitted_SNF},${residenceAddressHouse},${residenceAddressStreet},${residenceAddressApt},${residenceAddressCity},${residenceAddressState},${residenceAddressZipCode},${residenceAddressPhoneNumber},${mailingAddressHouse},${mailingAddressApt},${mailingAddressCity},${mailingAddressState},${mailingAddressZipCode},${mail2AssociateName},${mail2InCareName},${mail2street},${mail2City},${mail2State},${mail2ZipCode},${mail2PhoneNumber},${languageSpoken},${contactName},${contactPhoneNumber},${caseComposition},${EDC1},${EDC2},${fuelType},${shelterType},${shelterAmount},${waterAmount},${addTY},${addTYAmount},${SSI_DM},${SSI_LA},${SSI_noDM},${SSI_noAll},${SSI_buy},${chronicCareDate},${chronicCarePIA},${chronicCareCON},${chronicCareAmount},${chronicCareLOC},${earnedLN},${earnedCTG},${earnedChildIdentifier},${earnedChronicCareIndicator},${earnedEID},${earnedSRC},${earnedPER},${employmentStatus},${gross},${INSUR},${CTSUP},${WKREL},${IRWE},${childCare1MOYR},${childCare1Amount},${childCare2MOYR},${childCare2Amount},${childCare3MOYR},${childCare3Amount},${unearnedLN},${unearnedCTG},${unearnedChildIdentifier},${unearnedChronicCareIndicator},${unearnedIncomeSourceCode},${unearnedPeriod},${unearnedAmount},${unearnedCD1},${unearnedExempt1},${unearnedCD2},${unearnedExempt2},${resourceLN},${resourceCategoricalIndicator},${resourceChildIdentifier},${resourceChronicCareIndicator},${resourceUnused},${resourceCD},${resourceResValue},${resourceUTXN2_Flag},`;
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

  try {
    for (let i = 0; i < data?.householdComposition?.length; i++) {
      // Household Composition Record
      const line = data?.householdComposition[i]?.line;
      const name_First = data?.householdComposition[i]?.name_First || '';
      const m = data?.householdComposition[i]?.name_Middle || '';
      const last = data?.householdComposition[i]?.name_Last || '';
      const birth_date = formatDate(data?.householdComposition[i]?.birth_date, 'mmddyyyy') || '';
      const sex = valueToCode.sex(data?.householdComposition[i]?.sex) || '';
      const ssn = data?.householdComposition[i]?.ssn || '';
      const ma = data?.householdComposition[i]?.ma ? 'Y' : 'N';
      const resp_adult = data?.householdComposition[i]?.resp_adult ? 'Y' : 'N';
      const ethnicH = data?.householdComposition[i]?.ethnicH === 'yes' ? 'Y' : data?.householdComposition[i]?.ethnicH === 'no' ? 'N' : data?.householdComposition[i]?.ethnicH === 'unknown' ? 'U' : '';
      const ethnicI = data?.householdComposition[i]?.ethnicI === 'yes' ? 'Y' : data?.householdComposition[i]?.ethnicI === 'no' ? 'N' : data?.householdComposition[i]?.ethnicI === 'unknown' ? 'U' : '';
      const ethnicA = data?.householdComposition[i]?.ethnicA === 'yes' ? 'Y' : data?.householdComposition[i]?.ethnicA === 'no' ? 'N' : data?.householdComposition[i]?.ethnicA === 'unknown' ? 'U' : '';
      const ethnicB = data?.householdComposition[i]?.ethnicB === 'yes' ? 'Y' : data?.householdComposition[i]?.ethnicB === 'no' ? 'N' : data?.householdComposition[i]?.ethnicB === 'unknown' ? 'U' : '';
      const ethnicP = data?.householdComposition[i]?.ethnicP === 'yes' ? 'Y' : data?.householdComposition[i]?.ethnicP === 'no' ? 'N' : data?.householdComposition[i]?.ethnicP === 'unknown' ? 'U' : '';
      const ethnicW = data?.householdComposition[i]?.ethnicW === 'yes' ? 'Y' : data?.householdComposition[i]?.ethnicW === 'no' ? 'N' : data?.householdComposition[i]?.ethnicW === 'unknown' ? 'U' : '';
      const name_code = data?.householdComposition[i]?.name_code === 'alias' ? 'A' : data?.householdComposition[i]?.name_code === 'maiden' ? 'M' : '';
      const aliasFirst = data?.householdComposition[i]?.aliasFirst || '';
      const aliasMiddle = data?.householdComposition[i]?.aliasMiddle || '';
      const aliasLast = data?.householdComposition[i]?.aliasLast || '';
      const pregnant = data?.householdComposition[i]?.pregnant ? 'Y' : 'N';
      const cin = data?.householdComposition[i]?.cin || '';
      const state_charge_cd = valueToCode.fedChargeCd(data?.householdComposition[i]?.state_charge_cd) || '';
      const state_chg_date = formatDate(data?.householdComposition[i]?.state_chg_date, 'mmddyy') || '';
      const TASA = valueToCode.tasa(data?.householdComposition[i]?.TASA) || '';
      const EMP = valueToCode.employability(data?.householdComposition[i]?.EMP) || '';
      const SSI = valueToCode.ssiIndicator(data?.householdComposition[i]?.SSI) || '';
      const BCS = valueToCode.bcs(data?.householdComposition[i]?.BCS) || '';
      const relationship_to_applicant = valueToCode.relationship(data?.householdComposition[i]?.relationship_to_applicant) || '';
      const CIBIC_CC = valueToCode.cbicCc(data?.householdComposition[i]?.CIBIC_CC) || '';
      const CIBIC_CDC = valueToCode.cbicCdc(data?.householdComposition[i]?.CIBIC_CDC) || '';
      const student_ID = data?.householdComposition[i]?.student_ID || '';
      const ACI = valueToCode.alienIndicator(data?.householdComposition[i]?.ACI) || '';
      const AlienNo = data?.householdComposition[i]?.AlienNo || '';
      const AlienDOE = formatDate(data?.householdComposition[i]?.AlienDOE, 'mmddyyyy') || '';
      const maritalStatus = valueToCode.maritalStatus(data?.householdComposition[i]?.maritalStatus) || '';
      const educationLevel = data?.householdComposition[i]?.educationLevel ? data?.householdComposition[i]?.educationLevel.toString().padStart(2, '0') : '';
      const alienEnteredCountry = formatDate(data?.householdComposition[i]?.alienEnteredCountry, 'mmddyyyy') || '';
      const PID = data?.householdComposition[i]?.PID || '';
      const SSN_Validation = data?.householdComposition[i]?.SSN_Validation || '';
      const DOH_BirthVerification = data?.householdComposition[i]?.DOH_BirthVerification || '';
      const WMS_Cat_CD = data?.householdComposition[i]?.WMS_Cat_CD || '';
      const DAI = data?.householdComposition[i]?.DAI || '';
      const NH_Stay = data?.householdComposition[i]?.NH_Stay || '';
      const sub_MAP3044 = data?.householdComposition[i]?.sub_MAP3044 || '';
      const sub_DOH5178A = data?.householdComposition[i]?.sub_DOH5178A || '';
      const sub_DOH4495A = data?.householdComposition[i]?.sub_DOH4495A || '';
      const sub_DOH5149 = data?.householdComposition[i]?.sub_DOH5149 || '';
      const gender = data?.householdComposition[i]?.gender || '';

      
      HOUSEHOLD_COMPOSITION_RECORD += `M,${line},${name_First},${m},${last},${birth_date},${sex},${ssn},${ma},${resp_adult},${ethnicH},${ethnicI},${ethnicA},${ethnicB},${ethnicP},${ethnicW},${name_code},${aliasFirst},${aliasMiddle},${aliasLast},${pregnant},${cin},${state_charge_cd},${state_chg_date},${TASA},${EMP},${SSI},${BCS},${relationship_to_applicant},${CIBIC_CC},${CIBIC_CDC},${student_ID},${ACI},${AlienNo},${AlienDOE},${maritalStatus},${educationLevel},${alienEnteredCountry},${PID},${SSN_Validation},${DOH_BirthVerification},${WMS_Cat_CD},${DAI},${NH_Stay},${sub_MAP3044},${sub_DOH5178A},${sub_DOH4495A},${sub_DOH5149},${gender}\n`;
    }
  } catch (error) {
    logger.error(error);
  }
  const fileName = `${SUBMITTER_ID}${uniqueUID}${formatDate(data.signatureDate, 'mmddyy')}`;
  const folderName = `${formatDate(new Date(), 'mmddyyyy')}${getBatchNumber()}`;
  const filePath = `processed_files/${folderName}/${folderName}`;
  
  // Initialize IMAGE_RECORD as an array
  const imageRecords: string[] = [];
  
  for (let i = 0; i < parseInt(noOfImageRecords); i++) {
    try {
      const imageFileName = `${fileName}${(i + 1).toString().padStart(4, '0')}.pdf`;
      const imageFilePath = `${filePath}/${imageFileName}`;
      const sequenceNumber = (i + 1).toString().padStart(4, '0');
      const pageCount = await countPdfPages(imageFilePath);
      const multiPageCount = pageCount.toString().padStart(3, '0');
      const docCategory = '';
      const docType = '';
      imageRecords.push(`I,${imageFileName},${sequenceNumber},${multiPageCount},${docCategory},${docType}`);
    } catch (error) {
      logger.error(error);
    }
  }

  // Join all image records with newlines
  IMAGE_RECORD = imageRecords.join('\n');
  try {
    const submissionDate = formatDate(new Date(), 'mm/dd/yyyy');
    TRAILER_RECORD = `T,${submissionDate}`;
  } catch (error) {
    logger.error(error);
  }

  const finalText = `${HEADER_RECORD}\n${DATA_RECORD}${NHTX_RECORD}\n${HOUSEHOLD_COMPOSITION_RECORD}${IMAGE_RECORD}\n${TRAILER_RECORD}`;

  return finalText;
};

export { formTextGenerator };
