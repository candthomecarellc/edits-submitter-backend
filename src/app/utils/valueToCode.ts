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

export const valueToCode = {
    additionalAllowanceTypes: (value: string) => ADDITIONAL_ALLOWANCE_TYPES.find(type => type.value === value)?.code,
    afisExemption: (value: string) => AFIS_EXEMPTION.find(exemption => exemption.value === value)?.code,
    alienIndicator: (value: string) => ALIEN_INDICATOR.find(indicator => indicator.value === value)?.code,
    applicationStatus: (value: string) => APPLICATION_STATUS.find(status => status.value === value)?.code,
    bcs: (value: string) => BCS.find(bcs => bcs.value === value)?.code,
    budgetTypes: (value: string) => BUDGET_TYPES.find(type => type.value === value)?.code,
    cbicCc: (value: string) => CBIC_CC.find(cbic => cbic.value === value)?.code,
    cbicCdc: (value: string) => CBIC_CDC.find(cbic => cbic.value === value)?.code,
    chronicCareCon: (value: string) => CHRONIC_CARE_CON.find(con => con.value === value)?.code,
    ctg: (value: string) => CTG.find(ctg => ctg.value === value)?.code,
    documents: (value: string) => DOCUMENTS.find(document => document.value === value)?.code,
    earnedIncomeSources: (value: string) => EARNED_INCOME_SOURCES.find(source => source.value === value)?.code,
    employability: (value: string) => EMPLOYABILITY.find(employability => employability.value === value)?.code,
    ethnicity: (value: string) => ETHNIC.find(ethnicity => ethnicity.value === value)?.code,
    fedChargeCd: (value: string) => FED_CHARGE_CD.find(charge => charge.value === value)?.code,
    fuelType: (value: string) => FUEL_TYPE.find(type => type.value === value)?.code,
    gender: (value: string) => GENDER.find(gender => gender.value === value)?.code,
    sex: (value: string) => SEX.find(sex => sex.value === value)?.code,
    highestDegreeObtained: (value: string) => HIGHEST_DEGREE_OBTAINED.find(degree => degree.value === value)?.code,
    language: (value: string) => LANGUAGE.find(language => language.value === value)?.code,
    maritalStatus: (value: string) => MARITAL_STATUS.find(status => status.value === value)?.code,
    maStatus: (value: string) => MA_STATUS.find(status => status.value === value)?.code,
    period: (value: string) => PERIOD.find(period => period.value === value)?.code,
    phoneType: (value: string) => PHONE_TYPE.find(type => type.value === value)?.code,
    rejectionCodes: (value: string) => REJECTION_CODES.find(rejection => rejection.value === value)?.code,
    relationship: (value: string) => RELATIONSHIP.find(relationship => relationship.value === value)?.code,
    resourceCd: (value: string) => RESOURCE_CD.find(resource => resource.value === value)?.code,
    shelterTypes: (value: string) => SHELTER_TYPES.find(type => type.value === value)?.code,
    ssiDM: (value: string) => SSI_DM.find(dm => dm.value === value)?.code,
    ssiIndicator: (value: string) => SSI_INDICATOR.find(indicator => indicator.value === value)?.code,
    ssiLA: (value: string) => SSI_LA.find(la => la.value === value)?.code,
    tasa: (value: string) => TASA.find(tasa => tasa.value === value)?.code,
    unearnedIncomeCd: (value: string) => UNEARNED_INCOME_CD.find(cd => cd.value === value)?.code,
    unearnedIncomeSources: (value: string) => UNEARNED_INCOME_SOURCES.find(source => source.value === value)?.code,
    utxn2Flag: (value: string) => UTXN2_FLAG.find(flag => flag.value === value)?.code,
    veteranIndicator: (value: string) => VETERAN_INDICATOR.find(indicator => indicator.value === value)?.code,
    fieldStatus: (value: string) => FIELD_STATUS.find(status => status.value === value)?.code,
}