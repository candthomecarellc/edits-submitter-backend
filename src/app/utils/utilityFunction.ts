import * as fs from 'fs';
import * as path from 'path';
import logger from './logger';
import { isObjectIdOrHexString } from 'mongoose';
import { PDFDocument } from 'pdf-lib';

// this function is used to generate the record sent
const generateRecordSent = (record?: string) => {
  // 00000001 is first record , then 00000002 , 00000003 , 00000004 , 00000005 , 00000006 , 00000007 , 00000008 , 00000009 , 00000010 so on
  const existingRecord = record || '00000000'; // this is the existing record come from the database

  const newRecord = parseInt(existingRecord) + 1;

  return newRecord.toString().padStart(8, '0');
};

const generateSubmitionType = (type: string) => {
  if (type === 'new') {
    return 'N';
  }
  if (type === 'resubmit') {
    return 'R';
  }
  if (type === 'deferral extension') {
    return 'D';
  }
  else {
    return 'N';
  }
};

// this function is used to manipulate the date
const formatDate = (SubmitedDate: Date, format: 'mmddyyyy' | 'mmddyy' | 'mm/dd/yyyy' | 'mm/dd/yy') => {
  const date = new Date(SubmitedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based in JavaScript
  const day = date.getDate().toString().padStart(2, '0'); // Days are 1-based

  if (format === 'mmddyyyy') {
    return `${month}${day}${year}`;
  }

  if (format === 'mmddyy') {
    return `${month}${day}${year.toString().slice(-2)}`;
  }

  if (format === 'mm/dd/yyyy') {
    return `${month}/${day}/${year}`;
  }

  if (format === 'mm/dd/yy') {
    return `${month}/${day}${year.toString().slice(-2)}`;
  }
  return '';
};

const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}${minute}`;
};

// this function is used to generate the unique patient UID
/**
 * Path to the UIDs database file
 */
const DB_FILE_PATH = path.join(__dirname, 'patientUIDs.json');

/**
 * Local database to store previously generated UIDs
 */
let generatedUIDs: Set<string>;

/**
 * Load UIDs from the database file
 */
function loadUIDs(): void {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      const uids = JSON.parse(data);
      generatedUIDs = new Set(uids);
    } else {
      generatedUIDs = new Set<string>();
    }
  } catch (error) {
    logger.error('Error loading UIDs database:', error);
    generatedUIDs = new Set<string>();
  }
}

/**
 * Save UIDs to the database file
 */
function saveUIDs(): void {
  try {
    const data = JSON.stringify(Array.from(generatedUIDs));
    fs.writeFileSync(DB_FILE_PATH, data);
  } catch (error) {
    logger.error('Error saving UIDs database:', error);
  }
}

// Initialize the database
loadUIDs();


const COUNT_FILE_PATH = path.join(__dirname, 'counts.json');

interface Counts {
  patientUID: string;
  batchCount: string;
}

let counts: Counts = {
  patientUID: "0",
  batchCount: "0"
};

function loadCounts(): void {
  try {
    if (fs.existsSync(COUNT_FILE_PATH)) {
      const data = fs.readFileSync(COUNT_FILE_PATH, 'utf-8');
      counts = JSON.parse(data);
    } else {
      counts = {
        patientUID: "0",
        batchCount: "0",
      };
    }
  } catch (error) {
    logger.error('Error loading Counts database:', error);
    counts = {
      patientUID: "0",
      batchCount: "0",
    };
  }
}

/**
 * Save UIDs to the database file
 */
function saveCounts(): void {
  try {
    const data = JSON.stringify(counts);
    fs.writeFileSync(COUNT_FILE_PATH, data);
  } catch (error) {
    logger.error('Error saving Counts database:', error);
  }
}


// Initialize the database
loadCounts();
/**
 * Helper function to generate the next sequential UID
 * Format: CNT[A-Z]00001, CNT[A-Z]00002, etc.
 * @returns string - The next sequential UID
 */
function generateNextSequentialUID(): string {
  // Get all existing UIDs
  const existingUIDs = Array.from(generatedUIDs);

  if (existingUIDs.length === 0) {
    // If no UIDs exist, start with CNTA000001
    return 'CNTA000001';
  }

  // Sort existing UIDs to find the last one
  existingUIDs.sort();
  const lastUID = existingUIDs[existingUIDs.length - 1];

  // Extract the letter and number parts
  const letter = lastUID[3]; // Get the letter (A, B, etc.)
  const number = parseInt(lastUID.slice(4)); // Get the number part

  if (number >= 999999) {
    // If we've reached 999999, move to the next letter
    const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
    return `CNT${nextLetter}000001`;
  } else {
    // Increment the number and pad with zeros
    return `CNT${letter}${(number + 1).toString().padStart(6, '0')}`;
  }
}
/**
 * Comprehensive function to handle all UID operations:
 * - Generate new UIDs
 * - Validate existing UIDs
 * - Save UIDs to database
 * - Get UID count
 *
 * @param operation - The operation to perform: 'generate', 'validate', or 'count'
 * @param existingUID - Optional existing UID to check or use
 * @returns The result based on the operation (string UID, boolean validation result, or number count)
 */
function handlePatientUID(
  operation: 'generate' | 'validate' | 'count',
  existingUID?: string,
): string | boolean | number {
  // For generating a new UID or using an existing one
  if (operation === 'generate') {
    let uid: string;
    if (existingUID) {
      // If an existing UID is provided, check if it exists
      if (!generatedUIDs.has(existingUID)) {
        // If it doesn't exist, use it
        uid = existingUID;
      } else {
        // If it exists, generate a new one
        uid = generateNextSequentialUID();
      }
    } else {
      // No existing UID provided, generate a new one
      uid = generateNextSequentialUID();
    }

    // Add the new UID to our database and save
    generatedUIDs.add(uid);
    saveUIDs();

    return uid;
  }

  // For validating if a UID exists
  if (operation === 'validate' && existingUID) {
    return generatedUIDs.has(existingUID);
  }

  // For getting the count of UIDs
  if (operation === 'count') {
    return generatedUIDs.size;
  }

  // Default return for invalid operations
  return false;
}

// Wrapper functions for backward compatibility
function ensureUniqueUID(existingUID?: string): string {
  return handlePatientUID('generate', existingUID) as string;
}

function isUIDGenerated(uid: string): boolean {
  return handlePatientUID('validate', uid) as boolean;
}

function getGeneratedUIDCount(): number {
  return handlePatientUID('count') as number;
}

const generateImageRecords = (noOfImageRecords: number) => {
  // 'file number will be like 001,002, .... 999' convert actual number to this format
  const imageRecords = noOfImageRecords.toString().padStart(3, '0');
  return imageRecords;
};

const generateUniqueCaseId = (submitterId: string, uniqueUID: string, signatureDate: Date) => {
  // this will be total 20 digit unique case id
  const currentDate = new Date(signatureDate);
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const uniqueCaseId = `${submitterId}${uniqueUID}${month}${day}${year}`;
  return uniqueCaseId;
};

const createUniqueUID = () => {
  const currentUID = parseInt(counts.patientUID);
  const newUID = (currentUID + 1).toString().padStart(6, '0');
  counts.patientUID = newUID;
  const uniqueUID = `CNTA${newUID}`;
  saveCounts();
  return uniqueUID;
};

const getUniqueUID = () => {
  const currentUID = parseInt(counts.patientUID);
  return `CNTA${currentUID.toString().padStart(6, '0')}`;
};

const updateBatchNumber = () => {
  const currentBatch = parseInt(counts.batchCount);
  const newBatch = (currentBatch + 1).toString().padStart(4, '0');
  counts.batchCount = newBatch;
  saveCounts();
  return newBatch;
};

const getBatchNumber = () => {
  return counts.batchCount.toString().padStart(4, '0');
};

const createFolder = () => {
  const path = `processed_files/${formatDate(new Date(), 'mmddyyyy')}${getBatchNumber()}`;
  fs.mkdirSync(path, { recursive: true });
  return path;
};

const getSubmitterId = () => {
  return '0004';
};

const countPdfPages = async (filePath: string): Promise<number> => {
    try {
        // Check if file exists at the path
        if (!fs.existsSync(filePath)) {
            logger.error(`File not found at path: ${filePath}`);
            throw new Error(`File not found at path: ${filePath}`);
        }
        
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        return pdfDoc.getPageCount();
    } catch (error: any) {
        logger.error('Error counting PDF pages:', error);
        throw new Error(`Failed to count PDF pages: ${error.message}`);
    }
}

export {
  formatDate,
  ensureUniqueUID,
  generateImageRecords,
  generateRecordSent,
  generateSubmitionType,
  generateUniqueCaseId,
  getGeneratedUIDCount,
  isUIDGenerated,
  createUniqueUID,
  updateBatchNumber,
  getBatchNumber,
  loadCounts,
  createFolder,
  getSubmitterId,
  getUniqueUID,
  countPdfPages,
  getTime,
};
