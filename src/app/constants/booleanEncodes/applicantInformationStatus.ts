// This is a bitmask for the fields in the personal details section
// The bitmask is a number that is used to store the status of the fields
// Each 2 bits represents a field, 00 is for default, 01 is for review, 10 is for confirmed, 11 is for error
export const APPLICANT_INFORMATION_STATUS = {
    personalDetails: {
        legalFirstName: 0,      // 0 | 1 | 2 | 3
        legalMiddleInitial: 2,  // 0 | 4 | 8 | 12
        legalLastName: 4,       // 0 | 16 | 32 | 48
        email: 6,               // 0 | 64 | 128 | 192
        primaryPhone: 8,        // 0 | 256 | 512 | 768
        primaryPhoneType: 10,   // 0 | 1024 | 2048 | 3072
        anotherPhone: 12,       // 0 | 4096 | 8192 | 12288
        anotherPhoneType: 14,   // 0 | 16384 | 32768 | 49152
        applicationType: 16,    // 0 | 65536 | 131072 | 196608
        submitionType: 18,      // 0 | 262144 | 524288 | 786432
    },
    homeAddress: {
        homeless: 0,
        houseNumber: 2,
        phoneNumber: 4,
        apartmentNumber: 6,
        streetName: 8,
        city: 10,
        state: 12,
        zip: 14,
        county: 16,
    },
    mailingAddress: {
        sameAsHomeAddress: 0,
        apartmentNumber: 2,
        streetName: 4,
        city: 6,
        state: 8,
        zip: 10,
    },
    secondMailingAddress: {
        sameAsHomeAddress: 0,
        associateName: 2,
        inCareOf: 4,
        phoneNumber: 6,
        phoneType: 8,
        apartment: 10,
        streetName: 12,
        city: 14,
        state: 16,
        zip: 18,
        accessRights: 20
    },
    otherInformation: {
        providerId: 0,
        patientId: 2,
        contactName: 4,
        contactPhone: 6,
        edc1: 8,
        edc2: 10,
        languageSpoken: 12,
        languageRead: 14,
        caseName: 16,
        caseComposition: 18,
        clientNoticeLanguage: 20,
        signatureDate: 22,
        familyPlanning: 24,
        healthPlan: 26,
    }
}