// This is a bitmask for the fields in the general information section
// The bitmask is a number that is used to store the status of the fields
// Each bit represents a field, 0 is for review, 1 is for confirmed
export const GENERAL_INFORMATION_STATUS = {
    personalInformation: {
        lineNumber: 0,
        legalFirstName: 2,
        legalMiddleInitial: 4,
        legalLastName: 6,
        otherNameType: 8,
        otherNameFirst: 10,
        otherNameMiddle: 12,
        otherNameLast: 14,
        dateOfBirth: 16,
        sex: 18,
        gender: 20,
        relationshipToApplicant: 22,
        birthCity: 24,
        birthState: 26,
        birthCountry: 28,
        motherName: 30
    },
    statusInformation: {
        responsibleAdult: 0,
        veteran: 2,
        pregnant: 4,
        pregnantDueDate: 6,
        maritalStatus: 8,
        studentId: 10,
        educationLevel: 12,
        studentType: 14,
        applying: 16,
    },
    memberIncome: {
        selfEmployed: 0,
        changedJob: 2,
        lastJobDate: 4,
        employerName: 6,
        childIdentifier: 8,
        chronicCareIndicator: 10
    },
    ethnicCitizenshipInformation: {
        hispanic: 0,
        indian: 2,
        asian: 4,
        black: 6,
        pacificIslander: 8,
        white: 10,
        aci: 12,
        alienNumber: 14,
        alienDateOfEntry: 16,
        alienDateEnteredCountry: 18,
        fedChargeCd: 20,
        fedChargeDate: 22
    },
    otherInformation: {
        ssn: 0,
        tasa: 2,
        emp: 4,
        ssi: 6,
        bcs: 8,
        cbicCc: 10,
        cbicCdc: 12,
        pid: 14
    }
}