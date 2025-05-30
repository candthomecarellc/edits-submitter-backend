import { Application } from './application.model';
import { Application as ApplicationInterface } from './application.interface';

const sampleApplications: ApplicationInterface[] = [
    {
        applicant: {
            code: 1,
            first: "John",
            middle: "Robert",
            last: "Doe"
        },
        primaryPhone: {
            type: 1,
            number: 5551234567
        },
        anotherPhone: {
            type: 2,
            number: 5559876543
        },
        languageSpoken: "English",
        languageRead: "English",
        residence: {
            apartment: 101,
            house: 123,
            street: "Main Street",
            state: "CA",
            city: "Los Angeles",
            country: "USA",
            zip: 90001,
            phone: {
                type: 1,
                number: 5551234567
            }
        },
        mailingAddress: {
            associateName: {
                code: 1,
                first: "John",
                middle: "Robert",
                last: "Doe"
            },
            inCareOf: {
                code: 2,
                first: "Jane",
                middle: "",
                last: "Doe"
            },
            address: {
                apartment: 101,
                house: 123,
                street: "Main Street",
                state: "CA",
                city: "Los Angeles",
                country: "USA",
                zip: 90001,
                phone: {
                    type: 1,
                    number: 5551234567
                }
            },
            accessRight: 1
        },
        mailingAddress2: {
            associateName: {
                code: 1,
                first: "John",
                middle: "Robert",
                last: "Doe"
            },
            inCareOf: {
                code: 2,
                first: "Jane",
                middle: "",
                last: "Doe"
            },
            address: {
                apartment: 101,
                house: 123,
                street: "Main Street",
                state: "CA",
                city: "Los Angeles",
                country: "USA",
                zip: 90001,
                phone: {
                    type: 1,
                    number: 5551234567
                }
            },
            accessRight: 1
        },
        contactName: "Jane Doe",
        contactPhone: {
            type: 1,
            number: 5559876543
        },
        caseComposition: 1,
        edc1: 1,
        edc2: 1,
        familyPlanning: true,
        householdExpence: {
            fuelCost: {
                category: 1,
                type: 1,
                amount: 200,
                period: 1
            },
            shelterCost: {
                category: 2,
                type: 1,
                amount: 1500,
                period: 1
            },
            waterCost: {
                category: 3,
                type: 1,
                amount: 100,
                period: 1
            },
            addCost: {
                category: 4,
                type: 1,
                amount: 300,
                period: 1
            },
            freeHousing: 0,
            budgetType: 1,
            childCare: [
                {
                    name: "ABC Daycare",
                    month: 1,
                    year: 2024,
                    childCareCost: {
                        category: 5,
                        type: 1,
                        amount: 800,
                        period: 1
                    }
                }
            ],
            ssi: {
                ssiDm: 0,
                ssiLa: 0,
                ssiNoDm: 0,
                ssiNoAll: 0,
                ssiBuy: "0"
            },
            nursingHome: false,
            blindDisableChronicallyIll: false,
            chronicCare: {
                chronicCareDateIns: new Date(),
                chronicCarePia: "N/A",
                chronicCareCon: 0,
                chronicCareAmount: 0,
                chronicCareLoc: 0
            }
        },
        wayOfLiving: "Renting",
        householdMember: [
            {
                lineNumber: 1,
                legalName: {
                    code: 1,
                    first: "John",
                    middle: "Robert",
                    last: "Doe"
                },
                otherName: {
                    code: 1,
                    first: "John",
                    middle: "Robert",
                    last: "Doe"
                },
                dateOfBirth: new Date("1980-01-01"),
                sex: true,
                gender: "Male",
                ssn: "123-45-6789",
                ethnicity: [
                    {
                        type: 1,
                        status: 1
                    }
                ],
                status: 1,
                pregnantDueDate: new Date(),
                fedChargeCd: 0,
                fedChargeDate: new Date(),
                tasa: 0,
                emp: 1,
                ssi: 0,
                bcs: 0,
                relationshipToApplicant: 1,
                cibicCc: 0,
                cibicCdc: 0,
                studentId: 0,
                aci: 0,
                alienNumber: 0,
                alienDateOfEntry: new Date(),
                maritalStatus: 1,
                educationLevel: 4,
                elienDateEnteredCountry: new Date(),
                pid: 0,
                childIdentifier: 0,
                chronicCareIndicator: 0,
                income: {
                    incomeCode: 1,
                    lastJobDate: new Date(),
                    employerName: "ABC Company",
                    studentType: 0,
                    earnedIncome: [
                        {
                            employerName: "ABC Company",
                            ctg: 1,
                            eid: 1,
                            employmentStatus: 1,
                            earnedIncome: {
                                category: 1,
                                type: 1,
                                amount: 5000,
                                period: 1
                            },
                            insur: 1,
                            ctSup: 0,
                            wkRel: 0,
                            irwe: 0
                        }
                    ],
                    unearnedIncome: [{
                        ctg: 1,
                        unearnedIncome: {
                            category: 1,
                            type: 1,
                            amount: 5000,
                            period: 1
                        },
                        cd1: 0,
                        exempt1: 0,
                        cd2: 0,
                        exempt2: 0
                    }],
                    resource: [{
                        ctg: 1,
                        resource: {
                            category: 1,
                            type: 1,
                            amount: 5000,
                            period: 1
                        },
                        utxn2Flag: 0
                    }]
                },
                healthInsurance: {
                    healthInsuranceCode: 1,
                    benefitCardId: "123456789",
                    personsCovered: "Self",
                    costOfPolicy: 200,
                    endDateOfCoverage: new Date("2024-12-31"),
                    monthBilled: "January",
                    moveInState: "CA",
                    moveInCountry: "USA",
                    healthPlan: {
                        healthPlanName: "Blue Cross",
                        currentDoctor: true,
                        preferredDoctor: "Dr. Smith",
                        obGyn: "N/A"
                    }
                },
                parentOutside: {
                    outsideCode: 0,
                    name: "N/A",
                    dob: new Date(),
                    street: "N/A",
                    city: "N/A",
                    ssn: "N/A"
                },
                spouseOutside: {
                    outsideCode: 0,
                    name: "N/A",
                    dob: new Date(),
                    street: "N/A",
                    city: "N/A",
                    ssn: "N/A"
                }
            }
        ]
    }
];

export const seedApplications = async (): Promise<void> => {
    try {
        // Clear existing data
        await Application.deleteMany({});
        
        // Insert sample data
        await Application.insertMany(sampleApplications);
        
        console.log('Sample applications seeded successfully');
    } catch (error) {
        console.error('Error seeding applications:', error);
        throw error;
    }
};