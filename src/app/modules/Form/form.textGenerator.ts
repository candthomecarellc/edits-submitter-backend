import logger from '../../utils/logger';
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
    const caseName = `${data['caseName.lastName']} ${data['caseName.firstName']}`;
    const noOfNHTXRecords = '';
    const applcationType = "MA";
    const priority = "";
    const clientNoticeLanguage = (data.clientNoticeLanguage || '') === 'spanish' ? 'S' : 'E';
    const languageRead = generateLanguageCode(data['personalInfo.languageRead'] || '');
    const dateAdmitted_SNF = "";
    const residenceAddressHouse = data['homeAddress.apt'] || '';
    const residenceAddressStreet = data['homeAddress.street'] || '';
    const residenceAddressApt = data['homeAddress.apt'] || '';
    const residenceAddressCity = data['homeAddress.city'] || '';
    const residenceAddressState = data['homeAddress.state'] || '';
    const residenceAddressZipCode = data['homeAddress.zip'] || '';
    const residenceAddressPhoneNumber = "";
    const mailingAddressHouse = data['mailingAddress.street'] || '';
    const mailingAddressApt = data['mailingAddress.apt'] || '';
    const mailingAddressCity = data['mailingAddress.city'] || '';
    const mailingAddressState = data['mailingAddress.state'] || '';
    const mailingAddressZipCode = data['mailingAddress.zip'] || '';
    const mail2AssociateName = data['anotherPerson.name'] || '';
    const mail2InCareName = data['anotherPerson.name'] || '';
    const mail2street = data['anotherPerson.street'] || '';
    const mail2City = data['anotherPerson.city'] || '';
    const mail2State = data['anotherPerson.state'] || '';
    const mail2ZipCode = data['anotherPerson.zip'] || '';
    const mail2PhoneNumber = data['anotherPerson.phoneHome'] || '';
    const languageSpoken = generateLanguageCode(data['personalInfo.languageSpeak'] || '');
    const contactName = data.contactName || '';
    const contactPhoneNumber = data.contactPhoneNumber || '';
    const caseComposition = data.caseComposition || '';
    const EDC1 = data.EDC1 || '';
    const EDC2 = data.EDC2 || '';
    const fuelType = data.fuelType || '0';
    const shelterType = data.shelterType || '01';
    const shelterAmount = data.shelterAmount || '0000000';
    const waterAmount = data.waterAmount || '';
    const addTY = data.addTY || '';
    const addTYAmount = data.addTYAmount || '';
    const SSI_DM = data.SSI_DM || '';
    const SSI_LA = data.SSI_LA || '';
    const SSI_noDM = data.SSI_noDM || '';
    const SSI_noAll = data.SSI_noAll || '';
    const SSI_buy = data.SSI_buy || '';
    const chronicCareDate = data['chronicCare.date'] || '01011990';
    const chronicCarePIA = data['chronicCare.PIA'] || '';
    const chronicCareCON = data['chronicCare.CON'] || '';
    const chronicCareAmount = data['chronicCare.amount'] || '';
    const chronicCareLOC = data['chronicCare.LOC'] || '';
    // Earned Income 1 & 2
    const earnedLN = data['earnedIncome.LN'] || '';
    const earnedCTG = data['earnedIncome.CTG'] || '';
    const earnedChildIdentifier = data['earnedIncome.childIdentifier'] || '';
    const earnedChronicCareIndicator = data['earnedIncome.chronicCareIndicator'] || '';
    const earnedEID = data['earnedIncome.EID'] || '';
    const earnedSRC = data['earnedIncome.SRC'] || '';
    const earnedPER = data['earnedIncome.PER'] || '';
    const employmentStatus = data['earnedIncome.employmentStatus'] || '';
    const gross = data['earnedIncome.gross'] || '';
    const INSUR = data['earnedIncome.INSUR'] || '';
    const CTSUP = data['earnedIncome.CTSUP'] || '';
    const WKREL = data['earnedIncome.WKREL'] || '';
    const IRWE = data['earnedIncome.IRWE'] || '';
    // Child Care
    const childCare1MOYR = data['childCare.1MOYR'] || '';
    const childCare1Amount  = data['childCare.1Amount'] || '';
    const childCare2MOYR = data['childCare.2MOYR'] || '';
    const childCare2Amount = data['childCare.2Amount'] || '';
    const childCare3MOYR = data['childCare.3MOYR'] || '';
    const childCare3Amount = data['childCare.3Amount'] || '';
    // Unearned Income 1-6
    const unearnedLN = data['unearnedIncome.LN'] || '';
    const unearnedCTG = data['unearnedIncome.CTG'] || '';
    const unearnedChildIdentifier = data['unearnedIncome.childIdentifier'] || '';
    const unearnedChronicCareIndicator = data['unearnedIncome.chronicCareIndicator'] || '';
    const unearnedIncomeSourceCode= data['unearnedIncome.incomeSourceCode'] || '' ;
    const unearnedPeriod = data['unearnedIncome.period'] || '';
    const unearnedAmount = data['unearnedIncome.amount'] || '';
    const unearnedCD1 = data['unearnedIncome.CD1'] || '';
    const unearnedExempt1 = data['unearnedIncome.exempt1'] || '';
    const unearnedCD2 = data['unearnedIncome.CD2'] || '';
    const unearnedExempt2 = data['unearnedIncome.exempt2'] || '';
    // Resources
    const resourceLN = data['resources.LN'] || '';
    const resourceCategoricalIndicator = data['resources.categoricalIndicator'] || '';
    const resourceChildIdentifier = data['resources.childIdentifier'] || '';
    const resourceChronicCareIndicator= data['resources.chronicCareIndicator'] || '';
    const resourceUnused = data['resources.unused'] || '';
    const resourceCD = data['resources.CD'] || '02';
    const resourceResValue = data['resources.resValue'] || '';
    const resourceUTXN2_Flag= data['resources.UTXN2_Flag'] || '';

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
    // Household Composition Record
    const line = "01";
    const name_First = data?.['familyInfo.0.legalName.firstName'] || '';
    const m = data?.['familyInfo.0.legalName.middleName'] || '';
    const last = data?.['familyInfo.0.legalName.lastName'] || '';
    const birth_date = data?.['familyInfo.0.dateOfBirth'] ? `${data?.['familyInfo.0.dateOfBirth'].month || ''}${data?.['familyInfo.0.dateOfBirth'].day || ''}${data?.['familyInfo.0.dateOfBirth'].year || ''}` : '';
    const sex = data?.['familyInfo.0.sex'] || 'M';
    const ssn = data?.['familyInfo.0.ssn'] || '';
    const ma = data?.['familyInfo.0.isApplying'] || 'Y';
    const resp_adult = data?.['familyInfo.0.isParent'] || 'Y';
    const ethnicH = data?.['familyInfo.0.ethnicH'] || '';
    const ethnicI = data?.['familyInfo.0.ethnicI'] || '';
    const ethnicA = data?.['familyInfo.0.ethnicA'] || '';
    const ethnicB = data?.['familyInfo.0.ethnicB'] || '';
    const ethnicP = data?.['familyInfo.0.ethnicP'] || '';
    const ethnicW = data?.['familyInfo.0.ethnicW'] || '';
    const name_code = data?.['familyInfo.0.nameCode'] || '';
    const aliasFirst = data?.['familyInfo.0.birthName.firstName'] || '';
    const aliasMiddle = data?.['familyInfo.0.birthName.middleName'] || '';
    const aliasLast = data?.['familyInfo.0.birthName.lastName'] || '';
    const pregnant = data?.['familyInfo.0.isPregnant'] || 'N';
    const cin = data?.['householdComposition.cin'] || '';
    const state_charge_cd = data?.['householdComposition.stateChargeCd'] || '';
    const state_chg_date = data['householdComposition.stateChgDate'] || '';
    const TASA = data['householdComposition.TASA'] || '';
    const EMP = data['householdComposition.EMP'] || '';
    const SSI = data['householdComposition.SSI'] || '';
    const BCS = data['householdComposition.BCS'] || '';
    const relationship_to_applicant = data['householdComposition.relationshipToApplicant'] || '01';
    const CIBIC_CC = data['householdComposition.CIBIC_CC'] || '';
    const CIBIC_CDC = data['householdComposition.CIBIC_CDC'] || '';
    const student_ID = data['householdComposition.studentID'] || '';
    const ACI = data['householdComposition.ACI'] || 'C';
    const AlienNo = data['householdComposition.AlienNo'] || '';
    const AlienDOE = data['householdComposition.AlienDOE'] || '';
    const maritalStatus = data['householdComposition.maritalStatus'] || '';
    const educationLevel = data['householdComposition.educationLevel'] || '';
    const alienEnteredCountry = data['householdComposition.alienEnteredCountry'] || '';
    const PID = data['householdComposition.PID'] || '';
    const SSN_Validation = data['householdComposition.SSN_Validation'] || '';
    const DOH_BirthVerification = data['householdComposition.DOH_BirthVerification'] || '';
    const WMS_Cat_CD = data['householdComposition.WMS_Cat_CD'] || '';
    const DAI = data['householdComposition.DAI'] || '';
    const NH_Stay = data['householdComposition.NH_Stay'] || '';
    const sub_MAP3044 = data['householdComposition.sub_MAP3044'] || '';
    const sub_DOH5178A = data['householdComposition.sub_DOH5178A'] || '';
    const sub_DOH4495A = data['householdComposition.sub_DOH4495A'] || '';
    const sub_DOH5149 = data['householdComposition.sub_DOH5149'] || '';
    const gender = data['householdComposition.gender'] || '';

    
    HOUSEHOLD_COMPOSITION_RECORD = `M,${line},${name_First},${m},${last},${birth_date},${sex},${ssn},${ma},${resp_adult},${ethnicH},${ethnicI},${ethnicA},${ethnicB},${ethnicP},${ethnicW},${name_code},${aliasFirst},${aliasMiddle},${aliasLast},${pregnant},${cin},${state_charge_cd},${state_chg_date},${TASA},${EMP},${SSI},${BCS},${relationship_to_applicant},${CIBIC_CC},${CIBIC_CDC},${student_ID},${ACI},${AlienNo},${AlienDOE},${maritalStatus},${educationLevel},${alienEnteredCountry},${PID},${SSN_Validation},${DOH_BirthVerification},${WMS_Cat_CD},${DAI},${NH_Stay},${sub_MAP3044},${sub_DOH5178A},${sub_DOH4495A},${sub_DOH5149},${gender}`;

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

  const finalText = `${HEADER_RECORD}\n${DATA_RECORD}${NHTX_RECORD}\n${HOUSEHOLD_COMPOSITION_RECORD}\n${IMAGE_RECORD}\n${TRAILER_RECORD}`;

  return finalText;
};

export { formTextGenerator };
