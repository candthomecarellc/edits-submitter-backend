import { ObjectId } from "mongoose";

export interface Application {
    _id: ObjectId;
    caseId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    status: number;
    caseName: string;
    providerId: string;
    patientId: string;
    applicationType: number;
    submitionType: string;
    signatureDate: Date;
    deferralExtension: number;
    applicant: {
        first: string;
        middle: string;
        last: string;
    };
    email: string;
    primaryPhone: {
        type: number;
        number: string;
    };
    anotherPhone: {
        type: number;
        number: string;
    };
    residence: {
        apartment: string;
        house: string;
        street: string;
        state: string;
        city: string;
        county: string;
        zip: string;
        phone: string;
    };
    mailingAddress: {
        apartment: string;
        street: string;
        state: string;
        city: string;
        zip: string;
    };
    mailingAddress2: {
        associateName: string;
        inCareOf: string;
        phoneNumber: string;
        phoneType: number;
        apartment: string;
        street: string;
        state: string;
        city: string;
        zip: string;
    };
    contactName: string;
    contactPhone: string;
    caseComposition: number;
    edc1: Date;
    edc2: Date;
    languageSpoken: string;
    languageRead: string;
    applicantBooleans: number;
    fieldStatus: {
        personalDetails: number;
        homeAddress: number;
        mailingAddress: number;
        secondMailingAddress: number;
        otherInformation: number;
    };
    householdExpense: {
        shelterType: number;
        shelterAmount: number;
        waterCostAmount: number;
        waterCostPeriod: number;
        addType: number;
        addAmount: number;
        budgetType: number;
        fuelType: number;
        freeHousing: boolean;
        nursingHome: boolean;
        blindDisableChronicallyIll: boolean;
        childCare: Array<{
            _id: ObjectId;
            name: string;
            month: number;
            year: number;
            amount: number;
            period: number;
        }>;
        ssi: {
            ssiDm: number;
            ssiLa: number;
            ssiNoDm: number;
            ssiNoAll: number;
            ssiBuy: string;
        }
        chronicCare: {
            chronicCareDateIns: Date;
            chronicCarePia: string;
            chronicCareCon: number;
            chronicCareAmount: number;
            chronicCareLoc: number;
        }
        fieldStatus: {
            housingExpense: number;
            childCare: number;
            otherExpenses: number;
        }
    };
    wayOfLiving: string;
    householdMember: Array<{
        _id: ObjectId;
        lineNumber: number;
        legalName: {
            first: string;
            middle: string;
            last: string;
        };
        otherName: {
            code: number;
            first: string;
            middle: string;
            last: string;
        };
        dateOfBirth: Date;
        sex: string;
        gender: string;
        relationshipToApplicant: number;
        birthCity: string;
        birthState: string;
        birthCountry: string;
        motherName: string;
        
        pregnantDueDate: Date;
        maritalStatus: number;
        studentId: string;
        educationLevel: number;
        studentType: number;
        
        lastJobDate: Date;
        employerName: string;
        childIdentifier: number;
        chronicCareIndicator: string;
        
        ethnicity: number;
        aci: string;
        alienNumber: number;
        alienDateOfEntry: Date;
        alienDateEnteredCountry: Date;
        fedChargeCd: number;
        fedChargeDate: Date;
        
        ssn: string;
        tasa: number;
        emp: number;
        ssi: number;
        bcs: string;
        cbicCc: string;
        cbicCdc: string;
        pid: string;

        householdBooleans: number;
        
        generalInformation: {
            personalInformation: number;
            statusInformation: number;
            memberIncome: number;
            ethnicCitizenshipInformation: number;
            otherInformation: number;
        }
        income: {
            earnedIncome: Array<{
                _id: ObjectId;
                employerName: string;
                ctg: number;
                eid: number;
                employmentStatus: string;
                source: number;
                amount: number;
                period: number;
                insur: number;
                ctSup: number;
                wkRel: number;
                irwe: number;
                fieldStatus: number;
            }>;
            unearnedIncome: Array<{
                _id: ObjectId;
                ctg: number;
                source: number;
                amount: number;
                period: number;
                cd1: number;
                exempt1: number;
                cd2: number;
                exempt2: number;
                fieldStatus: number;
            }>;
            resource: Array<{
                _id: ObjectId;
                ctg: number;
                cd: number;
                value: number;
                period: number;
                utxn2Flag: number;
                fieldStatus: number;
            }>;
        };
        healthInsurance: {
            medicaidCardId: string;
            familyHealthPlusCardId: string;
            personsCovered: number;
            costOfPolicy: number;
            endDateOfCoverage: Date;
            monthBilled: string;
            moveInState: string;
            moveInCounty: string;
            healthPlan: {
                healthPlanName: string;
                preferredDoctor: string;
                obGyn: string;
            }
        };
        parentOutside: {
            name: string;
            dob: Date;
            street: string;
            city: string;
            ssn: string;
        };
        spouseOutside: {
            name: string;
            dob: Date;
            street: string;
            city: string;
            ssn: string;
        };
        insuranceCode: number;
        documentVerifications: number;
        insuranceInformation: {
            healthInsurance: number;
            medicalExpense: number;
            deceasedOrLivingOutside: number;
            healthPlan: number;
        }
    }>;
}