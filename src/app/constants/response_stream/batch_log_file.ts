const BATCH_LOG_FILE = {
    Batch_File_Record : {
        Max_Len : 0,
        Field_Type : "",
        Index_Attr : "",
        Format : "",
        Specific_Business_Rules : ""
    },
    Batch_File_Record_Indicator : {
        Max_Len : 1,
        Field_Type : "A",
        Index_Attr : "",
        Format : "F",
        Specific_Business_Rules : ""
    },
    File_Name : {
        Max_Len : 255,
        Field_Type : "A",
        Index_Attr : "",
        Format : "",
        Specific_Business_Rules : ""
    },
    Date_Received : {
        Max_Len : 8,
        Field_Type : "A",
        Index_Attr : "",
        Format : "MMDDCCYY",
        Specific_Business_Rules : ""
    },
    Batch_File_Status : {
        Max_Len : 10,
        Field_Type : "A",
        Index_Attr : "",
        Format : "F",
        Specific_Business_Rules : "Passed if file is parsed successfully. Failed if file cannot be read."
    },
    Batch_File_Status_Reason : {
        Max_Len : 1024,
        Field_Type : "A",
        Index_Attr : "",
        Format : "",
        Specific_Business_Rules : "Will contain a diagnostic error message if the status was Failed. This field is enclosed in �� since it may contain one or more comma characters."
    }
}