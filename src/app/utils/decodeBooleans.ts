import { APPLICANT_INFORMATION_STATUS } from "../constants/booleanEncodes/applicantInformationStatus";
import { HOUSEHOLD_EXPENSE_STATUS } from "../constants/booleanEncodes/householdExpenseStatus";
import { GENERAL_INFORMATION_STATUS } from "../constants/booleanEncodes/generalInformationStatus";
import { INCOMES_STATUS } from "../constants/booleanEncodes/incomesStatus";
import { INSURANCE_INFORMATION_STATUS } from "../constants/booleanEncodes/insuranceInformationStatus";
import { FIELD_VALUE } from "../constants/booleanEncodes/fieldValue";
import { codeToValue } from "./codeToValue";

const applicantInformation = (field: string, code: number) => {
    const fieldStatus = APPLICANT_INFORMATION_STATUS[field as keyof typeof APPLICANT_INFORMATION_STATUS];
    const result: { [key: string]: string } = {};
    for (const key in fieldStatus) {
        result[key] = codeToValue.fieldStatus(((code >> fieldStatus[key as keyof typeof fieldStatus]) & 3))!;
    }
    return result;
}

const householdExpense = (field: string, code: number) => {
    const fieldStatus = HOUSEHOLD_EXPENSE_STATUS[field as keyof typeof HOUSEHOLD_EXPENSE_STATUS];
    const result: { [key: string]: string } = {};
    for (const key in fieldStatus) {
        result[key] = codeToValue.fieldStatus(((code >> fieldStatus[key as keyof typeof fieldStatus]) & 3))!;
    }
    return result;
}

const generalInformation = (field: string, code: number) => {
    const fieldStatus = GENERAL_INFORMATION_STATUS[field as keyof typeof GENERAL_INFORMATION_STATUS];
    const result: { [key: string]: string } = {};
    for (const key in fieldStatus) {
        result[key] = codeToValue.fieldStatus(((code >> fieldStatus[key as keyof typeof fieldStatus]) & 3))!;
    }
    return result;
}

const incomes = (field: string, code: number) => {
    const fieldStatus = INCOMES_STATUS[field as keyof typeof INCOMES_STATUS];
    const result: { [key: string]: string } = {};
    for (const key in fieldStatus) {
        result[key] = codeToValue.fieldStatus(((code >> fieldStatus[key as keyof typeof fieldStatus]) & 3))!;
    }
    return result;
}

const insuranceInformation = (field: string, code: number) => {
    const fieldStatus = INSURANCE_INFORMATION_STATUS[field as keyof typeof INSURANCE_INFORMATION_STATUS];
    const result: { [key: string]: string } = {};
    for (const key in fieldStatus) {
        result[key] = codeToValue.fieldStatus(((code >> fieldStatus[key as keyof typeof fieldStatus]) & 3))!;
    }
    return result;
}

const ethnicity = (code: number) => {
    const ethnicity = FIELD_VALUE['ethnicity'];
    const result: { [key: string]: string } = {};
    for (const key in ethnicity) {
        result[key] = codeToValue.ethnicity(((code >> ethnicity[key as keyof typeof ethnicity]) & 3))!;
    }
    return result;
}

const applicantBooleans = (code: number) => {
    const result: { [key: string]: boolean } = {};
    for (const key in FIELD_VALUE.applicantBooleans) {
        result[key] = (code & FIELD_VALUE.applicantBooleans[key as keyof typeof FIELD_VALUE.applicantBooleans]) !== 0 ? true : false;
    }
    return result;
}

const householdBooleans = (code: number) => {
    const result: { [key: string]: boolean } = {};
    for (const key in FIELD_VALUE.householdBooleans) {
        result[key] = (code & FIELD_VALUE.householdBooleans[key as keyof typeof FIELD_VALUE.householdBooleans]) !== 0 ? true : false;
    }
    return result;
}

const insuranceBooleans = (code: number) => {
    const result: { [key: string]: boolean } = {};
    for (const key in FIELD_VALUE.insuranceInformationBooleans) {
        result[key] = (code & FIELD_VALUE.insuranceInformationBooleans[key as keyof typeof FIELD_VALUE.insuranceInformationBooleans]) !== 0 ? true : false;
    }
    return result;
}

export const decodeStatusBooleans = {
    applicantInformation,
    householdExpense,
    generalInformation,
    incomes,
    insuranceInformation
}

export const decodeValueBooleans = {
    ethnicity,
    applicantBooleans,
    householdBooleans,
    insuranceBooleans
}