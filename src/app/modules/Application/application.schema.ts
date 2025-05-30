import { Schema } from 'mongoose';
import { Name, Phone, Address, MailingAddress, Ethnicity, Amount, ChildCare, HouseholdExpense, EarnedIncome, UnearnedIncome, Resource, Income, HealthInsurance, LivingOutside, HouseholdMember, Application } from './application.interface';

const NameSchema = new Schema<Name>({
    code: { type: Number, required: true },
    first: { type: String, required: true },
    middle: { type: String },
    last: { type: String, required: true }
});

const PhoneSchema = new Schema<Phone>({
    type: { type: Number, required: true },
    number: { type: Number, required: true }
});

const AddressSchema = new Schema<Address>({
    apartment: { type: Number },
    house: { type: Number, required: true },
    street: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: Number, required: true },
    phone: { type: PhoneSchema, required: true }
});

const MailingAddressSchema = new Schema<MailingAddress>({
    associateName: { type: NameSchema, required: true },
    inCareOf: { type: NameSchema },
    address: { type: AddressSchema, required: true },
    accessRight: { type: Number, required: true }
});

const EthnicitySchema = new Schema<Ethnicity>({
    type: { type: Number, required: true },
    status: { type: Number, required: true }
});

const AmountSchema = new Schema<Amount>({
    category: { type: Number, required: true },
    type: { type: Number, required: true },
    amount: { type: Number, required: true },
    period: { type: Number, required: true }
});

const ChildCareSchema = new Schema<ChildCare>({
    name: { type: String, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    childCareCost: { type: AmountSchema, required: true }
});

const HouseholdExpenseSchema = new Schema<HouseholdExpense>({
    fuelCost: { type: AmountSchema, required: true },
    shelterCost: { type: AmountSchema, required: true },
    waterCost: { type: AmountSchema, required: true },
    addCost: { type: AmountSchema, required: true },
    freeHousing: { type: Number, required: true },
    budgetType: { type: Number, required: true },
    childCare: { type: [ChildCareSchema], required: true },
    ssi: {
        ssiDm: { type: Number, required: true },
        ssiLa: { type: Number, required: true },
        ssiNoDm: { type: Number, required: true },
        ssiNoAll: { type: Number, required: true },
        ssiBuy: { type: String, required: true },
    },
    nursingHome: { type: Boolean, required: true },
    blindDisableChronicallyIll: { type: Boolean, required: true },
    chronicCare: {
        chronicCareDateIns: { type: Date, required: true },
        chronicCarePia: { type: String, required: true },
        chronicCareCon: { type: Number, required: true },
        chronicCareAmount: { type: Number, required: true },
        chronicCareLoc: { type: Number, required: true },
    }
});

const EarnedIncomeSchema = new Schema<EarnedIncome>({
    employerName: { type: String, required: true },
    ctg: { type: Number, required: true },
    eid: { type: Number, required: true },
    employmentStatus: { type: Number, required: true },
    earnedIncome: { type: AmountSchema, required: true },
    insur: { type: Number, required: true },
    ctSup: { type: Number, required: true },
    wkRel: { type: Number, required: true },
    irwe: { type: Number, required: true },
});

const UnearnedIncomeSchema = new Schema<UnearnedIncome>({
    ctg: { type: Number, required: true },
    unearnedIncome: { type: AmountSchema, required: true },
    cd1: { type: Number, required: true },
    exempt1: { type: Number, required: true },
    cd2: { type: Number, required: true },
    exempt2: { type: Number, required: true },
});

const ResourceSchema = new Schema<Resource>({
    ctg: { type: Number, required: true },
    resource: { type: AmountSchema, required: true },
    utxn2Flag: { type: Number, required: true },
});

const IncomeSchema = new Schema<Income>({
    incomeCode: { type: Number, required: true },
    lastJobDate: { type: Date, required: true },
    employerName: { type: String, required: true },
    studentType: { type: Number, required: true },
    earnedIncome: { type: [EarnedIncomeSchema], required: true },
    unearnedIncome: { type: [UnearnedIncomeSchema], required: true },
    resource: { type: [ResourceSchema], required: true },
});

const HealthInsuranceSchema = new Schema<HealthInsurance>({
    healthInsuranceCode: { type: Number, required: true },
    benefitCardId: { type: String, required: true },
    personsCovered: { type: String, required: true },
    costOfPolicy: { type: Number, required: true },
    endDateOfCoverage: { type: Date, required: true },
    monthBilled: { type: String, required: true },
    moveInState: { type: String, required: true },
    moveInCountry: { type: String, required: true },
    healthPlan: {
        healthPlanName: { type: String, required: true },
        currentDoctor: { type: Boolean, required: true },
        preferredDoctor: { type: String, required: true },
        obGyn: { type: String, required: true },
    }
});

const LivingOutsideSchema = new Schema<LivingOutside>({
    outsideCode: { type: Number, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    ssn: { type: String, required: true },
});

const HouseholdMemberSchema = new Schema<HouseholdMember>({
    lineNumber: { type: Number, required: true },
    legalName: { type: NameSchema, required: true },
    otherName: { type: NameSchema, required: true },
    dateOfBirth: { type: Date, required: true },
    sex: { type: Boolean, required: true },
    gender: { type: String, required: true },
    ssn: { type: String, required: true },
    ethnicity: { type: [EthnicitySchema], required: true },
    status: { type: Number, required: true },
    pregnantDueDate: { type: Date, required: true },
    fedChargeCd: { type: Number, required: true },
    fedChargeDate: { type: Date, required: true },
    tasa: { type: Number, required: true },
    emp: { type: Number, required: true },
    ssi: { type: Number, required: true },
    bcs: { type: Number, required: true },
    relationshipToApplicant: { type: Number, required: true },
    cibicCc: { type: Number, required: true },
    cibicCdc: { type: Number, required: true },
    studentId: { type: Number, required: true },
    aci: { type: Number, required: true },
    alienNumber: { type: Number, required: true },
    alienDateOfEntry: { type: Date, required: true },
    maritalStatus: { type: Number, required: true },
    educationLevel: { type: Number, required: true },
    elienDateEnteredCountry: { type: Date, required: true },
    pid: { type: Number, required: true },
    childIdentifier: { type: Number, required: true },
    chronicCareIndicator: { type: Number, required: true },
    income: { type: IncomeSchema, required: true },
    healthInsurance: { type: HealthInsuranceSchema, required: true },
    parentOutside: { type: LivingOutsideSchema, required: true },
    spouseOutside: { type: LivingOutsideSchema, required: true },
});

export const ApplicationSchema = new Schema<Application>({
    applicant: { type: NameSchema, required: true },
    primaryPhone: { type: PhoneSchema, required: true },
    anotherPhone: { type: PhoneSchema, required: true },
    languageSpoken: { type: String, required: true },
    languageRead: { type: String, required: true },
    residence: { type: AddressSchema, required: true },
    mailingAddress: { type: MailingAddressSchema, required: true },
    mailingAddress2: { type: MailingAddressSchema, required: true },
    contactName: { type: String, required: true },
    contactPhone: { type: PhoneSchema, required: true },
    caseComposition: { type: Number, required: true },
    edc1: { type: Number, required: true },
    edc2: { type: Number, required: true },
    familyPlanning: { type: Boolean, required: true },
    householdExpence: { type: HouseholdExpenseSchema, required: true },
    wayOfLiving: { type: String, required: true },
    householdMember: { type: [HouseholdMemberSchema], required: true },
}, {
    timestamps: true
}); 