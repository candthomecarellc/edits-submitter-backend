import logger from '../../utils/logger';
import {
  dateMenupulation,
  ensureUniqueUID,
  generateImageRecords,
  generateRecordSent,
  generateSubmitionType,
} from '../../utils/utilityFunction';

const formTextGenerator = (data: any, imageRecords: number) => {
  let HEADER_RECORD = '';
  let DATA_RECORD = '';
  const SUBMITTER_ID = '0004';
  try {
    const RECORD_SENT = generateRecordSent();
    const SUBMISSION_DATE = dateMenupulation('date') || '';
    const SUBMISSION_TIME = dateMenupulation('time') || '';
    const PROVIDER_ID = '01215512';
    HEADER_RECORD = `H,${SUBMITTER_ID},${RECORD_SENT},${SUBMISSION_DATE},${SUBMISSION_TIME},${PROVIDER_ID},`;
  } catch (error) {
    logger.error(error);
  }

  try {
    const submitionType = generateSubmitionType(data.submitionType);
    const noOfHHCompRecordsExpected = data.noOfHHCompRecordsExpected || '';
    const deferralExtensionDays = data.deferralExtensionDays || '';
    const noOfImageRecords = generateImageRecords(imageRecords);
    const uniqCaseId = ensureUniqueUID('generate');
    DATA_RECORD = `${submitionType},${noOfHHCompRecordsExpected || deferralExtensionDays || ''},${noOfImageRecords},${uniqCaseId}`;
  } catch (error) {
    logger.error(error);
  }

  const finalText = `${HEADER_RECORD}\n${DATA_RECORD}`;

  return finalText;
};

export { formTextGenerator };
