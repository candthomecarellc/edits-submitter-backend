import * as fs from 'fs';
import { DecisionLog } from './notice.interface';
import { codeToValue } from '../../utils/codeToValue';

/**
 * Parse reception log file
 */
export const parseDecisionLog = (fileName: string, filePath: string) => {

    if (!fs.existsSync(filePath)) {
        console.warn(`Decision log file not found: ${fileName}`);
        return [];
    }

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Handle both Windows (\r\n) and Unix (\n) line endings
        const lines = content.trim().split(/\r?\n/);
        const records : DecisionLog[] = [];
        let decision_index = -1;
        let case_index = -1;

        for (const line of lines) {
            if (line.trim()) {
                const fields = line.split(',');
                if (fields[0] === 'D') {
                    decision_index++;
                    records[decision_index] = {
                        Decision_Record_Indicator : fields[0]?.trim(),
                        Provider_No : fields[1]?.trim(),
                        Case_Unique_ID : fields[2]?.trim(),
                        Case_Number : fields[3]?.trim(),
                        Case_Name : fields[4]?.trim(),
                        Decision_Code : codeToValue.maStatus(fields[5]?.trim()) || fields[5]?.trim(),
                        Eligibility_From_Date : fields[6]?.trim(),
                        Eligibility_To_Date : fields[7]?.trim(),
                        Decision_Rendered_Date : fields[8]?.trim(),
                        Submission_Type : fields[9]?.trim() === 'N' ? 'New' : fields[9]?.trim() === 'R' ? 'Resubmit' : fields[9]?.trim(),
                        File_Name : fields[10]?.trim(),
                        Deferral_Number : fields[11]?.trim(),
                        Deferral_Date : fields[12]?.trim(),
                        Active_App_Reg_No : fields[13]?.trim(),
                        Decision_Reason_Record : [],
                        Deferral_Resource_Record : {
                            Deferral_Resource_Record : '',
                            Institution_Or_Resource : '',
                            Account_Type : '',
                            Account_No : '',
                            Documentation_Needed : '',
                            Date : '',
                            Amount : '',
                        },
                        Deferral_Remark_Record : {
                            Deferral_Remark_Record : '',
                            Remarks : '',
                        },
                        Household_Member_Record : [],
                    };
                    case_index = -1;
                }
                else if (fields[0] === 'R') {
                    case_index++;
                    records[decision_index].Decision_Reason_Record.push({
                        Decision_Reason_Record : fields[0]?.trim(),
                        Case_Reason_Code : codeToValue.rejectionCodes(fields[1]?.trim()) || fields[1]?.trim(),
                        Case_Reason_Description : fields[2]?.trim(),
                        Move_To_End_Remarks : fields[3]?.trim(),
                    });
                }
                else if (fields[0] === 'RS') {
                    records[decision_index].Deferral_Resource_Record = {
                        Deferral_Resource_Record : fields[0]?.trim(),
                        Institution_Or_Resource : fields[1]?.trim(),
                        Account_Type : fields[2]?.trim(),
                        Account_No : fields[3]?.trim(),
                        Documentation_Needed : fields[4]?.trim(),
                        Date : fields[5]?.trim(),
                        Amount : fields[6]?.trim(),
                    }
                }
                else if (fields[0] === 'RM') {
                    records[decision_index].Deferral_Remark_Record = {
                        Deferral_Remark_Record : fields[0]?.trim(),
                        Remarks : fields[1]?.trim(),
                    }
                }
                else if (fields[0] === 'H') {
                    records[decision_index].Household_Member_Record.push({
                        Household_Member_Record : fields[0]?.trim(),
                        Household_Line_No : fields[1]?.trim(),
                        MA_Individual_Status_Code : codeToValue.maStatus(fields[2]?.trim()) || fields[2]?.trim(),
                        MA_Individual_Status_Description : fields[3]?.trim(),
                        First_Name : fields[4]?.trim(),
                        Last_Name : fields[5]?.trim(),
                        CIN : fields[6]?.trim(),
                        NAMI_1 : fields[7]?.trim(),
                        From_Date1 : fields[8]?.trim(),
                        Service_From_Date1 : fields[9]?.trim(),
                        Service_To_Date1 : fields[10]?.trim(),
                        NAMI_2 : fields[11]?.trim(),
                        From_Date2 : fields[12]?.trim(),
                        Service_From_Date2 : fields[13]?.trim(),
                        Service_To_Date2 : fields[14]?.trim(),
                    });
                }
            }
        }

        console.log(`Parsed ${records.length} Decision log records from ${fileName}`);
        return records;
    } catch (error) {
        console.error(`Error parsing decision log ${fileName}:`, error);
        throw error;
    }
}