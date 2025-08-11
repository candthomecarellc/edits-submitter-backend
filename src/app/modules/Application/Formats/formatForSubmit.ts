import { ApplicationFrontend } from "../application.frontend.interface";


export const formatForSubmit = (application: ApplicationFrontend) => {

    console.log("starting formatting for submission");
    const formData1 = {
        applicantName: application.applicant?.first + ' ' + application.applicant?.middle + ' ' + application.applicant?.last,
        applicationDate: new Date().toISOString().split('T')[0],
        signatureDate: new Date().toISOString().split('T')[0],
        uscitizenshiporDOB: '',
        uscitizenshiporDOBFile: null,
        usCitizenship: '',
        usCitizenshipFile: null,
        identityDocument: '',
        identityDocumentFile: null,
        identityDocumentExtra: '',
        identityDocumentExtraFile: null,

        ImmigrationstatesIdentity: '',
        ImmigrationstatesIdentityFile: null,
        ImmigrationStatus: '',
        ImmigrationStatusFile: null,
        dobIdentity: '',
        dobIdentityFile: null,
        homeAddressDocument: '',
        homeAddressDocumentFile: null,

        wagesAndSalary: '',
        wagesAndSalaryFile: null,
        selfEmployment: '',
        selfEmploymentFile: null,
        unemploymentBenefits: '',
        unemploymentBenefitsFile: null,
        privatePensionsAnnuities: '',
        privatePensionsAnnuitiesFile: null,
        socialSecurity: '',
        socialSecurityFile: null,
        workersCompensation: '',
        workersCompensationFile: null,
        childSupportAlimony: '',
        childSupportAlimonyFile: null,
        veteransBenefits: '',
        veteransBenefitsFile: null,
        militaryPay: '',
        militaryPayFile: null,
        incomeFromRent: '',
        incomeFromRentFile: null,
        interestDividendsRoyalties: '',
        interestDividendsRoyaltiesFile: null,

        careForChildrenorAdults: '',
        careForChildrenorAdultsFile: null,
        courtOrdered: null,

        healthInsurance: {
            proofOfCurrentHealthInsurance: null,
            healthInsuranceTerminationLetter: null,
            medicareCard: null,
            confirmationOfMedicareApplication: null,
            medicareAwardorDenialLetter: null,
        },
        medicalBills: {
            proofofIncomeforMedicalBills: null,
            proofofhomeAddress: null,
            medicalBillsforLast3Months: null,
        },
        resources: {
            bankStatements: '',
            stocksBonds: '',
            copyOfLifeInsurancePolicy: '',
            burialtrust: '',
            deedForRealEstate: '',
        },

        proofOfstudentStatus: '',
        proofOfstudentStatusFile: null,
    };
    console.log(formData1);
    const formData2 = {
        //page 9
        personalInfo: {
            firstName: application.applicant?.first || '',
            middleName: application.applicant?.middle || '',
            lastName: application.applicant?.last || '',
            primaryPhoneNumber: application.primaryPhone?.number || '',
            primaryPhoneType: application.primaryPhone?.type || '',
            secondaryPhoneNumber: application.anotherPhone?.number || '',
            secondaryPhoneType: application.anotherPhone?.type || '',
            languageSpeak: application.languageSpoken || '',
            languageRead: application.languageRead || '',
        },
        homeLess: application.homeless || '',
        homeAddress: {
            street: application.residence?.street || '',
            city: application.residence?.city || '',
            state: application.residence?.state || '',
            zip: application.residence?.zip || '',
            county: application.residence?.country || '',
            apt: application.residence?.apartment || '',
        },
        mailingAddress: {
            street: application.mailingAddress?.street || '',
            city: application.mailingAddress?.city || '',
            state: application.mailingAddress?.state || '',
            zip: application.mailingAddress?.zip || '',
            apt: application.mailingAddress?.apartment || '',
        },
        anotherPerson: {
            name: application.mailingAddress2?.associateName || '',
            phoneNumber: application.mailingAddress2?.phone || '',
            phoneType: 'home',
            street: application.mailingAddress2?.street || '',
            city: application.mailingAddress2?.city || '',
            zip: application.mailingAddress2?.zip || '',
            apt: '',
            permissions: {
                ApplyMedicaidForMe: application.applyOrRenew || '',
                disussMyCase: application.discuss || '',
                getNoticesAndCorrespondence: application.getNotice || '',
            },
        },
    };
    console.log(formData2);
    const formData3 = {
        blindNoticeType: '',
        familyInfo: application.householdMember.map(member => ({
            legalName: {
                firstName: member.legalName?.first || '',
                middleName: member.legalName?.middle || '',
                lastName: member.legalName?.last || '',
            },
            birthName: {
                firstName: member.otherName?.first || '',
                middleName: member.otherName?.middle || '',
                lastName: member.otherName?.last || '',
            },
            cityOfBirth: '',
            stateOfBirth: '',
            countryOfBirth: '',
            dateOfBirth: {
                month: (new Date(member.dateOfBirth).getMonth() || -1) + 1,
                day: new Date(member.dateOfBirth).getDate() || '',
                year: new Date(member.dateOfBirth).getFullYear() || '',
            },
            sex: member.sex || '',
            genderIdentity: member.gender || '',
            isPregnant: member.pregnant || '',
            isParent: member.responsibleAdult || '',
            isApplyingFor: '',
            pregnantDueDate: {
                month: (new Date(member.pregnantDueDate).getMonth() || -1) + 1,
                day: new Date(member.pregnantDueDate).getDate() || '',
                year: new Date(member.pregnantDueDate).getFullYear() || '',
            },
            relationship: member.relationshipToApplicant || '',
            publicHealthCoverage: (member.medicaid || member.familyHealthPlus) || '',
            publicHealthCoverageidNumber: member.healthInsurance?.medicaidCardId || member.healthInsurance?.familyHealthPlusCardId || '',
            ssn: member.ssn || '',
            usCitizenship: '',
            usCitizenshipReceivedImmigrationStatusDate: {
                month: (new Date(member.alienDateOfEntry).getMonth() || -1) + 1,
                day: new Date(member.alienDateOfEntry).getDate() || '',
                year: new Date(member.alienDateOfEntry).getFullYear() || '',
            },
            race: '',
            receivedAServiceFromIHS: '',
        })),
    };
    console.log(formData3);
    const earningsFromWork: {
        name: string;
        tyoeOfWork: string;
        howMuchEarned: string;
        howOftenPaid: string;
    }[] = [];
    application.householdMember.forEach(member => {
        member.income.earnedIncome.forEach(income => {
            earningsFromWork.push({
                name: member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last,
                tyoeOfWork: income.employerName || '',
                howMuchEarned: income.amount.toString() || '',
                howOftenPaid: income.period || '',
            })
        })
    })
    const unearnedIncomes: {
        name: string;
        typeOfIncome: string;
        howMuchEarned: string;
        howOftenPaid: string;
    }[] = [];
    application.householdMember.forEach(member => {
        member.income.unearnedIncome.forEach(income => {
            unearnedIncomes.push({
                name: member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last,
                typeOfIncome: income.source || '',
                howMuchEarned: income.amount.toString() || '',
                howOftenPaid: income.period || '',
            })
        })
    })
    const otherIncomes: {
        name: string;
        typeOfIncome: string;
        howMuch: string;
        howOftenPaid: string;
    }[] = [];
    application.householdMember.forEach(member => {
        member.income.resource.forEach(resource => {
            otherIncomes.push({
                name: member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last,
                typeOfIncome: resource.cd || '',
                howMuch: resource.value.toString() || '',
                howOftenPaid: resource.period || '',
            })
        })
    })  
    const formData4 = {
        householdVeteran: application.householdMember.some(member => member.veteran),
        veteranName: application.householdMember.some(member => member.veteran)
        ? application.householdMember.find(member => member.veteran)?.legalName?.first || '' + ' ' + application.householdMember.find(member => member.veteran)?.legalName?.middle || '' + ' ' + application.householdMember.find(member => member.veteran)?.legalName?.last || ''
        : '',
        selfEmploymentInfo: '',
        earningFromWork: earningsFromWork,
        noUnearnedIncome: application.householdMember.some(member => member.income.unearnedIncome.length > 0) ? false : true,
        unearnedIncome: unearnedIncomes,
        noContributions: '',
        contributions: [
            {
                name: '',
                typeOfIncome: '',
                howMuch: '',
                howOftenPaid: '',
            },
        ],
        noOtherIncome: application.householdMember.some(member => member.income.resource.length > 0) ? false : true,
        otherIncome: otherIncomes,
    };
    console.log(formData4);
    const formData5 = {
        applingAdulthaveNoIncome: application.householdMember.some(member => member.income.earnedIncome.length > 0) ? false : true,
        explainHowLiving: application.wayOfLiving || '',
        applierChangeJob: {
            changeJobin3Month: application.householdMember.some(member => member.changedJob),
            lastJobDate: {
                month: application.householdMember.find(member => member.changedJob)?.lastJobDate ? (new Date(application.householdMember.find(member => member.changedJob)?.lastJobDate || new Date()).getMonth() || -1) + 1 : '',
                day: application.householdMember.find(member => member.changedJob)?.lastJobDate ? new Date(application.householdMember.find(member => member.changedJob)?.lastJobDate || new Date()).getDate() : '',
                year: application.householdMember.find(member => member.changedJob)?.lastJobDate ? new Date(application.householdMember.find(member => member.changedJob)?.lastJobDate || new Date()).getFullYear() : '',
            },
            nameofEmployer: application.householdMember.find(member => member.changedJob)?.employerName || '',
        },
        applierStudent: {
            student: application.householdMember.some(member => member.studentId),
            studentType: application.householdMember.find(member => member.studentId)?.studentType || '',
            nameOfStudent: application.householdMember.find(member => member.studentId)?.legalName?.first + ' ' + application.householdMember.find(member => member.studentId)?.legalName?.middle + ' ' + application.householdMember.find(member => member.studentId)?.legalName?.last,
        },
        payForChildCare: application.householdExpense.childCare.length > 0 ? 'Yes' : 'No',
        childCare: application.householdExpense.childCare.map(child => ({
            childName: child.name || '',
            howMuchPaid: child.amount || '',
            howOftenPaid: child.period || '',
        })),
        familyPlanningServiceOnly: application.familyPlanning ? 'Yes' : 'No',
        isPayCourtOrdered: {
            payCourtOrdered: '',
            payCourtOrderedAmount: '',
            whoPayCourtOrdered: '',
        },
        applyingHavingMedicare: application.householdMember.some(member => member.medicare) ? 'Yes' : 'No',
        applyingHavingCommercialInsurance: {
            commercialInsurance: application.householdMember.some(member => member.commercialInsurance),
            nameOfInsured: application.householdMember.find(member => member.commercialInsurance)?.legalName?.first + ' ' + application.householdMember.find(member => member.commercialInsurance)?.legalName?.middle + ' ' + application.householdMember.find(member => member.commercialInsurance)?.legalName?.last,
            personCovered: application.householdMember.find(member => member.commercialInsurance)?.healthInsurance?.personsCovered || '',
            costOfPolicy: application.householdMember.find(member => member.commercialInsurance)?.healthInsurance?.costOfPolicy || '',
            endOfCoverage: {
                month: application.householdMember.find(member => member.commercialInsurance)?.healthInsurance?.endDateOfCoverage ? (new Date(application.householdMember.find(member => member.commercialInsurance)?.healthInsurance?.endDateOfCoverage || new Date()).getMonth() || -1) + 1 : '',
                day: application.householdMember.find(member => member.commercialInsurance)?.healthInsurance?.endDateOfCoverage ? new Date(application.householdMember.find(member => member.commercialInsurance)?.healthInsurance?.endDateOfCoverage || new Date()).getDate() : '',
                year: application.householdMember.find(member => member.commercialInsurance)?.healthInsurance?.endDateOfCoverage ? new Date(application.householdMember.find(member => member.commercialInsurance)?.healthInsurance?.endDateOfCoverage || new Date()).getFullYear() : '',
            },
        },
    };
    console.log(formData5);
    const formData6 = {
        currentJobInsurance: application.householdMember.some(member => member.jobHealthInsurance) ? 'Yes' : 'No',
        monthlyHousingPayment: application.householdExpense.shelterAmount.toString() || '',
        payForWater: {
            payForWaterAmount: application.householdExpense.waterCostAmount.toString() || '',
            howOftenPaid: application.householdExpense.waterCostPeriod || '',
        },
        freeHousingAsPartofYourPay: application.householdExpense.freeHousing ? 'Yes' : 'No',
        nursingHomeCare: application.householdExpense.nursingHome || '',
        blindOrDisabledOrChronicallyIll: application.householdExpense.blindDisableChronicallyIll ? 'Yes' : 'No',

        prescriptionBill3Month: {
            prescriptionBill: application.householdMember.some(member => member.recentMedicalBill),
            name: application.householdMember.find(member => member.recentMedicalBill)?.legalName?.first + ' ' + application.householdMember.find(member => member.recentMedicalBill)?.legalName?.middle + ' ' + application.householdMember.find(member => member.recentMedicalBill)?.legalName?.last,
            whichMonth: application.householdMember.find(member => member.recentMedicalBill)?.healthInsurance?.monthBilled || '',
        },
        prescriptionBillOlder: application.householdMember.some(member => member.oldMedicalBill) ? 'Yes' : 'No',
        moveIntoThisCounty: {
            move: application.householdMember.some(member => member.recentMoveIn),
            who: application.householdMember.find(member => member.recentMoveIn)?.legalName?.first + ' ' + application.householdMember.find(member => member.recentMoveIn)?.legalName?.middle + ' ' + application.householdMember.find(member => member.recentMoveIn)?.legalName?.last,
            whichState: application.householdMember.find(member => member.recentMoveIn)?.healthInsurance?.moveInState || '',
            whichCounty: application.householdMember.find(member => member.recentMoveIn)?.healthInsurance?.moveInCounty || '',
        },
        pendingLawSuit: {
            pending: application.householdMember.some(member => member.pendingLawsuit),
            who: application.householdMember.find(member => member.pendingLawsuit)?.legalName?.first + ' ' + application.householdMember.find(member => member.pendingLawsuit)?.legalName?.middle + ' ' + application.householdMember.find(member => member.pendingLawsuit)?.legalName?.last,
        },
        workersCompensationCase: {
            workersCompensation: application.householdMember.some(member => member.injured),
            who: application.householdMember.find(member => member.injured)?.legalName?.first + ' ' + application.householdMember.find(member => member.injured)?.legalName?.middle + ' ' + application.householdMember.find(member => member.injured)?.legalName?.last,
        },
        deceased: {
            deceased: application.householdMember.some(member => member.parentDeceased || member.spouseDeceased),
            who: application.householdMember.some(member => member.parentDeceased || member.spouseDeceased)
            ? application.householdMember.find(member => member.parentDeceased || member.spouseDeceased)?.legalName?.first + ' ' + application.householdMember.find(member => member.parentDeceased || member.spouseDeceased)?.legalName?.middle + ' ' + application.householdMember.find(member => member.parentDeceased || member.spouseDeceased)?.legalName?.last
            : '',
        },
    };
    console.log(formData6);
    const formData7 = {
        parentLiveOutside: {
            parentLiveOutside: application.householdMember.some(member => member.parentLivingOutside),
            fearOfHarm: application.householdMember.find(member => member.parentLivingOutside)?.parentPrivacy ? true : false,
            childName1: application.householdMember.filter(member => member.parentLivingOutside).map(member => member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last)[0] || '',
            childName2: application.householdMember.filter(member => member.parentLivingOutside).map(member => member.legalName?.first + ' ' + member.legalName?.middle + ' ' + member.legalName?.last)[1] || '',
            nameOfParent1: application.householdMember.filter(member => member.parentLivingOutside)[0]?.parentOutside?.name || '',
            nameOfParent2: application.householdMember.filter(member => member.parentLivingOutside)[1]?.parentOutside?.name || '',
            dateOfBirth1: {
                month: application.householdMember.filter(member => member.parentLivingOutside)[0]?.parentOutside?.dob ? (new Date(application.householdMember.filter(member => member.parentLivingOutside)[0].parentOutside?.dob).getMonth() || -1) + 1 : '',
                day: application.householdMember.filter(member => member.parentLivingOutside)[0]?.parentOutside?.dob ? new Date(application.householdMember.filter(member => member.parentLivingOutside)[0].parentOutside?.dob).getDate() : '',
                year: application.householdMember.filter(member => member.parentLivingOutside)[0]?.parentOutside?.dob ? new Date(application.householdMember.filter(member => member.parentLivingOutside)[0].parentOutside?.dob).getFullYear() : '',
            },
            dateOfBirth2: {
                month: application.householdMember.filter(member => member.parentLivingOutside)[1]?.parentOutside?.dob ? (new Date(application.householdMember.filter(member => member.parentLivingOutside)[1].parentOutside?.dob).getMonth() || -1) + 1 : '',
                day: application.householdMember.filter(member => member.parentLivingOutside)[1]?.parentOutside?.dob ? new Date(application.householdMember.filter(member => member.parentLivingOutside)[1].parentOutside?.dob).getDate() : '',
                year: application.householdMember.filter(member => member.parentLivingOutside)[1]?.parentOutside?.dob ? new Date(application.householdMember.filter(member => member.parentLivingOutside)[1].parentOutside?.dob).getFullYear() : '',
            },
            street1: application.householdMember.filter(member => member.parentLivingOutside)[0]?.parentOutside?.street || '',
            street2: application.householdMember.filter(member => member.parentLivingOutside)[1]?.parentOutside?.street || '',
            city1: application.householdMember.filter(member => member.parentLivingOutside)[0]?.parentOutside?.city || '',
            city2: application.householdMember.filter(member => member.parentLivingOutside)[1]?.parentOutside?.city || '',
            ssn1: application.householdMember.filter(member => member.parentLivingOutside)[0]?.parentOutside?.ssn || '',
            ssn2: application.householdMember.filter(member => member.parentLivingOutside)[1]?.parentOutside?.ssn || '',
        },
        marriedLivesOutside: {
            marriedLivesOutside: application.householdMember.some(member => member.spouseLivingOutside),
            fearOfHarm: application.householdMember.find(member => member.spouseLivingOutside)?.spousePrivacy ? true : false,
            applyingPerson: application.householdMember.find(member => member.spouseLivingOutside)?.legalName?.first + ' ' + application.householdMember.find(member => member.spouseLivingOutside)?.legalName?.middle + ' ' + application.householdMember.find(member => member.spouseLivingOutside)?.legalName?.last,
            spouseName: application.householdMember.find(member => member.spouseLivingOutside)?.spouseOutside?.name || '',
            dateOfBirth: {
                month: application.householdMember.find(member => member.spouseLivingOutside)?.spouseOutside?.dob ? (new Date(application.householdMember.find(member => member.parentLivingOutside)?.spouseOutside?.dob || new Date()).getMonth() || -1) + 1 : '',
                day: application.householdMember.find(member => member.spouseLivingOutside)?.spouseOutside?.dob ? new Date(application.householdMember.find(member => member.parentLivingOutside)?.spouseOutside?.dob || new Date()).getDate() : '',
                year: application.householdMember.find(member => member.spouseLivingOutside)?.spouseOutside?.dob ? new Date(application.householdMember.find(member => member.parentLivingOutside)?.spouseOutside?.dob || new Date()).getFullYear() : '',
            },
            street: application.householdMember.find(member => member.spouseLivingOutside)?.spouseOutside?.street || '',
            city: application.householdMember.find(member => member.spouseLivingOutside)?.spouseOutside?.city || '',
            ssn: application.householdMember.find(member => member.spouseLivingOutside)?.spouseOutside?.ssn || '',
        },
    };
    console.log(formData7);
    const formData8 = {
        doWanttoJoinHealthPlan: application.householdMember.some(member => member.healthPlan),
        healthPlan: application.householdMember.map(member => ({
            firstName: member.legalName?.first || '',
            lastName: member.legalName?.last || '',
            dob: member.dateOfBirth || '',
            ssn: member.ssn || '',
            nameOfHealthPlan: member.healthInsurance?.healthPlan?.healthPlanName || '',
            preferred: {
                preferredDoctorOrClinic: member.healthInsurance?.healthPlan?.preferredDoctor || '',
                currentProvider: member.currentDoctor || '',
            },
            obGyn: member.healthInsurance?.healthPlan?.obGyn || '',
        })),
        uniqueTiffId: '',
        caseName: {
            firstName: application.caseName.split(' ')[0] || '',
            lastName: application.caseName.split(' ')[2] || '',
        },
        clientNoticeLanguage: application.clientNoticeLanguage || '',
        languageRead: application.languageRead || '',
        dateAdmitted_SNF: '',
        residence: {
            house: application.residence?.house || '',
            street: application.residence?.street || '',
            apt: application.residence?.apartment || '',
            city: application.residence?.city || '',
            state: application.residence?.state || '',
            zipCode: application.residence?.zip || '',
            phoneNumber: application.residence?.phone || '',
        },
        mailAddress: {
            house: '',
            apt: application.mailingAddress?.apartment || '',
            city: application.mailingAddress?.city || '',
            state: application.mailingAddress?.state || '',
            zipCode: application.mailingAddress?.zip || '',
        },
        secondMail: {
            associateName: application.mailingAddress2?.associateName || '',
            inCareName: application.mailingAddress2?.inCareOf || '',
            street: application.mailingAddress2?.street || '',
            city: application.mailingAddress2?.city || '',
            state: application.mailingAddress2?.state || '',
            zipCode: application.mailingAddress2?.zip || '',
            phoneNumber: application.mailingAddress2?.phone || '',
        },
    };
    console.log(formData8);
    const formData9 = {
        languageSpoken: application.languageSpoken || '',
        contactName: application.contactName || '',
        contactPhoneNumber: application.contactPhone || '',
        caseComposition: application.caseComposition || '',
        EDC1: application.edc1 || '',
        EDC2: application.edc2 || '',
        fuelType: application.householdExpense.fuelType || '',
        shelterType: application.householdExpense.shelterType || '',
        shelterAmount: application.householdExpense.shelterAmount || '',
        waterAmount: application.householdExpense.waterCostAmount || '',
        addTY: application.householdExpense.addType || '',
        addTYAmount: application.householdExpense.addAmount || '',
        SSI: {
            DM: application.householdExpense.ssi.ssiDm || '',
            LA: application.householdExpense.ssi.ssiLa || '',
            noDM: application.householdExpense.ssi.ssiNoDm || '',
            noAll: application.householdExpense.ssi.ssiNoAll || '',
            buy: application.householdExpense.ssi.ssiBuy || '',
        },
        chronicCare: {
            date: application.householdExpense.chronicCare.chronicCareDateIns || '',
            PIA: application.householdExpense.chronicCare.chronicCarePia || '',
            CON: application.householdExpense.chronicCare.chronicCareCon || '',
            amount: application.householdExpense.chronicCare.chronicCareAmount || '',
            LOC: application.householdExpense.chronicCare.chronicCareLoc || '',
        },
        earnedIncome: {
            LN: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.lineNumber || '',
            CTG: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].ctg || '',
            childIdentifier: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.childIdentifier || '',
            chronicCareIndicator: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.chronicCareIndicator || '',
            EID: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].eid || '',
            SRC: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].source || '',
            PER: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].period || '',
            employmentStatus: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].employmentStatus || '',
            gross: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].amount || '',
            INSUR: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].insur || '',
            CTSUP: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].ctSup || '',
            WKREL: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].wkRel || '',
            IRWE: application.householdMember.find(member => member.income.earnedIncome.length > 0)?.income.earnedIncome[0].irwe || '',
        },
    };
    console.log(formData9);
    const formData10 = {
        child_Care: {
            MOYR1: application.householdExpense.childCare[0].month + '' + application.householdExpense.childCare[0].year.toString().slice(-2),
            amount1: application.householdExpense.childCare[0].amount || '',
            MOYR2: application.householdExpense.childCare[1].month + '' + application.householdExpense.childCare[1].year.toString().slice(-2),
            amount2: application.householdExpense.childCare[1].amount || '',
            MOYR3: application.householdExpense.childCare[2].month + '' + application.householdExpense.childCare[2].year.toString().slice(-2),
            amount3: application.householdExpense.childCare[2].amount || '',
        },
        unearned_Income: {
            LN: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.lineNumber || '',
            CTG: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.income.unearnedIncome[0].ctg || '',
            childIdentifier: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.childIdentifier || '',
            chronicCareIndicator: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.chronicCareIndicator || '',
            incomeSourceCode: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.income.unearnedIncome[0].source || '',
            period: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.income.unearnedIncome[0].period || '',
            amount: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.income.unearnedIncome[0].amount || '',
            CD1: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.income.unearnedIncome[0].cd1 || '',
            exempt1: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.income.unearnedIncome[0].exempt1 || '',
            CD2: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.income.unearnedIncome[0].cd2 || '',
            exempt2: application.householdMember.find(member => member.income.unearnedIncome.length > 0)?.income.unearnedIncome[0].exempt2 || '',
        },
        resource: {
            LN: application.householdMember.find(member => member.income.resource.length > 0)?.lineNumber || '',
            categoricalIndicator: application.householdMember.find(member => member.income.resource.length > 0)?.income.resource[0].ctg || '',
            childIdentifier: application.householdMember.find(member => member.income.resource.length > 0)?.childIdentifier || '',
            chronicCareIndicator: application.householdMember.find(member => member.income.resource.length > 0)?.chronicCareIndicator || '',
            unused: '',
            CD: application.householdMember.find(member => member.income.resource.length > 0)?.income.resource[0].cd || '',
            resValue: application.householdMember.find(member => member.income.resource.length > 0)?.income.resource[0].value || '',
            UTXN2_Flag: application.householdMember.find(member => member.income.resource.length > 0)?.income.resource[0].utxn2Flag || '',
        },
    };
    console.log(formData10);
    const formData11 = {
        householdComposition: application.householdMember.map(member => ({
            submitionType: '',
            line: member.lineNumber || '',
            name_First: member.legalName?.first || '',
            name_Middle: member.legalName?.middle || '',
            name_Last: member.legalName?.last || '',
            birth_date: member.dateOfBirth || '',
            sex: member.sex || '',
            ssn: member.ssn || '',
            ma: member.medicalAssistance || '',
            resp_adult: member.responsibleAdult || '',
            ethnicH: member.ethnicity.hispanic || '',
            ethnicI: member.ethnicity.indian || '',
            ethnicA: member.ethnicity.asian || '',
            ethnicB: member.ethnicity.black || '',
            ethnicP: member.ethnicity.pacificIslander || '',
            ethnicW: member.ethnicity.white || '',
            name_code: member.otherName?.code || '',
            aliasFirst: member.otherName?.first || '',
            aliasMiddle: member.otherName?.middle || '',
            aliasLast: member.otherName?.last || '',
            pregnant: member.pregnant || '',
            cin: '',
            state_charge_cd: member.fedChargeCd || '',
            state_chg_date: member.fedChargeDate || '',
            TASA: member.tasa || '',
            EMP: member.emp || '',
            SSI: member.ssi || '',
            BCS: member.bcs || '',
            relationship_to_applicant: member.relationshipToApplicant || '',
            CIBIC_CC: member.cbicCc || '',
            CIBIC_CDC: member.cbicCdc || '',
            student_ID: member.studentId || '',
            ACI: member.aci || '',
            AlienNo: member.alienNumber || '',
            AlienDOE: member.alienDateOfEntry || '',
            maritalStatus: member.maritalStatus || '',
            educationLevel: member.educationLevel || '',
            alienEnteredCountry: member.alienDateEnteredCountry || '',
            PID: member.pid || '',
            SSN_Validation: '',
            DOH_BirthVerification: '',
            WMS_Cat_CD: '',
            DAI: '',
            NH_Stay: '',
            sub_MAP3044: '',
            sub_DOH5178A: '',
            sub_DOH4495A: '',
            sub_DOH5149: '',
        })),
    };
    console.log(formData11);
    console.log("formatting completed");
    const formData = {
        ...formData1,
        ...formData2,
        ...formData3,
        ...formData4,
        ...formData5,
        ...formData6,
        ...formData7,
        ...formData8,
        ...formData9,
        ...formData10,
        ...formData11,
    }
    console.log('first: ',application.householdMember.find(member => member.veteran)?.legalName?.first || '');
    console.log('middle: ',application.householdMember.find(member => member.veteran)?.legalName?.middle || '');
    console.log('last: ',application.householdMember.find(member => member.veteran)?.legalName?.last || '');
        
    return formData;
}