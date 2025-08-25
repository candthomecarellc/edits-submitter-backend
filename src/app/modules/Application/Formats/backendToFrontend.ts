import { Application as ApplicationInterface } from "../application.interface";
import { ApplicationFrontend } from "../application.frontend.interface";
import { codeToValue } from "../../../utils/codeToValue";
import { decodeStatusBooleans, decodeValueBooleans } from "../../../utils/decodeBooleans";


export const formatForFrontend = (application: Partial<ApplicationInterface>) => {

    const frontendApplication: Partial<ApplicationFrontend> = {
        _id: application._id,
        caseId: application.caseId,
        createdBy: application.createdBy,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
        status: codeToValue.applicationStatus(application.status || 0) || 'unknown',
        caseName: application.caseName,
        providerId: application.providerId,
        patientId: application.patientId,
        applicationType: codeToValue.applicationType(application.applicationType || 0) || 'unknown',
        submitionType: codeToValue.submissionType(application.submitionType || '') || 'unknown',
        signatureDate: application.signatureDate,
        deferralExtension: application.deferralExtension,
        applicant: application.applicant,
        email: application.email,
        primaryPhone: {
            type: codeToValue.phoneType(application.primaryPhone?.type || 0) || 'unknown',
            number: application.primaryPhone?.number || '',
        },
        anotherPhone: {
            type: codeToValue.phoneType(application.anotherPhone?.type || 0) || 'unknown',
            number: application.anotherPhone?.number || '',
        },
        residence: {
            apartment: application.residence?.apartment || '',
            house: application.residence?.house || '',
            street: application.residence?.street || '',
            state: application.residence?.state || '',
            city: application.residence?.city || '',
            county: application.residence?.county || '',
            zip: application.residence?.zip || '',
            phone: application.residence?.phone || '',
        },
        mailingAddress: {
            apartment: application.mailingAddress?.apartment || '',
            street: application.mailingAddress?.street || '',
            state: application.mailingAddress?.state || '',
            city: application.mailingAddress?.city || '',
            zip: application.mailingAddress?.zip || '',
        },
        mailingAddress2: {
            associateName: application.mailingAddress2?.associateName || '',
            inCareOf: application.mailingAddress2?.inCareOf || '',
            phoneNumber: application.mailingAddress2?.phoneNumber || '',
            phoneType: codeToValue.phoneType(application.mailingAddress2?.phoneType || 0) || 'unknown',
            apartment: application.mailingAddress2?.apartment || '',
            street: application.mailingAddress2?.street || '',
            state: application.mailingAddress2?.state || '',
            city: application.mailingAddress2?.city || '',
            zip: application.mailingAddress2?.zip || '',
        },
        contactName: application.contactName || '',
        contactPhone: application.contactPhone || '',
        caseComposition: application.caseComposition || 0,
        edc1: application.edc1,
        edc2: application.edc2,
        languageSpoken: codeToValue.language(application.languageSpoken || '') || 'unknown',
        languageRead: codeToValue.language(application.languageRead || '') || 'unknown',
        homeless: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).homeless,
        mailSame: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).mailSame,
        mail2Same: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).mail2Same,
        applyOrRenew: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).applyOrRenew,
        discuss: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).discuss,
        getNotice: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).getNotice,
        clientNoticeLanguage: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).clientNoticeLanguage ? 'spanish' : 'english',
        familyPlanning: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).familyPlanning,
        healthPlan: decodeValueBooleans.applicantBooleans(application.applicantBooleans || 0).healthPlan,
        fieldStatus: {
            personalDetails: decodeStatusBooleans.applicantInformation("personalDetails", application.fieldStatus?.personalDetails || 0),
            homeAddress: decodeStatusBooleans.applicantInformation("homeAddress", application.fieldStatus?.homeAddress || 0),
            mailingAddress: decodeStatusBooleans.applicantInformation("mailingAddress", application.fieldStatus?.mailingAddress || 0),
            secondMailingAddress: decodeStatusBooleans.applicantInformation("secondMailingAddress", application.fieldStatus?.secondMailingAddress || 0),
            otherInformation: decodeStatusBooleans.applicantInformation("otherInformation", application.fieldStatus?.otherInformation || 0)
        },
        householdExpense: {
            shelterType: codeToValue.shelterType(application.householdExpense?.shelterType || 0) || 'unknown',
            shelterAmount: application.householdExpense?.shelterAmount || 0,
            waterCostAmount: application.householdExpense?.waterCostAmount || 0,
            waterCostPeriod: codeToValue.period(application.householdExpense?.waterCostPeriod || 0) || 'unknown',
            addType: codeToValue.additionalAllowanceType(application.householdExpense?.addType || 0) || 'unknown',
            addAmount: application.householdExpense?.addAmount || 0,
            budgetType: codeToValue.budgetType(application.householdExpense?.budgetType || 0) || 'unknown',
            fuelType: codeToValue.fuelType(application.householdExpense?.fuelType || 0) || 'unknown',
            freeHousing: application.householdExpense?.freeHousing || false,
            nursingHome: application.householdExpense?.nursingHome || false,
            blindDisableChronicallyIll: application.householdExpense?.blindDisableChronicallyIll || false,
            childCare: (application.householdExpense?.childCare || []).map(item => ({
                _id: item._id,
                name: item.name,
                month: item.month,
                year: item.year,
                amount: item.amount,
                period: codeToValue.period(item.period || 0) || 'unknown'
            })),
            ssi: {
                ssiDm: codeToValue.ssiDM(application.householdExpense?.ssi?.ssiDm || 0) || 'unknown',
                ssiLa: codeToValue.ssiLA(application.householdExpense?.ssi?.ssiLa || 0) || 'unknown',
                ssiNoDm: application.householdExpense?.ssi?.ssiNoDm || 0,
                ssiNoAll: application.householdExpense?.ssi?.ssiNoAll || 0,
                ssiBuy: application.householdExpense?.ssi?.ssiBuy || ''
            },
            chronicCare: {
                chronicCareDateIns: application.householdExpense?.chronicCare?.chronicCareDateIns || new Date(0),
                chronicCarePia: application.householdExpense?.chronicCare?.chronicCarePia || '',
                chronicCareCon: codeToValue.chronicCareCon(application.householdExpense?.chronicCare?.chronicCareCon || 0) || 'unknown',
                chronicCareAmount: application.householdExpense?.chronicCare?.chronicCareAmount || 0,
                chronicCareLoc: application.householdExpense?.chronicCare?.chronicCareLoc || 0
            },
            fieldStatus: {
                housingExpense: decodeStatusBooleans.householdExpense("housingExpense", application.householdExpense?.fieldStatus?.housingExpense || 0),
                childCare: decodeStatusBooleans.householdExpense("childCare", application.householdExpense?.fieldStatus?.childCare || 0),
                otherExpenses: decodeStatusBooleans.householdExpense("otherExpenses", application.householdExpense?.fieldStatus?.otherExpenses || 0)
            }
        },
        wayOfLiving: application.wayOfLiving || '',
        householdMember: (application.householdMember || []).map(member => ({
            _id: member._id,
            lineNumber: member.lineNumber || 0,
            legalName: {
                first: member.legalName?.first || '',
                middle: member.legalName?.middle || '',
                last: member.legalName?.last || ''
            },
            otherName: {
                code: member.otherName?.code === 1 ? 'maiden' : member.otherName?.code === 2 ? 'alias' : '',
                first: member.otherName?.first || '',
                middle: member.otherName?.middle || '',
                last: member.otherName?.last || ''
            },
            dateOfBirth: member.dateOfBirth || null,
            sex: codeToValue.sex(member.sex || '') || '',
            gender: codeToValue.gender(member.gender || '') || 'unknown',
            relationshipToApplicant: codeToValue.relationship(member.relationshipToApplicant || 0) || 'unknown',
            birthCity: member.birthCity || '',
            birthState: member.birthState || '',
            birthCountry: member.birthCountry || '',
            motherName: member.motherName || '',

            pregnantDueDate: member.pregnantDueDate || null,
            maritalStatus: codeToValue.maritalStatus(member.maritalStatus || 0) || 'unknown',
            studentId: member.studentId || '',
            educationLevel: member.educationLevel?.toString() || '',
            studentType: member.studentType?.toString() || '',
            
            lastJobDate: member.lastJobDate || null,
            employerName: member.employerName || '',
            childIdentifier: member.childIdentifier || 0,
            chronicCareIndicator: member.chronicCareIndicator || '',

            ethnicity: decodeValueBooleans.ethnicity(member.ethnicity || 0) || {},
            aci: codeToValue.alienIndicator(member.aci || '') || 'unknown',
            alienNumber: member.alienNumber || 0,
            alienDateOfEntry: member.alienDateOfEntry || null,
            alienDateEnteredCountry: member.alienDateEnteredCountry || null,
            fedChargeCd: codeToValue.fedChargeCd(member.fedChargeCd || 0) || 'unknown',
            fedChargeDate: member.fedChargeDate || null,

            ssn: member.ssn || '',
            tasa: codeToValue.tasa(member.tasa || 0) || 'unknown',
            emp: codeToValue.employability(member.emp || 0) || 'unknown',
            ssi: codeToValue.ssiIndicator(member.ssi || 0) || 'unknown',
            bcs: codeToValue.bcs(member.bcs || '') || 'unknown',
            cbicCc: codeToValue.cbicCc(member.cbicCc || '') || 'unknown',
            cbicCdc: codeToValue.cbicCdc(member.cbicCdc || '') || 'unknown',
            pid: member.pid || '',

            responsibleAdult: decodeValueBooleans.householdBooleans(member.householdBooleans || 0).responsibleAdult,
            veteran: decodeValueBooleans.householdBooleans(member.householdBooleans || 0).veteran,
            pregnant: decodeValueBooleans.householdBooleans(member.householdBooleans || 0).pregnant,
            selfEmployed: decodeValueBooleans.householdBooleans(member.householdBooleans || 0).selfEmployed,
            changedJob: decodeValueBooleans.householdBooleans(member.householdBooleans || 0).changedJob,
            applying: decodeValueBooleans.householdBooleans(member.householdBooleans || 0).applying,

            generalInformation: {
                personalInformation: decodeStatusBooleans.generalInformation("personalInformation", member.generalInformation?.personalInformation || 0),
                statusInformation: decodeStatusBooleans.generalInformation("statusInformation", member.generalInformation?.statusInformation || 0),
                memberIncome: decodeStatusBooleans.generalInformation("memberIncome", member.generalInformation?.memberIncome || 0),
                ethnicCitizenshipInformation: decodeStatusBooleans.generalInformation("ethnicCitizenshipInformation", member.generalInformation?.ethnicCitizenshipInformation || 0),
                otherInformation: decodeStatusBooleans.generalInformation("otherInformation", member.generalInformation?.otherInformation || 0)
            },
            
            income: {
                earnedIncome: (member.income?.earnedIncome || []).map(item => ({
                    _id: item._id,
                    employerName: item.employerName || '',
                    ctg: codeToValue.ctg(item.ctg || 0) || 'unknown',
                    eid: item.eid || 0,
                    employmentStatus: item.employmentStatus === 'F' ? 'full-time' : item.employmentStatus === 'P' ? 'part-time' : 'unknown',
                    source: codeToValue.earnedIncomeSources(item.source || 0) || 'unknown',
                    amount: item.amount || 0,
                    period: codeToValue.period(item.period || 0) || 'unknown',
                    insur: item.insur || 0,
                    ctSup: item.ctSup || 0,
                    wkRel: item.wkRel || 0,
                    irwe: item.irwe || 0,
                    fieldStatus: decodeStatusBooleans.incomes("earnedIncome", item.fieldStatus || 0)
                })),
                unearnedIncome: (member.income?.unearnedIncome || []).map(item => ({
                    _id: item._id,
                    ctg: codeToValue.ctg(item.ctg || 0) || 'unknown',
                    source: codeToValue.unearnedIncomeSources(item.source || 0) || 'unknown',
                    amount: item.amount || 0,
                    period: codeToValue.period(item.period || 0) || 'unknown',
                    cd1: codeToValue.unearnedIncomeCd(item.cd1 || 0) || 'unknown',
                    exempt1: item.exempt1 || 0,
                    cd2: codeToValue.unearnedIncomeCd(item.cd2 || 0) || 'unknown',
                    exempt2: item.exempt2 || 0,
                    fieldStatus: decodeStatusBooleans.incomes("unearnedIncome", item.fieldStatus || 0)
                })),
                resource: (member.income?.resource || []).map(item => ({
                    _id: item._id,
                    ctg: codeToValue.ctg(item.ctg || 0) || 'unknown',
                    cd: codeToValue.resourceCd(item.cd || 0) || 'unknown',
                    value: item.value || 0,
                    period: codeToValue.period(item.period || 0) || 'unknown',
                    utxn2Flag: codeToValue.utxn2Flag(item.utxn2Flag || 0) || 'unknown',
                    fieldStatus: decodeStatusBooleans.incomes("resource", item.fieldStatus || 0)
                })),
            },
            healthInsurance: {
                medicaidCardId: member.healthInsurance?.medicaidCardId || '',
                familyHealthPlusCardId: member.healthInsurance?.familyHealthPlusCardId || '',
                personsCovered: member.healthInsurance?.personsCovered || 0,
                costOfPolicy: member.healthInsurance?.costOfPolicy || 0,
                endDateOfCoverage: member.healthInsurance?.endDateOfCoverage || null,
                monthBilled: member.healthInsurance?.monthBilled || '',
                moveInState: member.healthInsurance?.moveInState || '',
                moveInCounty: member.healthInsurance?.moveInCounty || '',
                healthPlan: {
                    healthPlanName: member.healthInsurance?.healthPlan?.healthPlanName || '',
                    preferredDoctor: member.healthInsurance?.healthPlan?.preferredDoctor || '',
                    obGyn: member.healthInsurance?.healthPlan?.obGyn || ''
                }
            },
            parentOutside: {
                name: member.parentOutside?.name || '',
                dob: member.parentOutside?.dob || null,
                street: member.parentOutside?.street || '',
                city: member.parentOutside?.city || '',
                ssn: member.parentOutside?.ssn || ''
            },
            spouseOutside: {
                name: member.spouseOutside?.name || '',
                dob: member.spouseOutside?.dob || null,
                street: member.spouseOutside?.street || '',
                city: member.spouseOutside?.city || '',
                ssn: member.spouseOutside?.ssn || ''
            },

            medicaid: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).medicaid,
            familyHealthPlus: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).familyHealthPlus,
            commercialInsurance: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).commercialInsurance,
            medicare: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).medicare,
            medicalAssistance: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).medicalAssistance,
            jobHealthInsurance: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).jobHealthInsurance,
            recentMedicalBill: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).recentMedicalBill,
            oldMedicalBill: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).oldMedicalBill,
            pendingLawsuit: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).pendingLawsuit,
            injured: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).injured,
            recentMoveIn: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).recentMoveIn,
            parentDeceased: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).parentDeceased,
            parentLivingOutside: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).parentLivingOutside,
            parentPrivacy: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).parentPrivacy,
            spouseDeceased: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).spouseDeceased,
            spouseLivingOutside: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).spouseLivingOutside,
            spousePrivacy: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).spousePrivacy,
            currentDoctor: decodeValueBooleans.insuranceBooleans(member.insuranceCode || 0).currentDoctor,
            documentVerifications: decodeValueBooleans.documentVerifications(member.documentVerifications || 0),

            insuranceInformation: {
                healthInsurance: decodeStatusBooleans.insuranceInformation("healthInsurance", member.insuranceInformation?.healthInsurance || 0),
                medicalExpense: decodeStatusBooleans.insuranceInformation("medicalExpense", member.insuranceInformation?.medicalExpense || 0),
                deceasedOrLivingOutside: decodeStatusBooleans.insuranceInformation("deceasedOrLivingOutside", member.insuranceInformation?.deceasedOrLivingOutside || 0),
                healthPlan: decodeStatusBooleans.insuranceInformation("healthPlan", member.insuranceInformation?.healthPlan || 0)
            }
        }))
    }
    return frontendApplication;
}