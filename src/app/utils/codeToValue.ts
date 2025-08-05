import { ADDITIONAL_ALLOWANCE_TYPES } from "../constants/WMS_Codes/additionalAllowanceTypes";
import { AFIS_EXEMPTION } from "../constants/WMS_Codes/afisExemption";
import { ALIEN_INDICATOR } from "../constants/WMS_Codes/alien";
import { APPLICATION_STATUS, FIELD_STATUS } from "../constants/status";
import { BCS } from "../constants/WMS_Codes/bcs";
import { BUDGET_TYPES } from "../constants/WMS_Codes/budgetTypes";
import { CBIC_CC, CBIC_CDC } from "../constants/WMS_Codes/cbic";
import { CHRONIC_CARE_CON } from "../constants/WMS_Codes/chronicCareCON";
import { CTG } from "../constants/WMS_Codes/ctg";
import { DOCUMENTS } from "../constants/WMS_Codes/documents";
import { EARNED_INCOME_SOURCES } from "../constants/WMS_Codes/earnedIncomeSources";
import { EMPLOYABILITY } from "../constants/WMS_Codes/employability";
import { ETHNIC } from "../constants/ethnicity";
import { FED_CHARGE_CD } from "../constants/WMS_Codes/fedChargeCD";
import { FUEL_TYPE } from "../constants/fuelType";
import { GENDER, SEX } from "../constants/WMS_Codes/gender";
import { HIGHEST_DEGREE_OBTAINED } from "../constants/WMS_Codes/highestDegreeObtained";
import { LANGUAGE } from "../constants/WMS_Codes/language";
import { MARITAL_STATUS } from "../constants/WMS_Codes/maritalStatus";
import { MA_STATUS } from "../constants/WMS_Codes/maStatus";
import { PERIOD } from "../constants/WMS_Codes/period";
import { PHONE_TYPE } from "../constants/phone";
import { REJECTION_CODES } from "../constants/WMS_Codes/rejectionCodes";
import { RELATIONSHIP } from "../constants/WMS_Codes/relationship";
import { RESOURCE_CD } from "../constants/WMS_Codes/resourceCD";
import { SHELTER_TYPES } from "../constants/WMS_Codes/shelterTypes";
import { SSI_DM, SSI_LA } from "../constants/ssi";
import { SSI_INDICATOR } from "../constants/WMS_Codes/ssiIndicator";
import { TASA } from "../constants/WMS_Codes/tasa";
import { UNEARNED_INCOME_CD } from "../constants/WMS_Codes/unearnedIncomeCD";
import { UNEARNED_INCOME_SOURCES } from "../constants/WMS_Codes/unearnedIncomeSources";
import { UTXN2_FLAG } from "../constants/utxn2flag";
import { VETERAN_INDICATOR } from "../constants/WMS_Codes/veteran";

export const codeToValue = {
    additionalAllowanceType: (code: number) => ADDITIONAL_ALLOWANCE_TYPES.find(type => type.code === code)?.value,
    afisExemption: (code: number) => AFIS_EXEMPTION.find(exemption => exemption.code === code)?.value,
    alienIndicator: (code: string) => ALIEN_INDICATOR.find(indicator => indicator.code === code)?.value,
    applicationStatus: (code: number) => APPLICATION_STATUS.find(status => status.code === code)?.value,
    bcs: (code: string) => BCS.find(bcs => bcs.code === code)?.value,
    budgetType: (code: number) => BUDGET_TYPES.find(type => type.code === code)?.value,
    cbicCc: (code: string) => CBIC_CC.find(cbic => cbic.code === code)?.value,
    cbicCdc: (code: string) => CBIC_CDC.find(cbic => cbic.code === code)?.value,
    chronicCareCon: (code: number) => CHRONIC_CARE_CON.find(con => con.code === code)?.value,
    ctg: (code: number) => CTG.find(ctg => ctg.code === code)?.value,
    documents: (code: string) => DOCUMENTS.find(document => document.code === code)?.value,
    earnedIncomeSources: (code: number) => EARNED_INCOME_SOURCES.find(source => source.code === code)?.value,
    employability: (code: number) => EMPLOYABILITY.find(employability => employability.code === code)?.value,
    ethnicity: (code: number) => ETHNIC.find(ethnicity => ethnicity.code === code)?.value,
    fedChargeCd: (code: number) => FED_CHARGE_CD.find(charge => charge.code === code)?.value,
    fuelType: (code: number) => FUEL_TYPE.find(type => type.code === code)?.value,
    gender: (code: string) => GENDER.find(gender => gender.code === code)?.value,
    sex: (code: string) => SEX.find(sex => sex.code === code)?.value,
    highestDegreeObtained: (code: number) => HIGHEST_DEGREE_OBTAINED.find(degree => degree.code === code)?.value,
    language: (code: string) => LANGUAGE.find(language => language.code === code)?.value,
    maritalStatus: (code: number) => MARITAL_STATUS.find(status => status.code === code)?.value,
    maStatus: (code: string) => MA_STATUS.find(status => status.code === code)?.value,
    period: (code: number) => PERIOD.find(period => period.code === code)?.value,
    phoneType: (code: number) => PHONE_TYPE.find(type => type.code === code)?.value,
    rejectionCodes: (code: string) => REJECTION_CODES.find(rejection => rejection.code === code)?.value,
    relationship: (code: number) => RELATIONSHIP.find(relationship => relationship.code === code)?.value,
    resourceCd: (code: number) => RESOURCE_CD.find(resource => resource.code === code)?.value,
    shelterType: (code: number) => SHELTER_TYPES.find(type => type.code === code)?.value,
    ssiDM: (code: number) => SSI_DM.find(dm => dm.code === code)?.value,
    ssiIndicator: (code: number) => SSI_INDICATOR.find(indicator => indicator.code === code)?.value,
    ssiLA: (code: number) => SSI_LA.find(la => la.code === code)?.value,
    tasa: (code: number) => TASA.find(tasa => tasa.code === code)?.value,
    unearnedIncomeCd: (code: number) => UNEARNED_INCOME_CD.find(cd => cd.code === code)?.value,
    unearnedIncomeSources: (code: number) => UNEARNED_INCOME_SOURCES.find(source => source.code === code)?.value,
    utxn2Flag: (code: number) => UTXN2_FLAG.find(flag => flag.code === code)?.value,
    veteranIndicator: (code: number) => VETERAN_INDICATOR.find(indicator => indicator.code === code)?.value,
    fieldStatus: (code: number) => FIELD_STATUS.find(status => status.code === code)?.value,
}