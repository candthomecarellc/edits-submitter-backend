import * as fs from 'fs';

/**
 * Parse batch log file
 */
export const parseBatchLog = (fileName: string, filePath: string) => {

    if (!fs.existsSync(filePath)) {
        console.warn(`Batch log file not found: ${fileName}`);
        return [];
    }

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Handle both Windows (\r\n) and Unix (\n) line endings
        const lines = content.trim().split(/\r?\n/);
        const records = [];

        for (const line of lines) {
            if (line.trim()) {
                const fields = line.split(',');
                const status_reason = line.split('"');
                records.push({
                    Batch_File_Record_Indicator : fields[0]?.trim(),
                    File_Name : fields[1]?.trim(),
                    Date_Received : fields[2]?.trim(),
                    Batch_File_Status : fields[3]?.trim(),
                    Batch_File_Status_Reason : status_reason[1]?.trim(),
                });
            }
        }

        console.log(`Parsed ${records.length} batch log records from ${fileName}`);
        return records;
    } catch (error) {
        console.error(`Error parsing batch log ${fileName}:`, error);
        throw error;
    }
}