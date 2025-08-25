import { Schema } from 'mongoose';
import { Application } from './application.interface';

export const ApplicationSchema = new Schema<Application>({
    caseId: { type: String, required: true },
    createdBy: { type: String, required: true },
    status: { type: Number, default: 0 },
    caseName: { type: String },
    providerId: { type: String, required: true },
    patientId: { type: String, required: true },
    applicationType: { type: Number, default: 0 },
    submitionType: { type: String, default: 'N' },
    signatureDate: { type: Date },
    deferralExtension: { type: Number, default: -1 },
    applicant: {
        first: { type: String },
        middle: { type: String },
        last: { type: String }
    },
    email: { type: String, required: true },
    primaryPhone: {
        type: { type: Number },
        number: { type: String }
    },
    anotherPhone: {
        type: { type: Number },
        number: { type: String }
    },
    residence: {
        apartment: { type: String },
        house: { type: String },
        street: { type: String },
        state: { type: String },
        city: { type: String },
        county: { type: String },
        zip: { type: String },
        phone: { type: String }
    },
    mailingAddress: {
        apartment: { type: String },
        street: { type: String },
        state: { type: String },
        city: { type: String },
        zip: { type: String }
    },
    mailingAddress2: {
        associateName: { type: String },
        inCareOf: { type: String },
        phoneNumber: { type: String },
        phoneType: { type: Number },
        apartment: { type: String },
        street: { type: String },
        state: { type: String },
        city: { type: String },
        zip: { type: String }
    },
    contactName: { type: String },
    contactPhone: { type: String },
    caseComposition: { type: Number },
    edc1: { type: Date },
    edc2: { type: Date },
    languageSpoken: { type: String },
    languageRead: { type: String },
    applicantBooleans: { type: Number },
    fieldStatus: {
        personalDetails: { type: Number },
        homeAddress: { type: Number },
        mailingAddress: { type: Number },
        secondMailingAddress: { type: Number },
        otherInformation: { type: Number }
    },
    householdExpense: {
        shelterType: { type: Number },
        shelterAmount: { type: Number },
        waterCostAmount: { type: Number },
        waterCostPeriod: { type: Number },
        addType: { type: Number },
        addAmount: { type: Number },
        budgetType: { type: Number },
        fuelType: { type: Number },
        freeHousing: { type: Boolean },
        nursingHome: { type: Boolean },
        blindDisableChronicallyIll: { type: Boolean },
        childCare: Array<{
            _id: { type: Schema.Types.ObjectId },
            name: { type: String },
            month: { type: Number },
            year: { type: Number },
            amount: { type: Number },
            period: { type: Number }
        }>,
        ssi: {
            ssiDm: { type: Number },
            ssiLa: { type: Number },
            ssiNoDm: { type: Number },
            ssiNoAll: { type: Number },
            ssiBuy: { type: String }
        },
        chronicCare: {
            chronicCareDateIns: { type: Date },
            chronicCarePia: { type: String },
            chronicCareCon: { type: Number },
            chronicCareAmount: { type: Number },
            chronicCareLoc: { type: Number }
        },
        fieldStatus: {
            housingExpense: { type: Number },
            childCare: { type: Number },
            otherExpenses: { type: Number }
        }
    },
    wayOfLiving: { type: String },
    householdMember: Array<{
        _id: { type: Schema.Types.ObjectId },
        lineNumber: { type: Number },
        legalName: {
            first: { type: String },
            middle: { type: String },
            last: { type: String }
        },
        otherName: {
            code: { type: Number },
            first: { type: String },
            middle: { type: String },
            last: { type: String }
        },
        dateOfBirth: { type: Date },
        sex: { type: String },
        gender: { type: String },
        relationshipToApplicant: { type: Number },
        birthCity: { type: String },
        birthState: { type: String },
        birthCountry: { type: String },
        motherName: { type: String },

        pregnantDueDate: { type: Date },
        maritalStatus: { type: Number },
        studentId: { type: String },
        educationLevel: { type: Number },
        studentType: { type: Number },
        
        lastJobDate: { type: Date },
        employerName: { type: String },
        childIdentifier: { type: Number },
        chronicCareIndicator: { type: String },
        
        ethnicity: { type: Number },
        aci: { type: String },
        alienNumber: { type: String },
        alienDateOfEntry: { type: Date },
        alienDateEnteredCountry: { type: Date },
        fedChargeCd: { type: Number },
        fedChargeDate: { type: Date },

        ssn: { type: String },
        tasa: { type: Number },
        emp: { type: Number },
        ssi: { type: Number },
        bcs: { type: String },
        cbicCc: { type: String },
        cbicCdc: { type: String },
        pid: { type: String },

        householdBooleans: { type: Number },

        generalInformation: {
            personalInformation: { type: Number },
            statusInformation: { type: Number },
            memberIncome: { type: Number },
            ethnicCitizenshipInformation: { type: Number },
            otherInformation: { type: Number }
        },

        income: {
            earnedIncome: Array<{
                _id: { type: Schema.Types.ObjectId },
                employerName: { type: String },
                ctg: { type: Number },
                eid: { type: Number },
                employmentStatus: { type: String },
                source: { type: Number },
                amount: { type: Number },
                period: { type: Number },
                insur: { type: Number },
                ctSup: { type: Number },
                wkRel: { type: Number },
                irwe: { type: Number },
                fieldStatus: { type: Number }
            }>,
            unearnedIncome: Array<{
                _id: { type: Schema.Types.ObjectId },
                ctg: { type: Number },
                source: { type: Number },
                amount: { type: Number },
                period: { type: Number },
                cd1: { type: Number },
                exempt1: { type: Number },
                cd2: { type: Number },
                exempt2: { type: Number },
                fieldStatus: { type: Number }
            }>,
            resource: Array<{
                _id: { type: Schema.Types.ObjectId },
                ctg: { type: Number },
                cd: { type: Number },
                value: { type: Number },
                period: { type: Number },
                utxn2Flag: { type: Number },
                fieldStatus: { type: Number }
            }>,
        },
        healthInsurance: {
            medicaidCardId: { type: String },
            familyHealthPlusCardId: { type: String },
            personsCovered: { type: Number },
            costOfPolicy: { type: Number },
            endDateOfCoverage: { type: Date },
            monthBilled: { type: String },
            moveInState: { type: String },
            moveInCounty: { type: String },
            healthPlan: {
                healthPlanName: { type: String },
                preferredDoctor: { type: String },
                obGyn: { type: String }
            }
        },
        parentOutside: {
            name: { type: String },
            dob: { type: Date },
            street: { type: String },
            city: { type: String },
            ssn: { type: String }
        },
        spouseOutside: {
            name: { type: String },
            dob: { type: Date },
            street: { type: String },
            city: { type: String },
            ssn: { type: String }
        },
        insuranceCode: { type: Number },
        documentVerifications: { type: Number },
        insuranceInformation: {
            healthInsurance: { type: Number },
            medicalExpense: { type: Number },
            deceasedOrLivingOutside: { type: Number },
            healthPlan: { type: Number }
        }
    }>,
}, {
    timestamps: true
}); 