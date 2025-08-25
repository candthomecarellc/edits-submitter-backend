import { ApplicationFrontend } from "../application.frontend.interface";
import { Application } from "../application.interface";
import { formatForFrontend } from "./backendToFrontend";
import { formatForBackend } from "./frontendToBackend";

// Helper function to merge household members
const mergeHouseholdMembers = (existingMembers: ApplicationFrontend['householdMember'], newMembers: ApplicationFrontend['householdMember']) => {
    if (!newMembers || newMembers.length === 0) {
        return existingMembers;
    }

    if (!existingMembers || existingMembers.length === 0) {
        return newMembers;
    }

    const mergedMembers = [...existingMembers];

    newMembers.forEach(newMember => {
        const existingIndex = mergedMembers.findIndex(existing => existing._id?.toString() === newMember._id?.toString());
        
        if (existingIndex >= 0) {
            // Update existing member
            const existingMember = mergedMembers[existingIndex];
            mergedMembers[existingIndex] = {
                ...existingMember,
                ...newMember,
                // Handle nested objects properly
                legalName: {
                    ...existingMember.legalName,
                    ...newMember.legalName
                },
                otherName: {
                    ...existingMember.otherName,
                    ...newMember.otherName
                },
                ethnicity: {
                    ...existingMember.ethnicity,
                    ...newMember.ethnicity
                },
                generalInformation: {
                    ...existingMember.generalInformation,
                    ...newMember.generalInformation,
                    personalInformation: {
                        ...existingMember.generalInformation?.personalInformation,
                        ...newMember.generalInformation?.personalInformation
                    },
                    statusInformation: {
                        ...existingMember.generalInformation?.statusInformation,
                        ...newMember.generalInformation?.statusInformation
                    },
                    memberIncome: {
                        ...existingMember.generalInformation?.memberIncome,
                        ...newMember.generalInformation?.memberIncome
                    },
                    ethnicCitizenshipInformation: {
                        ...existingMember.generalInformation?.ethnicCitizenshipInformation,
                        ...newMember.generalInformation?.ethnicCitizenshipInformation
                    },
                    otherInformation: {
                        ...existingMember.generalInformation?.otherInformation,
                        ...newMember.generalInformation?.otherInformation
                    }
                },
                income: {
                    ...existingMember.income,
                    ...newMember.income,
                    // Merge income arrays by _id
                    earnedIncome: mergeIncomeArray(existingMember.income?.earnedIncome || [], newMember.income?.earnedIncome || []),
                    unearnedIncome: mergeIncomeArray(existingMember.income?.unearnedIncome || [], newMember.income?.unearnedIncome || []),
                    resource: mergeIncomeArray(existingMember.income?.resource || [], newMember.income?.resource || [])
                },
                healthInsurance: {
                    ...existingMember.healthInsurance,
                    ...newMember.healthInsurance,
                    healthPlan: {
                        ...existingMember.healthInsurance?.healthPlan,
                        ...newMember.healthInsurance?.healthPlan
                    }
                },
                parentOutside: {
                    ...existingMember.parentOutside,
                    ...newMember.parentOutside
                },
                spouseOutside: {
                    ...existingMember.spouseOutside,
                    ...newMember.spouseOutside
                },
                documentVerifications: {
                    ...existingMember.documentVerifications,
                    ...newMember.documentVerifications
                },
                insuranceInformation: {
                    ...existingMember.insuranceInformation,
                    ...newMember.insuranceInformation,
                    healthInsurance: {
                        ...existingMember.insuranceInformation?.healthInsurance,
                        ...newMember.insuranceInformation?.healthInsurance
                    },
                    medicalExpense: {
                        ...existingMember.insuranceInformation?.medicalExpense,
                        ...newMember.insuranceInformation?.medicalExpense
                    },
                    deceasedOrLivingOutside: {
                        ...existingMember.insuranceInformation?.deceasedOrLivingOutside,
                        ...newMember.insuranceInformation?.deceasedOrLivingOutside
                    },
                    healthPlan: {
                        ...existingMember.insuranceInformation?.healthPlan,
                        ...newMember.insuranceInformation?.healthPlan
                    }
                }
            };
        } else {
            // Add new member
            mergedMembers.push(newMember);
        }
    });

    return mergedMembers;
};

// Helper function to merge income arrays
const mergeIncomeArray = (existingIncome: any[], newIncome: any[]) => {
    if (!newIncome || newIncome.length === 0) {
        return existingIncome;
    }

    if (!existingIncome || existingIncome.length === 0) {
        return newIncome;
    }

    const mergedIncome = [...existingIncome];

    newIncome.forEach(newItem => {
        const existingIndex = mergedIncome.findIndex(existing => existing._id?.toString() === newItem._id?.toString());
        
        if (existingIndex >= 0) {
            // Update existing income item
            mergedIncome[existingIndex] = {
                ...mergedIncome[existingIndex],
                ...newItem,
                fieldStatus: {
                    ...mergedIncome[existingIndex].fieldStatus,
                    ...newItem.fieldStatus
                }
            };
        } else {
            // Add new income item
            mergedIncome.push(newItem);
        }
    });

    return mergedIncome;
};

const mergeChildCareArray = (existingChildCare: ApplicationFrontend['householdExpense']['childCare'], newChildCare: ApplicationFrontend['householdExpense']['childCare']) => {
    if (!newChildCare || newChildCare.length === 0) {
        return existingChildCare;
    }
    if (!existingChildCare || existingChildCare.length === 0) {
        return newChildCare;
    }
    const mergedChildCare = [...existingChildCare];
    newChildCare.forEach(newItem => {
        const existingIndex = mergedChildCare.findIndex(existing => existing._id?.toString() === newItem._id?.toString());
        if (existingIndex >= 0) {
            mergedChildCare[existingIndex] = {
                ...mergedChildCare[existingIndex],
                ...newItem
            }
        }
    });
    return mergedChildCare;
}

export const mergeApplication = (existingApplication: Partial<Application>, applicationData: Partial<ApplicationFrontend>) => {
    
        // console.log("existingApplication", existingApplication);
        // Convert existing application to frontend format
        const existingFrontend = formatForFrontend(existingApplication) as ApplicationFrontend;
        // console.log("existingFrontend", existingFrontend);
        // Merge the updates with existing data
        const mergedData = {
            ...existingFrontend,
            ...applicationData,
            // Handle nested objects properly
            applicant: {
                ...existingFrontend.applicant,
                ...applicationData.applicant
            },
            primaryPhone: {
                ...existingFrontend.primaryPhone,
                ...applicationData.primaryPhone
            },
            anotherPhone: {
                ...existingFrontend.anotherPhone,
                ...applicationData.anotherPhone
            },
            residence: {
                ...existingFrontend.residence,
                ...applicationData.residence
            },
            mailingAddress: {
                ...existingFrontend.mailingAddress,
                ...applicationData.mailingAddress
            },
            mailingAddress2: {
                ...existingFrontend.mailingAddress2,
                ...applicationData.mailingAddress2
            },
            fieldStatus: {
                ...existingFrontend.fieldStatus,
                ...applicationData.fieldStatus,
                // Handle nested fieldStatus objects
                personalDetails: {
                    ...existingFrontend.fieldStatus?.personalDetails,
                    ...applicationData.fieldStatus?.personalDetails
                },
                homeAddress: {
                    ...existingFrontend.fieldStatus?.homeAddress,
                    ...applicationData.fieldStatus?.homeAddress
                },
                mailingAddress: {
                    ...existingFrontend.fieldStatus?.mailingAddress,
                    ...applicationData.fieldStatus?.mailingAddress
                },
                secondMailingAddress: {
                    ...existingFrontend.fieldStatus?.secondMailingAddress,
                    ...applicationData.fieldStatus?.secondMailingAddress
                },
                otherInformation: {
                    ...existingFrontend.fieldStatus?.otherInformation,
                    ...applicationData.fieldStatus?.otherInformation
                }
            },
            householdExpense: {
                ...existingFrontend.householdExpense,
                ...applicationData.householdExpense,
                // Handle nested householdExpense objects
                childCare: mergeChildCareArray(existingFrontend.householdExpense?.childCare || [], applicationData.householdExpense?.childCare || []),
                ssi: {
                    ...existingFrontend.householdExpense?.ssi,
                    ...applicationData.householdExpense?.ssi
                },
                chronicCare: {
                    ...existingFrontend.householdExpense?.chronicCare,
                    ...applicationData.householdExpense?.chronicCare
                },
                fieldStatus: {
                    ...existingFrontend.householdExpense?.fieldStatus,
                    ...applicationData.householdExpense?.fieldStatus,
                    housingExpense: {
                        ...existingFrontend.householdExpense?.fieldStatus?.housingExpense,
                        ...applicationData.householdExpense?.fieldStatus?.housingExpense
                    },
                    childCare: {
                        ...existingFrontend.householdExpense?.fieldStatus?.childCare,
                        ...applicationData.householdExpense?.fieldStatus?.childCare
                    },
                    otherExpenses: {
                        ...existingFrontend.householdExpense?.fieldStatus?.otherExpenses,
                        ...applicationData.householdExpense?.fieldStatus?.otherExpenses
                    }
                }
            },
            householdMember: mergeHouseholdMembers(
                existingFrontend.householdMember || [],
                applicationData.householdMember || []
            ),
        };
        // console.log("merged members", mergedData.householdMember);
        // Convert merged data to backend format and update
        return formatForBackend(mergedData);
}