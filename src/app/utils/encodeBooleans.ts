import { APPLICANT_INFORMATION_STATUS } from "../constants/booleanEncodes/applicantInformationStatus";
import { HOUSEHOLD_EXPENSE_STATUS } from "../constants/booleanEncodes/householdExpenseStatus";
import { GENERAL_INFORMATION_STATUS } from "../constants/booleanEncodes/generalInformationStatus";
import { INCOMES_STATUS } from "../constants/booleanEncodes/incomesStatus";
import { INSURANCE_INFORMATION_STATUS } from "../constants/booleanEncodes/insuranceInformationStatus";
import { FIELD_VALUE } from "../constants/booleanEncodes/fieldValue";
import { valueToCode } from "./valueToCode";

const applicantInformation = (field: string, statuses: { [key: string]: string }) => {
    const fieldStatus = APPLICANT_INFORMATION_STATUS[field as keyof typeof APPLICANT_INFORMATION_STATUS];
    let code = 0;
    for (const key in statuses) {
        code &= ~(3 << fieldStatus[key as keyof typeof fieldStatus]);
        code |= valueToCode.fieldStatus(statuses[key])! << fieldStatus[key as keyof typeof fieldStatus];
    }
    return code;
}

const householdExpense = (field: string, statuses: { [key: string]: string }) => {
    const fieldStatus = HOUSEHOLD_EXPENSE_STATUS[field as keyof typeof HOUSEHOLD_EXPENSE_STATUS];
    let code = 0;
    for (const key in statuses) {
        code &= ~(3 << fieldStatus[key as keyof typeof fieldStatus]);
        code |= valueToCode.fieldStatus(statuses[key])! << fieldStatus[key as keyof typeof fieldStatus];
    }
    return code;
}

const generalInformation = (field: string, statuses: { [key: string]: string }) => {
    const fieldStatus = GENERAL_INFORMATION_STATUS[field as keyof typeof GENERAL_INFORMATION_STATUS];
    let code = 0;
    for (const key in statuses) {
        code &= ~(3 << fieldStatus[key as keyof typeof fieldStatus]);
        code |= valueToCode.fieldStatus(statuses[key])! << fieldStatus[key as keyof typeof fieldStatus];
    }
    return code;
}

const incomes = (field: string, statuses: { [key: string]: string }) => {
    const fieldStatus = INCOMES_STATUS[field as keyof typeof INCOMES_STATUS];
    let code = 0;
    for (const key in statuses) {
        code &= ~(3 << fieldStatus[key as keyof typeof fieldStatus]);
        code |= valueToCode.fieldStatus(statuses[key])! << fieldStatus[key as keyof typeof fieldStatus];
    }
    return code;
}

const insuranceInformation = (field: string, statuses: { [key: string]: string }) => {
    const fieldStatus = INSURANCE_INFORMATION_STATUS[field as keyof typeof INSURANCE_INFORMATION_STATUS];
    let code = 0;
    for (const key in statuses) {
        code &= ~(3 << fieldStatus[key as keyof typeof fieldStatus]);
        code |= valueToCode.fieldStatus(statuses[key])! << fieldStatus[key as keyof typeof fieldStatus];
    }
    return code;
}

const ethnicity = (ethnicities: { [key: string]: string }) => {
    let code = 0;
    for (const key in ethnicities) {
        code &= ~(3 << FIELD_VALUE.ethnicity[key as keyof typeof FIELD_VALUE.ethnicity]);
        code |= valueToCode.ethnicity(ethnicities[key])! << FIELD_VALUE.ethnicity[key as keyof typeof FIELD_VALUE.ethnicity];
    }
    return code;
}

const applicantBooleans = (booleans: { [key: string]: boolean }) => {
    let code = 0;
    for (const key in booleans) {
        if (booleans[key]) {
            code |= FIELD_VALUE.applicantBooleans[key as keyof typeof FIELD_VALUE.applicantBooleans];
        }
    }
    return code;
}

const householdBooleans = (booleans: { [key: string]: boolean }) => {
    let code = 0;
    for (const key in booleans) {
        if (booleans[key]) {
            code |= FIELD_VALUE.householdBooleans[key as keyof typeof FIELD_VALUE.householdBooleans];
        }
    }
    return code;
}

const insuranceBooleans = (booleans: { [key: string]: boolean }) => {
    let code = 0;
    for (const key in booleans) {
        if (booleans[key]) {
            code |= FIELD_VALUE.insuranceInformationBooleans[key as keyof typeof FIELD_VALUE.insuranceInformationBooleans];
        }
    }
    return code;
}

const documentVerifications = (booleans: { [key: string]: boolean }) => {
    let code = 0;
    for (const key in booleans) {
        if (booleans[key]) {
            code |= FIELD_VALUE.documentVerifications[key as keyof typeof FIELD_VALUE.documentVerifications];
        }
    }
    return code;
}

export const encodeStatusBooleans = {
    applicantInformation,
    householdExpense,
    generalInformation,
    incomes,
    insuranceInformation
}

export const encodeValueBooleans = {
    ethnicity,
    applicantBooleans,
    householdBooleans,
    insuranceBooleans,
    documentVerifications
}