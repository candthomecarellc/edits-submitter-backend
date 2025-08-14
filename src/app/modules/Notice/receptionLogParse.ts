import * as fs from 'fs';
import { ReceptionLog } from './notice.interface';
import { codeToValue } from '../../utils/codeToValue';

/**
 * Parse reception log file
 */
export const parseReceptionLog = (fileName: string, filePath: string) => {

    if (!fs.existsSync(filePath)) {
        console.warn(`Reception log file not found: ${fileName}`);
        return [];
    }

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Handle both Windows (\r\n) and Unix (\n) line endings
        const lines = content.trim().split(/\r?\n/);
        const records : ReceptionLog[] = [];
        let batch_index = -1;
        let case_index = -1;

        for (const line of lines) {
            if (line.trim()) {
                const fields = line.split(',');
                const status_reason = line.split('"');
                if (fields[0] === 'F') {
                    batch_index++;
                    records[batch_index] = {
                        Batch_File_Record_Indicator : fields[0]?.trim(),
                        File_Name : fields[1]?.trim(),
                        Date_Received : fields[2]?.trim(),
                        Batch_File_Status : fields[3]?.trim(),
                        Batch_File_Status_Reason : status_reason[1]?.trim(),
                        Case_Record : [],
                    };
                    case_index = -1;
                }
                else if (fields[0] === 'C') {
                    case_index++;
                    records[batch_index].Case_Record[case_index] = {
                        Case_Header_Record_Indicator : fields[0]?.trim(),
                        Provider_No : fields[1]?.trim(),
                        Unique_Case_ID : fields[2]?.trim(),
                        Case_Name : fields[3]?.trim(),
                        Case_Message_Record : [],
                    };
                }
                else if (fields[0] === 'M') {
                    records[batch_index].Case_Record[case_index].Case_Message_Record.push({
                        Case_Message_Record_Indicator : fields[0]?.trim(),
                        Error_Code : codeToValue.errorCodes(parseInt(fields[1]?.trim())) || 'N/A',
                        Error_Message : fields[2]?.trim(),
                    });
                }
            }
        }

        console.log(`Parsed ${records.length} Reception log records from ${fileName}`);
        return records;
    } catch (error) {
        console.error(`Error parsing reception log ${fileName}:`, error);
        throw error;
    }
}
// Function call removed - now called through API