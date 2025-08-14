# Batch Log Parser

A comprehensive TypeScript parser for processing batch log files with comma-separated values and new lines.

## Features

- **Multi-format Support**: Parses BatchLog, DecisionLog, and ReceptionLog files
- **CSV Parsing**: Handles quoted fields with commas correctly
- **Type Safety**: Full TypeScript interfaces for all log record types
- **Summary Statistics**: Generates comprehensive summaries of log data
- **Export Options**: Export parsed data to JSON or CSV formats
- **Error Handling**: Robust error handling with detailed logging

## File Structure

The parser expects log files in the `temp/` directory with the following naming convention:
- `BatchLog_MMDDYYYY.txt` - Batch processing results
- `DecisionLog_MMDDYYYY.txt` - Case decision information
- `ReceptionLog_MMDDYYYY.txt` - File reception and error details

## Usage

### Basic Usage

```typescript
import { batchLogParser } from './modules/Response/batchLogParse';

// Parse all logs for a specific date
const date = '08112025';
const allLogs = await batchLogParser.parseAllLogs(date);

console.log(`Total files processed: ${allLogs.summary.totalFiles}`);
console.log(`Files passed: ${allLogs.summary.passedFiles}`);
console.log(`Files failed: ${allLogs.summary.failedFiles}`);
```

### Parse Individual Log Types

```typescript
// Parse only batch log
const batchLog = await batchLogParser.parseBatchLog('08112025');

// Parse only decision log
const decisionLog = await batchLogParser.parseDecisionLog('08112025');

// Parse only reception log
const receptionLog = await batchLogParser.parseReceptionLog('08112025');
```

### Get Available Log Dates

```typescript
// Get all available log dates from temp directory
const availableDates = batchLogParser.getAvailableLogDates();
console.log('Available dates:', availableDates);
```

### Export Data

```typescript
// Export to JSON
batchLogParser.exportToJSON(allLogs, './output/parsed_logs.json');

// Export to CSV
batchLogParser.exportToCSV(allLogs, './output/parsed_logs.csv');
```

## Data Structures

### BatchLogRecord
```typescript
interface BatchLogRecord {
    recordType: string;      // Usually 'F' for File
    fileName: string;        // Name of the processed file
    date: string;           // Processing date (MMDDYYYY)
    status: 'Passed' | 'Failed'; // Processing result
    reason: string;         // Status reason/description
}
```

### DecisionLogRecord
```typescript
interface DecisionLogRecord {
    recordType: string;      // Record type (D, R, RS, RM, H)
    caseId: string;         // Case identifier
    contractNumber: string;  // Contract number
    patientId: string;      // Patient identifier
    patientName: string;    // Patient name
    status: string;         // Case status
    effectiveDate?: string; // Effective date
    endDate?: string;       // End date
    submissionDate: string; // Submission date
    newOrRenewal: string;   // New or renewal indicator
    fileName: string;       // Associated file name
    additionalFields: string[]; // Any additional fields
}
```

### ReceptionLogRecord
```typescript
interface ReceptionLogRecord {
    recordType: string;      // Record type (F, C, M)
    caseId?: string;        // Case identifier (for C records)
    contractNumber?: string; // Contract number (for C records)
    patientName?: string;   // Patient name (for C records)
    errorCode?: string;     // Error code (for M records)
    errorMessage?: string;  // Error message (for M records)
}
```

## Log File Formats

### BatchLog Format
```
F,File_Name_1,08112025,Failed,"Batch File 1 Status Reason, yvjrhfrvj,uytyrbf,uyrtvrvv,gfdhgf, Batch File 1 Status Reason"
F,File_Name_2,08112025,Passed,"Batch File 2 Status Reason, tvhtdt,jytdvb,jhytrvdhytf,jytvrfe, Batch File 2 Status Reason"
```

### DecisionLog Format
```
D,6543,CNT657658765760004,6543654,Jimmy Mars,AC,10152025,10152026,08112025,N,File_Name_3,,,
R,AC,Case Reason Description,Move To End Remarks
H,01,AC,MA Individual Status Description1,Member1 First Name,Member1 Last Name,CIN1,NAMI1,06252025,08012025,08012026
```

### ReceptionLog Format
```
F,File_Name_1,08112025,Failed,"Batch File 1 Status Reason"
C,1111,CNT0004152354750001,Luffy Monkey
M,0,Error Message description
```

## Error Handling

The parser includes comprehensive error handling:
- Missing files are logged as warnings
- Invalid line formats are logged and skipped
- File read errors are caught and logged
- Export errors are caught and thrown

## Testing

Run the test script to verify the parser works with your log files:

```bash
node test-batch-log-parser.js
```

This will:
1. Find available log dates
2. Parse all log files for the first available date
3. Display summary statistics
4. Export parsed data to JSON and CSV files

## Dependencies

- `fs` - File system operations
- `path` - Path manipulation utilities
- TypeScript types for Express and Node.js

## Notes

- The parser automatically handles quoted fields containing commas
- Empty lines are automatically skipped
- All dates are expected in MMDDYYYY format
- File paths are resolved relative to the project root
- Output files are created in the same directory as the input files
