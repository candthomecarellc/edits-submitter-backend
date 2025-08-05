// This is a bitmask for the fields in the incomes section
// The bitmask is a number that is used to store the status of the fields
// Each bit represents a field, 0 is for review, 1 is for confirmed
export const INCOMES_STATUS = {
    earnedIncome: {
        ctg: 0,
        source: 2,
        employerName: 4,
        eid: 6,
        employmentStatus: 8,
        amount: 10,
        period: 12,
        insur: 14,
        ctSup: 16,
        wkRel: 18,
        irwe: 20,
    },
    unearnedIncome: {
        ctg: 0,
        source: 2,
        amount: 4,
        period: 6,
        cd1: 8,
        exempt1: 10,
        cd2: 12,
        exempt2: 14,
    },
    resource: {
        ctg: 0,
        value: 2,
        period: 4,
        cd: 6,
        utxn2Flag: 8,
    },
}