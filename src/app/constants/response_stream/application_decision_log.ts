const APPLICATION_DECISION_LOG = {
    Decision_Record_Indicator : {
        Max_len : 1,
        Field_Type : "A",
        Format : "D",
        Specific_Business_Rules : ""
    },
    Provider_No : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Provider No of the case."
    },
    Case_Unique_ID : {
        Max_Len : 20,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Submitter Unique Case ID"
    },
    Case_Number : {
        Max_Len : 12,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "WMS issued Application Registration Number"
    },
    Case_Name : {
        Max_Len : 28,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : ""
    },
    Decision_Code : {
        Max_Len : 2,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Possible values are: AC - Active, CL - Closed, RJ - Denied, DF - Deferral, CD - Cancel Deferral, DE - Deferral Extension"
    },
    Eligibility_From_Date : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : ""
    },
    Eligibility_To_Date : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : ""
    },
    Decision_Rendered_Date : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : ""
    },
    Submission_Type : {
        Max_Len : 1,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "R - Resubmit, N - New"
    },
    File_Name : {
        Max_Len : 255,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : ""
    },
    Deferral_Number : {
        Max_Len : 1,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "1-First Deferral, 2-Second Deferral, 3-Third Deferral, and so on."
    },
    Deferral_Date : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : ""
    },
    Active_App_Reg_No : {
        Max_Len : 12,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Only filled if Decision Code is RJ and Reason code is 297"
    },
    Decision_Reason : {
        Max_Len : 1,
        Field_Type : "A",
        Format : "R",
        Specific_Business_Rules : "First decision reason record is mandatory per decision record. 5 optional records can follow. The first mandatory record contains a reason code drawn from the WMS Medicaid Disposition Code table.  The subsequent 5 optional records contain reject reason codes drawn from the WMS Rejection Codes (for 218) table."
    },
    Case_Reason_Code : {
        Max_Len : 3,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : ""
    },
    Case_Reason_Description : {
        Max_Len : 200,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "* Case Reason Description is a variable length field for any descriptions over 200 characters"
    },
    Move_To_End_Remarks : {
        Max_Len : 1000,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "*Move To End Remarks Description is a variable length field for any descriptions over 1000 characters"
    },
    Deferral_Resource_Record : {
        Max_Len : 2,
        Field_Type : "A",
        Format : "RS",
        Specific_Business_Rules : ""
    },
    Institution_Or_Resource : {
        Max_Len : 200,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Institution or Resource name"
    },
    Account_Type : {
        Max_Len : 50,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Money Market, Savings, Certificate of Deposit, Individual Retirement Account, Annuity, Saving Bonds, Stocks, Shares"
    },
    Account_No : {
        Max_Len : 200,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : ""
    },
    Documentation_Needed : {
        Max_Len : 50,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Deposit, Withdrawal, Account Statements, Pay- out status, Transferred, Liquidated, Sold, Closed, Opened"
    },
    Date : {
        Max_Len : 17,
        Field_Type : "A",
        Format : "MMDDCCYY-MMDDCCYY",
        Specific_Business_Rules : "From date - To date or Date"
    },
    Amount : {
        Max_Len : 12,
        Field_Type : "N",
        Format : "See $amount rule",
        Specific_Business_Rules : ""
    },
    Deferral_Remark_Record : {
        Max_Len : 2,
        Field_Type : "A",
        Format : "RM",
        Specific_Business_Rules : ""
    },
    Remarks : {
        Max_Len : 1000,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : ""
    },
    Household_Member_Record : {
        Max_Len : 1,
        Field_Type : "A",
        Format : "H",
        Specific_Business_Rules : ""
    },
    Household_Line_No : {
        Max_Len : 2,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : ""
    },
    MA_Individual_Status_Code : {
        Max_Len : 3,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "AC - Active, RJ - Denied, CL - Closed, DD - Dead"
    },
    MA_Individual_Status_Description : {
        Max_Len : 100,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "WMS MA Individual Status Descriptions is a variable length field for any descriptions over 100 characters"
    },
    First_Name : {
        Max_Len : 10,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : ""
    },
    Last_Name : {
        Max_Len : 17,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : ""
    },
    CIN : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "WMS CIN No"
    },
    NAMI_1 : {
        Max_Len : 7,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Non-chronic period *"
    },
    From_Date1 : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMSSCCYY",
        Specific_Business_Rules : "NAMI 1 From Date"
    },
    Service_From_Date1 : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : "From Date to begin billing"
    },
    Service_To_Date1 : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : "To Date to end billing"
    },
    NAMI_2 : {
        Max_Len : 7,
        Field_Type : "A",
        Format : "",
        Specific_Business_Rules : "Chronic period *"
    },
    From_Date2 : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : "NAMI 2 From Date"
    },
    Service_From_Date2 : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : "From Date to begin billing"
    },
    Service_To_Date2 : {
        Max_Len : 8,
        Field_Type : "A",
        Format : "MMDDCCYY",
        Specific_Business_Rules : "To Date to end billing"
    },
}