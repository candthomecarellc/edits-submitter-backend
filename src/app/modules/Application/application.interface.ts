interface Name {
    code: number;
    first: string;
    middle: string;
    last: string;
}

interface Phone {
    type: number;
    number: number;
}

interface Address {
    apartment: number;
    house: number;
    street: string;
    state: string;
    city: string;
    country: string;
    zip: number;
    phone: Phone;
}

interface MailingAddress {
    associateName: Name;
    inCareOf: Name;
    address: Address;
    accessRight: number;
}

interface Ethnicity {
    type: number;
    status: number;
}

interface Amount {
    category: number;
    type: number;
    amount: number;
    period: number;
}

interface ChildCare {
    name: string;
    month: number;
    year: number;
    childCareCost: Amount;
}

interface HouseholdExpense {
    fuelCost: Amount;
    shelterCost: Amount;
    waterCost: Amount;
    addCost: Amount;
    freeHousing: number;
    budgetType: number;
    childCare: [ChildCare];
    ssi: {
        ssiDm: number;
        ssiLa: number;
        ssiNoDm: number;
        ssiNoAll: number;
        ssiBuy: string;
    }
    nursingHome: boolean;
    blindDisableChronicallyIll: boolean;
    chronicCare: {
        chronicCareDateIns: Date;
        chronicCarePia: string;
        chronicCareCon: number;
        chronicCareAmount: number;
        chronicCareLoc: number;
    }
}

interface EarnedIncome {
    employerName: string;
    ctg: number;
    eid: number;
    employmentStatus: number;
    earnedIncome: Amount;
    insur: number;
    ctSup: number;
    wkRel: number;
    irwe: number;
}

interface UnearnedIncome {
    ctg: number;
    unearnedIncome: Amount;
    cd1: number;
    exempt1: number;
    cd2: number;
    exempt2: number;
}

interface Resource {
    ctg: number;
    resource: Amount;
    utxn2Flag: number;
}

interface Income {
    incomeCode: number;
    lastJobDate: Date;
    employerName: string;
    studentType: number;
    earnedIncome: [EarnedIncome];
    unearnedIncome: [UnearnedIncome];
    resource: [Resource];
}

interface HealthInsurance {
    healthInsuranceCode: number;
    benefitCardId: string;
    personsCovered: string;
    costOfPolicy: number;
    endDateOfCoverage: Date;
    monthBilled: string;
    moveInState: string;
    moveInCountry: string;
    healthPlan: {
        healthPlanName: string;
        currentDoctor: boolean;
        preferredDoctor: string;
        obGyn: string;
    }
}

interface LivingOutside {
    outsideCode: number;
    name: string;
    dob: Date;
    street: string;
    city: string;
    ssn: string;
}

interface HouseholdMember {
    lineNumber: number;
    legalName: Name;
    otherName: Name;
    dateOfBirth: Date;
    sex: boolean;
    gender: string;
    ssn: string;
    ethnicity: [Ethnicity];
    status: number;
    pregnantDueDate: Date;
    fedChargeCd: number;
    fedChargeDate: Date;
    tasa: number;
    emp: number;
    ssi: number;
    bcs: number;
    relationshipToApplicant: number;
    cibicCc: number;
    cibicCdc: number;
    studentId: number;
    aci: number;
    alienNumber: number;
    alienDateOfEntry: Date;
    maritalStatus: number;
    educationLevel: number;
    elienDateEnteredCountry: Date;
    pid: number;
    childIdentifier: number;
    chronicCareIndicator: number;
    income: Income;
    healthInsurance: HealthInsurance;
    parentOutside: LivingOutside;
    spouseOutside: LivingOutside;
}

interface Application {
    applicant: Name;
    primaryPhone: Phone;
    anotherPhone: Phone;
    languageSpoken: string;
    languageRead: string;
    residence: Address;
    mailingAddress: MailingAddress;
    mailingAddress2: MailingAddress;
    contactName: string;
    contactPhone: Phone;
    caseComposition: number;
    edc1: number;
    edc2: number;
    familyPlanning: boolean;
    householdExpence: HouseholdExpense;
    wayOfLiving: string;
    householdMember: [HouseholdMember];
}

export { MailingAddress, Address, Phone, Name, Ethnicity, Amount, ChildCare, HouseholdExpense, EarnedIncome, UnearnedIncome, Resource, Income, HealthInsurance, LivingOutside, HouseholdMember, Application }; 