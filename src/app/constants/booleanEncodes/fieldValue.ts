// This is a bitmask for different ethnicity options
// The bitmask is a number that is used to store all the ethnicity options
// Each 2 bits represent a field, 00 is for blank, 01 is for yes, 10 is for no, 11 is for unknown
export const FIELD_VALUE = {
    // 2 bits 1 field
    ethnicity: {
        hispanic: 0,  // 000000000001 (1)
        indian: 2,  // 000000000100 (4)
        asian: 4,  // 000000010000 (16)
        black: 6,  // 000001000000 (64)
        pacificIslander: 8,  // 000100000000 (256)
        white: 10, // 010000000000 (1024)
    },

    // 1 bit 1 field
    applicantBooleans : {
        homeless: 1 << 0,
        mailSame: 1 << 1,
        mail2Same: 1 << 2,
        applyOrRenew: 1 << 3,
        discuss: 1 << 4,
        getNotice: 1 << 5,
        clientNoticeLanguage: 1 << 6,
        familyPlanning: 1 << 7,
    },

    // 1 bit 1 field
    householdBooleans: {
        responsibleAdult: 1 << 0,
        veteran: 1 << 1,
        pregnant: 1 << 2,
        selfEmployed: 1 << 3,
        changedJob: 1 << 4,
    },

    // 1 bit 1 field
    insuranceInformationBooleans: {
        medicaid: 1 << 0,
        familyHealthPlus: 1 << 1,
        commercialInsurance: 1 << 2,
        medicare: 1 << 3,
        medicalAssistance: 1 << 4,
        jobHealthInsurance: 1 << 5,
        recentMedicalBill: 1 << 6,
        oldMedicalBill: 1 << 7,
        pendingLawsuit: 1 << 8,
        injured: 1 << 9,
        recentMoveIn: 1 << 10,
        parentDeceased: 1 << 11,
        parentLivingOutside: 1 << 12,
        parentPrivacy: 1 << 13,
        spouseDeceased: 1 << 14,
        spouseLivingOutside: 1 << 15,
        spousePrivacy: 1 << 16,
        healthPlan: 1 << 17,
        currentDoctor: 1 << 18,
    }
};
