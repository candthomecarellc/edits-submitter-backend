import * as fs from 'fs';
import * as path from 'path';
import logger from './logger';

// this function is used to generate the record sent
const generateRecordSent = (record: string) => {
    // 00000001 is first record , then 00000002 , 00000003 , 00000004 , 00000005 , 00000006 , 00000007 , 00000008 , 00000009 , 00000010 so on
    const existingRecord = record || '00000001' // this is the existing record come from the database
    
    const newRecord = parseInt(existingRecord) + 1;

    return newRecord.toString().padStart(8, '0');
}

// this function is used to manipulate the date
const dateMenupulation = (type: string , SubmitedDate?:Date) => {
    const date = SubmitedDate || new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    if (type === 'date') {
        // mmddyyyy
        return `${month}${day}${year}`;
    }

    if (type === 'time') {
        const hour = date.getHours();
        const minute = date.getMinutes();
        // HHMM
        return `${hour}${minute}`;
    }

    if (type === 'sign') {
        // mm/dd/yy
        const formatedYear = year.toString().slice(-2);
        return `${month}/${day}/${formatedYear}`;
    }
}

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

/**
 * Generates the next sequential UID
 * Format: CNT[A-Z]00001, CNT[A-Z]00002, etc.
 * @returns string - The next sequential UID
 */
function generateNextUID(): string {
  // Get all existing UIDs
  const existingUIDs = Array.from(generatedUIDs);

  if (existingUIDs.length === 0) {
    // If no UIDs exist, start with CNTA00001
    return 'CNTA00001';
  }

  // Sort existing UIDs to find the last one
  existingUIDs.sort();
  const lastUID = existingUIDs[existingUIDs.length - 1];

  // Extract the letter and number parts
  const letter = lastUID[3]; // Get the letter (A, B, etc.)
  const number = parseInt(lastUID.slice(4)); // Get the number part

  if (number >= 99999) {
    // If we've reached 99999, move to the next letter
    const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
    return `CNT${nextLetter}00001`;
  } else {
    // Increment the number and pad with zeros
    return `CNT${letter}${(number + 1).toString().padStart(5, '0')}`;
  }
}

/**
 * Comprehensive function to handle UID generation and validation
 * This function will:
 * 1. Check if the UID exists
 * 2. Generate the next sequential UID if it exists
 * 3. Save the new UID to the database
 * 4. Return the unique UID
 *
 * @param existingUID - Optional existing UID to check and regenerate if needed
 * @returns string - A unique sequential patient UID
 */
function ensureUniqueUID(existingUID?: string): string {
  let uid: string;

  // If an existing UID is provided, check if it exists
  if (existingUID) {
    if (!generatedUIDs.has(existingUID)) {
      // If it doesn't exist, use it
      uid = existingUID;
    } else {
      // If it exists, generate the next sequential UID
      uid = generateNextUID();
    }
  } else {
    // No existing UID provided, generate the next sequential UID
    uid = generateNextUID();
  }

  // Add the new UID to our database and save
  generatedUIDs.add(uid);
  saveUIDs();

  return uid;
}

/**
 * Checks if a UID has been previously generated
 * @param uid - The UID to check
 * @returns boolean - True if the UID exists, false otherwise
 */
function isUIDGenerated(uid: string): boolean {
  return generatedUIDs.has(uid);
}

/**
 * Gets the total count of generated UIDs
 * @returns number - The total number of unique UIDs generated
 */
function getGeneratedUIDCount(): number {
  return generatedUIDs.size;
}
    
    


export { generateRecordSent , dateMenupulation , ensureUniqueUID , isUIDGenerated , getGeneratedUIDCount };
