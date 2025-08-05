import { Application as ApplicationInterface } from "../application.interface";
import { ApplicationFrontend } from "../application.frontend.interface";
import { valueToCode } from "../../../utils/valueToCode";
import { encodeStatusBooleans, encodeValueBooleans } from "../../../utils/encodeBooleans";


export const formatForBackend = (application: Partial<ApplicationFrontend>) => {
    const backendApplication: Partial<ApplicationInterface> = {
        caseId: application.caseId,
        createdBy: application.createdBy,
        status: valueToCode.applicationStatus(application.status || '') || 0,
        caseName: application.caseName,
        providerId: application.providerId,
        patientId: application.patientId,
        applicant: application.applicant,
        email: application.email,
        primaryPhone: {
            type: valueToCode.phoneType(application.primaryPhone?.type || '') || 0,
            number: application.primaryPhone?.number || '',
        },
        anotherPhone: {
            type: valueToCode.phoneType(application.anotherPhone?.type || '') || 0,
            number: application.anotherPhone?.number || '',
        },
        residence: {
            apartment: application.residence?.apartment || '',
            house: application.residence?.house || '',
            street: application.residence?.street || '',
            state: application.residence?.state || '',
            city: application.residence?.city || '',
            country: application.residence?.country || '',
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
            phone: application.mailingAddress2?.phone || '',
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
        languageSpoken: valueToCode.language(application.languageSpoken || '') || '',
        languageRead: valueToCode.language(application.languageRead || '') || '',
        applicantBooleans: encodeValueBooleans.applicantBooleans({
            homeless: application.homeless || false,
            mailSame: application.mailSame || false,
            mail2Same: application.mail2Same || false,
            applyOrRenew: application.applyOrRenew || false,
            discuss: application.discuss || false,
            getNotice: application.getNotice || false,
            clientNoticeLanguage: application.clientNoticeLanguage === 'spanish' ? true : false,
            familyPlanning: application.familyPlanning || false,
        }),
        fieldStatus: {
            personalDetails: encodeStatusBooleans.applicantInformation("personalDetails", application.fieldStatus?.personalDetails || {}),
            homeAddress: encodeStatusBooleans.applicantInformation("homeAddress", application.fieldStatus?.homeAddress || {}),
            mailingAddress: encodeStatusBooleans.applicantInformation("mailingAddress", application.fieldStatus?.mailingAddress || {}),
            secondMailingAddress: encodeStatusBooleans.applicantInformation("secondMailingAddress", application.fieldStatus?.secondMailingAddress || {}),
            otherInformation: encodeStatusBooleans.applicantInformation("otherInformation", application.fieldStatus?.otherInformation || {})
        },
        householdExpense: {
            shelterType: valueToCode.shelterTypes(application.householdExpense?.shelterType || '') || 0,
            shelterAmount: application.householdExpense?.shelterAmount || 0,
            waterCostAmount: application.householdExpense?.waterCostAmount || 0,
            waterCostPeriod: valueToCode.period(application.householdExpense?.waterCostPeriod || '') || 0,
            addType: valueToCode.additionalAllowanceTypes(application.householdExpense?.addType || '') || 0,
            addAmount: application.householdExpense?.addAmount || 0,
            budgetType: valueToCode.budgetTypes(application.householdExpense?.budgetType || '') || 0,
            fuelType: valueToCode.fuelType(application.householdExpense?.fuelType || '') || 0,
            freeHousing: application.householdExpense?.freeHousing || false,
            nursingHome: application.householdExpense?.nursingHome || false,
            blindDisableChronicallyIll: application.householdExpense?.blindDisableChronicallyIll || false,
            childCare: (application.householdExpense?.childCare || []).map(item => ({
                _id: item._id,
                name: item.name,
                month: item.month,
                year: item.year,
                amount: item.amount,
                period: valueToCode.period(item.period || '') || 0
            })),
            ssi: {
                ssiDm: valueToCode.ssiDM(application.householdExpense?.ssi?.ssiDm || '') || 0,
                ssiLa: valueToCode.ssiLA(application.householdExpense?.ssi?.ssiLa || '') || 0,
                ssiNoDm: application.householdExpense?.ssi?.ssiNoDm || 0,
                ssiNoAll: application.householdExpense?.ssi?.ssiNoAll || 0,
                ssiBuy: application.householdExpense?.ssi?.ssiBuy || ''
            },
            chronicCare: {
                chronicCareDateIns: application.householdExpense?.chronicCare?.chronicCareDateIns || new Date(0),
                chronicCarePia: application.householdExpense?.chronicCare?.chronicCarePia || '',
                chronicCareCon: valueToCode.chronicCareCon(application.householdExpense?.chronicCare?.chronicCareCon || '') || 0,
                chronicCareAmount: application.householdExpense?.chronicCare?.chronicCareAmount || 0,
                chronicCareLoc: application.householdExpense?.chronicCare?.chronicCareLoc || 0
            },
            fieldStatus: {
                housingExpense: encodeStatusBooleans.householdExpense("housingExpense", application.householdExpense?.fieldStatus?.housingExpense || {}),
                childCare: encodeStatusBooleans.householdExpense("childCare", application.householdExpense?.fieldStatus?.childCare || {}),
                otherExpenses: encodeStatusBooleans.householdExpense("otherExpenses", application.householdExpense?.fieldStatus?.otherExpenses || {})
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
                code: member.otherName?.code === 'maiden' ? 1 : member.otherName?.code === 'alias' ? 2 : 0,
                first: member.otherName?.first || '',
                middle: member.otherName?.middle || '',
                last: member.otherName?.last || ''
            },
            dateOfBirth: member.dateOfBirth || null,
            sex: valueToCode.sex(member.sex || '') || '',
            gender: valueToCode.gender(member.gender || '') || '',
            relationshipToApplicant: valueToCode.relationship(member.relationshipToApplicant || '') || 0,
            
            pregnantDueDate: member.pregnantDueDate || null,
            maritalStatus: valueToCode.maritalStatus(member.maritalStatus || '') || 0,
            studentId: member.studentId || '',
            educationLevel: parseInt(member.educationLevel) || 0,
            studentType: parseInt(member.studentType) || 0,
            
            lastJobDate: member.lastJobDate || null,
            employerName: member.employerName || '',
            childIdentifier: member.childIdentifier || 0,
            chronicCareIndicator: member.chronicCareIndicator || '',

            ethnicity: encodeValueBooleans.ethnicity(member.ethnicity || {}),
            aci: valueToCode.alienIndicator(member.aci || '') || '',
            alienNumber: member.alienNumber || 0,
            alienDateOfEntry: member.alienDateOfEntry || null,
            alienDateEnteredCountry: member.alienDateEnteredCountry || null,
            fedChargeCd: valueToCode.fedChargeCd(member.fedChargeCd || '') || 0,
            fedChargeDate: member.fedChargeDate || null,

            ssn: member.ssn || '',
            tasa: valueToCode.tasa(member.tasa || '') || 0,
            emp: valueToCode.employability(member.emp || '') || 0,
            ssi: valueToCode.ssiIndicator(member.ssi || '') || 0,
            bcs: valueToCode.bcs(member.bcs || '') || '',
            cbicCc: valueToCode.cbicCc(member.cbicCc || '') || '',
            cbicCdc: valueToCode.cbicCdc(member.cbicCdc || '') || '',
            pid: member.pid || '',

            householdBooleans: encodeValueBooleans.householdBooleans({
                responsibleAdult: member.responsibleAdult || false,
                veteran: member.veteran || false,
                pregnant: member.pregnant || false,
                selfEmployed: member.selfEmployed || false,
                changedJob: member.changedJob || false,
            }),

            generalInformation: {
                personalInformation: encodeStatusBooleans.generalInformation("personalInformation", member.generalInformation?.personalInformation || {}),
                statusInformation: encodeStatusBooleans.generalInformation("statusInformation", member.generalInformation?.statusInformation || {}),
                memberIncome: encodeStatusBooleans.generalInformation("memberIncome", member.generalInformation?.memberIncome || {}),
                ethnicCitizenshipInformation: encodeStatusBooleans.generalInformation("ethnicCitizenshipInformation", member.generalInformation?.ethnicCitizenshipInformation || {}),
                otherInformation: encodeStatusBooleans.generalInformation("otherInformation", member.generalInformation?.otherInformation || {})
            },
            
            income: {
                earnedIncome: (member.income?.earnedIncome || []).map(item => ({
                    _id: item._id,
                    employerName: item.employerName || '',
                    ctg: valueToCode.ctg(item.ctg || '') || 0,
                    eid: item.eid || 0,
                    employmentStatus: item.employmentStatus === 'full-time' ? 'F' : item.employmentStatus === 'part-time' ? 'P' : '',
                    source: valueToCode.earnedIncomeSources(item.source || '') || 0,
                    amount: item.amount || 0,
                    period: valueToCode.period(item.period || '') || 0,
                    insur: item.insur || 0,
                    ctSup: item.ctSup || 0,
                    wkRel: item.wkRel || 0,
                    irwe: item.irwe || 0,
                    fieldStatus: encodeStatusBooleans.incomes("earnedIncome", item.fieldStatus || {})
                })),
                unearnedIncome: (member.income?.unearnedIncome || []).map(item => ({
                    _id: item._id,
                    ctg: valueToCode.ctg(item.ctg || '') || 0,
                    source: valueToCode.unearnedIncomeSources(item.source || '') || 0,
                    amount: item.amount || 0,
                    period: valueToCode.period(item.period || '') || 0,
                    cd1: valueToCode.unearnedIncomeCd(item.cd1 || '') || 0,
                    exempt1: item.exempt1 || 0,
                    cd2: valueToCode.unearnedIncomeCd(item.cd2 || '') || 0,
                    exempt2: item.exempt2 || 0,
                    fieldStatus: encodeStatusBooleans.incomes("unearnedIncome", item.fieldStatus || {})
                })),
                resource: (member.income?.resource || []).map(item => ({
                    _id: item._id,
                    ctg: valueToCode.ctg(item.ctg || '') || 0,
                    cd: valueToCode.resourceCd(item.cd || '') || 0,
                    value: item.value || 0,
                    period: valueToCode.period(item.period || '') || 0,
                    utxn2Flag: valueToCode.utxn2Flag(item.utxn2Flag || '') || 0,
                    fieldStatus: encodeStatusBooleans.incomes("resource", item.fieldStatus || {})
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

            insuranceCode: encodeValueBooleans.insuranceBooleans({
                medicaid: member.medicaid || false,
                familyHealthPlus: member.familyHealthPlus || false,
                commercialInsurance: member.commercialInsurance || false,
                medicare: member.medicare || false,
                medicalAssistance: member.medicalAssistance || false,
                jobHealthInsurance: member.jobHealthInsurance || false,
                recentMedicalBill: member.recentMedicalBill || false,
                oldMedicalBill: member.oldMedicalBill || false,
                pendingLawsuit: member.pendingLawsuit || false,
                injured: member.injured || false,
                recentMoveIn: member.recentMoveIn || false,
                parentDeceased: member.parentDeceased || false,
                parentLivingOutside: member.parentLivingOutside || false,
                parentPrivacy: member.parentPrivacy || false,
                spouseDeceased: member.spouseDeceased || false,
                spouseLivingOutside: member.spouseLivingOutside || false,
                spousePrivacy: member.spousePrivacy || false,
                healthPlan: member.healthPlan || false,
                currentDoctor: member.currentDoctor || false,
            }),

            insuranceInformation: {
                healthInsurance: encodeStatusBooleans.insuranceInformation("healthInsurance", member.insuranceInformation?.healthInsurance || {}),
                medicalExpense: encodeStatusBooleans.insuranceInformation("medicalExpense", member.insuranceInformation?.medicalExpense || {}),
                deceasedOrLivingOutside: encodeStatusBooleans.insuranceInformation("deceasedOrLivingOutside", member.insuranceInformation?.deceasedOrLivingOutside || {}),
                healthPlan: encodeStatusBooleans.insuranceInformation("healthPlan", member.insuranceInformation?.healthPlan || {})
            }
        }))
    }
    return backendApplication;
}