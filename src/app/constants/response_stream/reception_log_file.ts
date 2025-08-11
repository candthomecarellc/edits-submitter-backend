const RECEPTION_LOG_FILE = {
    Batch_File_Record : {
        Batch_File_Record_Indicator : {
            Max_Len : 1,
            Field_Type : "A",
            Format : "F",
            Specific_Business_Rules : ""
        },
        File_Name : {
            Max_Len : 255,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
        Date_Received : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "MMDDCCYY",
            Specific_Business_Rules : ""
        },
        Batch_File_Status : {
            Max_Len : 10,
            Field_Type : "A",
            Format : "Passed/Failed",
            Specific_Business_Rules : "Passed if file is parsed successfully. Failed if file cannot be read."
        },
        Batch_File_Status_Reason : {
            Max_Len : 1024,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Will contain a diagnostic error message if the status was Failed. This field is enclosed in double quotes since it may contain one or more comma characters."
        },
    },
    Case_Record : {
        description: "One for each case found in the Batch File",
        Case_Header_Record_Indicator : {
            Max_Len : 1,
            Field_Type : "A",
            Format : "C",
            Specific_Business_Rules : ""
        },
        Provider_No : {
            Max_Len : 8,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "Provider number for whomever submitted the case"
        },
        Unique_Case_ID : {
            Max_Len : 20,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "As originally submitted by the Provider"
        },
        Case_Name : {
            Max_Len : 28,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : "As originally submitted by the Provider"
        },
    },
    Case_Message_Record : {
        description: "There can be multiple Case Message records for one Case record",
        Case_Message_Record_Indicator : {
            Max_Len : 1,
            Field_Type : "A",
            Format : "M",
            Specific_Business_Rules : ""
        },
        Error_Code : {
            Max_Len : 4,
            Field_Type : "N",
            Format : "",
            Specific_Business_Rules : ""
        },
        Error_Code_Message : {
            Max_Len : 255,
            Field_Type : "A",
            Format : "",
            Specific_Business_Rules : ""
        },
    }
}