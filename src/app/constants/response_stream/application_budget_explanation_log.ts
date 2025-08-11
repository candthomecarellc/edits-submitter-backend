const APPLICATION_BUDGET_EXPLANATION_LOG = {
    General_NAMI_Section_Record_Indicator : {
        General_NAMI_Section_Record_Indicator : {
            Max_Len : 2,
            Field_Type : "A",
            Format : "BL",
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
        Case_Name : {
            Max_Len : 28,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Case_Number : {
            Max_Len : 12,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "WMS issued Application Registration Number"
        },
        CIN : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "WMS CIN No"
        },
        Discharge_Alert_Date : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : ""
        },
        Budget_Comments : {
            Max_Len : 30,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        General_Comments : {
            Max_Len : 300,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        MA_Status : {
            Max_Len : 2,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "For NH PP Only cases"
        },
        Coverage_Date_From : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : "For NH PP Only cases"
        },
        Coverage_Date_To : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : "For NH PP Only cases"
        },
        Received_Medicaid_Acceptance_Notice : {
            Max_Len : 1,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "0-Not checked, 1-Checked"
        },
        For_Unit : {
            Max_Len : 2,
            Field_Type : "N",
            Format : "",
            Specific_Business_Rules : "1 = Hospital/2- MLTC Spousal/3 = Residential Health Care Facility NAMI"
        },
        Hospital_Greater : {
            Max_Len : 1,
            Field_Type : "A",
            Format : "1/0",
            Specific_Business_Rules : "1 = Hospital Bill is greater than NAMI/Surplus Amount, otherwise 0"
        },
        Hospital_Less : {
            Max_Len : 1,
            Field_Type : "A",
            Format : "1/0",
            Specific_Business_Rules : "1 = Hospital Bill is less than NAMI/Surplus Amount, otherwise 0"
        },
        Worker : {
            Max_Len : 60,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Supervisor : {
            Max_Len : 60,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Section : {
            Max_Len : 10,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Notice_Date : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : ""
        },
    },
    Month_Of_MA_Pick_Up_Section_Record : {
        Month_Of_MA_Pick_Up_Section_Record_Indicator : {
            Max_Len : 2,
            Field_Type : "A",
            Format : "MA",
            Specific_Business_Rules : ""
        },
        Effective_Date : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : ""
        },
        Social_Security_Benefits : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Social Security Benefits Amount"
        },
        Pension1 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Pension2 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Pension3 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Interest_Dividend_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Excess_Resources : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Contribution_From_Spouse : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Other_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Total_Monthly_Gross_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Personal_Needs_Allowance_PNA : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Medicare_Part_B : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Health_Insurance_Premiums : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Contribution_To_Spouse : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        MA_LEVEL : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        DAB : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Other_Deductions : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Total_Monthly_Deductions : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        NAMI_Surplus : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Hospital_Bill : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
    },
    Non_Chronic_Care_Budget_Section_Record : {
        Non_Chronic_Care_Budget_Section_Record_Indicator : {
            Max_Len : 2,
            Field_Type : "A",
            Format : "NC",
            Specific_Business_Rules : ""
        },
        Effective_Date : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : ""
        },
        Social_Security_Benefits : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Social Security Benefits Amount"
        },
        Pension1 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Pension2 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Pension3 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Interest_Dividend_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Excess_Resources : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Contribution_From_Spouse : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Other_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Total_Monthly_Gross_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Personal_Needs_Allowance_PNA : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Medicare_Part_B : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Health_Insurance_Premiums : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Contribution_To_Spouse : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        MA_LEVEL : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        DAB : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Other_Deductions : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Total_Monthly_Deductions : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        NAMI_Surplus : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Hospital_Bill : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
    },
    Chronic_Care_Budget_Section_Record_1 : {
        Chronic_Care_Budget_Section_Record_Indicator : {
            Max_Len : 2,
            Field_Type : "A",
            Format : "C1",
            Specific_Business_Rules : ""
        },
        Effective_Date : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : ""
        },
        Social_Security_Benefits : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Social Security Benefits Amount"
        },
        Pension1 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Pension2 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Pension3 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Interest_Dividend_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Excess_Resources : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Contribution_From_Spouse : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Other_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Total_Monthly_Gross_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Personal_Needs_Allowance_PNA : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Medicare_Part_B : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Health_Insurance_Premiums : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Contribution_To_Spouse : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        MA_LEVEL : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        DAB : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Other_Deductions : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Total_Monthly_Deductions : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        NAMI_Surplus : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Hospital_Bill : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
    },
    Chronic_Care_Budget_Section_Record_2 : {
        Chronic_Care_Budget_Section_Record_Indicator : {
            Max_Len : 2,
            Field_Type : "A",
            Format : "C2",
            Specific_Business_Rules : ""
        },
        Effective_Date : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : ""
        },
        Social_Security_Benefits : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Social Security Benefits Amount"
        },
        Pension1 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Pension2 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Pension3 : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Pension Amount"
        },
        Interest_Dividend_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Excess_Resources : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Contribution_From_Spouse : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Other_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Total_Monthly_Gross_Income : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Personal_Needs_Allowance_PNA : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Medicare_Part_B : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Health_Insurance_Premiums : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Contribution_To_Spouse : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        MA_LEVEL : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        DAB : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Other_Deductions : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Total_Monthly_Deductions : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        NAMI_Surplus : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Hospital_Bill : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
    }
}