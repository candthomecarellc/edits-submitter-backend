export interface BatchLog {
    Batch_File_Record_Indicator : string;
    File_Name : string;
    Date_Received : string;
    Batch_File_Status : string;
    Batch_File_Status_Reason : string;
}

export interface ReceptionLog {
    Batch_File_Record_Indicator : string;
    File_Name : string;
    Date_Received : string;
    Batch_File_Status : string;
    Batch_File_Status_Reason : string;
    Case_Record : CaseRecord[];
}

export interface CaseRecord {
    Case_Header_Record_Indicator : string;
    Provider_No : string;
    Unique_Case_ID : string;
    Case_Name : string;
    Case_Message_Record : CaseMessageRecord[];
}

export interface CaseMessageRecord {
    Case_Message_Record_Indicator : string;
    Error_Code : string;
    Error_Message : string;
}

export interface DecisionLog {
    Decision_Record_Indicator : string,
    Provider_No : string,
    Case_Unique_ID : string,
    Case_Number : string,
    Case_Name : string,
    Decision_Code : string,
    Eligibility_From_Date : string,
    Eligibility_To_Date : string,
    Decision_Rendered_Date : string,
    Submission_Type : string,
    File_Name : string,
    Deferral_Number : string,
    Deferral_Date : string,
    Active_App_Reg_No : string,
    Decision_Reason_Record : DecisionReasonRecord[],
    Deferral_Resource_Record : {
        Deferral_Resource_Record : string,
        Institution_Or_Resource : string,
        Account_Type : string,
        Account_No : string,
        Documentation_Needed : string,
        Date : string,
        Amount : string,
    },
    Deferral_Remark_Record : {
        Deferral_Remark_Record : string,
        Remarks : string,
    },
    Household_Member_Record : HouseholdMemberRecord[],
}

export interface DecisionReasonRecord {
    Decision_Reason_Record : string,
    Case_Reason_Code : string,
    Case_Reason_Description : string,
    Move_To_End_Remarks : string,
}

export interface HouseholdMemberRecord {
    Household_Member_Record : string,
    Household_Line_No : string,
    MA_Individual_Status_Code : string,
    MA_Individual_Status_Description : string,
    First_Name : string,
    Last_Name : string,
    CIN : string,
    NAMI_1 : string,
    From_Date1 : string,
    Service_From_Date1 : string,
    Service_To_Date1 : string,
    NAMI_2 : string,
    From_Date2 : string,
    Service_From_Date2 : string,
    Service_To_Date2 : string,
}