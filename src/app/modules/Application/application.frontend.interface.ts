import { ObjectId } from "mongoose";

export interface ApplicationFrontend {
    _id: ObjectId;
    caseId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    caseName: string;
    providerId: string;
    patientId: string;
    applicationType: string;
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
        type: string;
        number: string;
    };
    anotherPhone: {
        type: string;
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
        phoneType: string;
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
    homeless: boolean;
    mailSame: boolean;
    mail2Same: boolean;
    applyOrRenew: boolean;
    discuss: boolean;
    getNotice: boolean;
    clientNoticeLanguage: 'spanish' | 'english';
    familyPlanning: boolean;
    healthPlan: boolean;
    fieldStatus: {
        personalDetails: {[key: string]: string};
        homeAddress: {[key: string]: string};
        mailingAddress: {[key: string]: string};
        secondMailingAddress: {[key: string]: string};
        otherInformation: {[key: string]: string};
    };
    householdExpense: {
        shelterType: string;
        shelterAmount: number;
        waterCostAmount: number;
        waterCostPeriod: string;
        addType: string;
        addAmount: number;
        budgetType: string;
        fuelType: string;
        freeHousing: boolean;
        nursingHome: boolean;
        blindDisableChronicallyIll: boolean;
        childCare: Array<{
            _id: ObjectId;
            name: string;
            month: number;
            year: number;
            amount: number;
            period: string;
        }>;
        ssi: {
            ssiDm: string;
            ssiLa: string;
            ssiNoDm: number;
            ssiNoAll: number;
            ssiBuy: string;
        }
        chronicCare: {
            chronicCareDateIns: Date;
            chronicCarePia: string;
            chronicCareCon: string;
            chronicCareAmount: number;
            chronicCareLoc: number;
        }
        fieldStatus: {
            housingExpense: {[key: string]: string};
            childCare: {[key: string]: string};
            otherExpenses: {[key: string]: string};
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
            code: string;
            first: string;
            middle: string;
            last: string;
        };
        dateOfBirth: Date;
        sex: string;
        gender: string;
        relationshipToApplicant: string;
        birthCity: string;
        birthState: string;
        birthCountry: string;
        motherName: string;

        pregnantDueDate: Date;
        maritalStatus: string;
        studentId: string;
        educationLevel: string;
        
        lastJobDate: Date;
        employerName: string;
        childIdentifier: number;
        chronicCareIndicator: string;
        
        ethnicity: {[key: string]: string};
        aci: string;
        alienNumber: number;
        alienDateOfEntry: Date;
        alienDateEnteredCountry: Date;
        fedChargeCd: string;
        fedChargeDate: Date;

        ssn: string;
        tasa: string;
        emp: string;
        ssi: string;
        bcs: string;
        cbicCc: string;
        cbicCdc: string;
        pid: string;

        responsibleAdult: boolean;
        veteran: boolean;
        pregnant: boolean;
        studentType: string;
        selfEmployed: boolean;
        changedJob: boolean;
        applying: boolean;

        generalInformation: {
            personalInformation: {[key: string]: string};
            statusInformation: {[key: string]: string};
            memberIncome: {[key: string]: string};
            ethnicCitizenshipInformation: {[key: string]: string};
            otherInformation: {[key: string]: string};
        }

        income: {
            earnedIncome: Array<{
                _id: ObjectId;
                employerName: string;
                ctg: string;
                eid: number;
                employmentStatus: string;
                source: string;
                amount: number;
                period: string;
                insur: number;
                ctSup: number;
                wkRel: number;
                irwe: number;
                fieldStatus: {[key: string]: string};
            }>;
            unearnedIncome: Array<{
                _id: ObjectId;
                ctg: string;
                source: string;
                amount: number;
                period: string;
                cd1: string;
                exempt1: number;
                cd2: string;
                exempt2: number;
                fieldStatus: {[key: string]: string};
            }>;
            resource: Array<{
                _id: ObjectId;
                ctg: string;
                cd: string;
                value: number;
                period: string;
                utxn2Flag: string;
                fieldStatus: {[key: string]: string};
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
        medicaid: boolean;
        familyHealthPlus: boolean;
        commercialInsurance: boolean;
        medicare: boolean;
        medicalAssistance: boolean;
        jobHealthInsurance: boolean;
        recentMedicalBill: boolean;
        oldMedicalBill: boolean;
        pendingLawsuit: boolean;
        injured: boolean;
        recentMoveIn: boolean;
        parentDeceased: boolean;
        parentLivingOutside: boolean;
        parentPrivacy: boolean;
        spouseDeceased: boolean;
        spouseLivingOutside: boolean;
        spousePrivacy: boolean;
        currentDoctor: boolean;
        documentVerifications: {[key: string]: boolean};

        insuranceInformation: {
            healthInsurance: {[key: string]: string};
            medicalExpense: {[key: string]: string};
            deceasedOrLivingOutside: {[key: string]: string};
            healthPlan: {[key: string]: string};
        }
    }>;
}