/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Express } from 'express';
import CustomError from '../../errors/CusromError';

const takeAndProcessData = async (
    data: any,
    file: Express.Multer.File[],
): Promise<unknown> => {

    try {
        // Helper function to format strings and numbers
        const formatString = (value: string | undefined, maxLength: number) => {
            return (value || '').toUpperCase().substring(0, maxLength).padEnd(maxLength, ' ');
        };

        const formatNumber = (value: string | number | undefined, maxLength: number, isDecimal = false) => {
            let numStr = String(value || 0);
            if (isDecimal) {
                const parts = numStr.split('.');
                if (parts.length === 1) {
                    numStr += '.00'; // Add .00 if no decimal
                } else if (parts[1].length === 1) {
                    numStr += '0';  // Add 0 if only one decimal place
                } else if (parts[1].length > 2){
                    numStr = parts[0] + "." + parts[1].substring(0, 2); // make only two digit
                }
               
                // Remove the decimal for implied decimal formatting
                numStr = numStr.replace('.', '');
            }

            // Remove any non-numeric characters and non front zero
            numStr = numStr.replace(/[^0-9]/g, '');
            return numStr.padStart(maxLength, '0');
        };

        const formatDate = (value: string | undefined, format: 'MMDDYYYY' | 'MMYY' | 'MMDDYY' | 'HHMM') => {
            if (!value) {
                return ''.padEnd(format.length, ' ');
            }

            const dateParts = value.split(/[-/]/); // Split on hyphens or slashes
            let mm = '', dd = '', yy = '', hh = '', min = '';

            if (format === 'MMDDYYYY') {
                if (dateParts.length === 3) {
                    mm = dateParts[0].padStart(2, '0');
                    dd = dateParts[1].padStart(2, '0');
                    yy = dateParts[2].padStart(4, '0');
                    return `${mm}${dd}${yy}`;
                }

            } else if (format === 'MMYY') {
                if (dateParts.length === 2) {
                    mm = dateParts[0].padStart(2, '0');
                    yy = dateParts[1].padStart(2, '0');
                }
                return `${mm}${yy}`;

            } else if (format === 'MMDDYY') {
                if (dateParts.length === 3) {
                    mm = dateParts[0].padStart(2, '0');
                    dd = dateParts[1].padStart(2, '0');
                    yy = dateParts[2].substring(2, 4).padStart(2, '0'); // handle the year to set last two digits
                }
                return `${mm}${dd}${yy}`;

            } else if(format === "HHMM"){
                if(dateParts.length === 2){
                    hh = dateParts[0].padStart(2, '0');
                    min = dateParts[1].padStart(2, '0');
                }
                return `${hh}${min}`;
            }

            // return original value if wrong format
            return value;
        };

        // 1. Header Record
        const headerRecord = [
            'H', // Submission Type
            formatNumber(data.submitterId, 4), // Submitter ID
            formatNumber(data.numRecordsSent, 8), // # Records Sent
            formatDate(data.submissionDate, 'MMDDYYYY'), // Submission Date
            formatDate(data.submissionTime, 'HHMM'),  // Submission Time
            formatNumber(data.providerId, 8), // Provider ID
            '',  // add extra comma
        ].join(',');


        // 2. Data Record
        const dataRecord = [
            data.submissionType || 'N', // Submission Type (N, R, D) - Default to 'N'
            formatNumber(data.numHHCompRecordsExpected, 2), // # of HH Comp records expected
            formatNumber(data.numImageRecordsExpected, 3),   // # of Image records expected
            formatString(data.uniqueCaseId, 20),        // Unique Case ID
            formatString(data.uniqueTiffId, 20),       // Unique TIFF ID
            formatDate(data.signatureDate, 'MMDDYY'),   // Signature Date
            formatString(data.caseName, 28),            // Case Name
            formatNumber(data.unusedFieldNumNHTXRecordsExpected, 2), // Unused Field/# of NHTX records expected

            // ... other data fields, use formatString/formatNumber as needed ...
            formatString(data.applicationType, 5), // Application Type
            formatString(data.priority, 4),
            formatString(data.clientNoticeLanguage, 1),  // Client Notice Language (E or S)
            formatString(data.languageRead, 2), // Language Read
            formatDate(data.dateAdmittedToSNForICF, 'MMDDYYYY'), // Date admitted to SNF or ICF
            formatString(data.residenceAddressHouseNo, 9),  //Residence Address: House No
            formatString(data.residenceAddressStreetName, 21), //Residence Address: Street Name
            formatString(data.residenceAddressAptNum, 5), // Residence Address: Apt Num
            formatString(data.residenceAddressCity, 15), // Residence Address: City
            formatString(data.residenceAddressState, 2), // Residence Address: State
            formatNumber(data.residenceAddressZipCode, 9), // Residence Address: Zip
            formatNumber(data.residenceAddressPhoneNum, 10), // Residence Address: phone number
            formatString(data.mailingAddressHouseNoStreet, 30), // Mailing Address: House #/street
            formatString(data.mailingAddressAptNo, 5), // Mailing Address: Apt #
            formatString(data.mailingAddressCity, 15), // Mailing Address: City
            formatString(data.mailingAddressState, 2), // Mailing Address: State
            formatNumber(data.mailingAddressZipCode, 9), // Mailing Address: Zip code
            formatString(data.secondMailingAddressAssociateName, 28),// Second Mailing Address: Associate Name
            formatString(data.secondMailingAddressInCareOfName, 28),// Second Mailing Address: In Care of Name
            formatString(data.secondMailingAddressSecondAssociateStreet, 35),// Second Mailing Address: Second/Associate Street
            formatString(data.secondMailingAddressSecondAssociateCity, 15),// Second Mailing Address: Second/Associate City
            formatString(data.secondMailingAddressSecondAssociateState, 2), // Second Mailing Address: Second/Associate State
            formatNumber(data.secondMailingAddressSecondAssociateZip, 9), // Second Mailing Address: Second/Associate Zip
            formatNumber(data.secondMailingAddressPhoneNum, 10), // Second Mailing Address: Phone Num
            formatString(data.languageSpoken, 2),  // Language Spoken
            formatString(data.contactName, 28), // CONTACT NAME
            formatNumber(data.contactPhoneNum, 10), // CONTACT PHONE NUM
            formatNumber(data.caseComposition, 2), // CASE COMPOSITION
            formatNumber(data.eDC1, 6), // EDC1
            formatNumber(data.eDC2, 6), // EDC2
            formatNumber(data.fuelType, 1),  // Fuel Type
            formatNumber(data.shelterType, 2), // Shelter  Type
            formatNumber(data.shelterAmount, 7, true), // Shelter Amount
            formatNumber(data.waterAmount, 7, true), // Water Amount
            formatString(data.addTY, 2), // Add TY
            formatNumber(data.addTYAmount, 7, true), // Add TY Amount

            // SSI Data
            formatNumber(data.ssiDM, 1), // SSI DM
            formatNumber(data.ssiLA, 1), // SSI LA
            formatNumber(data.ssiNoDM, 1), // SSI No-DM
            formatNumber(data.ssiNoAll, 2), // SSI No-All
            formatString(data.ssiBuy, 1), // SSI Buy

            // Chronic Care Data
            formatDate(data.chronicCareDateINS, 'MMDDYYYY'), // Chronic Care Date INS
            formatString(data.chronicCarePIA, 1), // CHRONIC CARE_PIA
            formatNumber(data.chronicCareCON, 1), // Chronic Care CON
            formatNumber(data.chronicCareAmount, 7, true), // Chronic Care Amount
            formatNumber(data.chronicCareLOC, 2), // Chronic Care LOC

        ];

        // Earned Income (2 occurrences)
        for (let i = 1; i <= 2; i++) {
            dataRecord.push(
                formatNumber(data[`earnedIncome${i}LN`], 2), // LN
                formatNumber(data[`earnedIncome${i}CTG`], 1), // CTG
                formatNumber(data[`earnedIncome${i}ChildIdentifier`], 1), // Child Identifier
                formatString(data[`earnedIncome${i}ChronicCareIndicator`], 1), // Chronic Care Indicator
                formatNumber(data[`earnedIncome${i}EID`], 1), // EID
                formatString(data[`earnedIncome${i}SRC`], 2), // SRC
                formatString(data[`earnedIncome${i}Per`], 1), // Per
                formatString(data[`earnedIncome${i}EmploymentStatus`], 1), // Employment Status
                formatNumber(data[`earnedIncome${i}Gross`], 7, true), // Gross
                formatNumber(data[`earnedIncome${i}INSUR`], 7, true), // INSUR
                formatNumber(data[`earnedIncome${i}CTSUP`], 7, true), // CT-SUP
                formatNumber(data[`earnedIncome${i}WKREL`], 7, true), // WK-REL
                formatNumber(data[`earnedIncome${i}IRWE`], 7, true), // IRWE

                // Child Care (3 occurrences for each Earned Income)
                ...Array.from({ length: 3 }).flatMap((_, j) => [
                    formatDate(data[`earnedIncome${i}ChildCare${j + 1}MOYR`], 'MMYY'),  // MOYR
                    formatNumber(data[`earnedIncome${i}ChildCare${j + 1}Amount`], 7, true), // Amount
                ]),
                
            );
        }
        dataRecord.push("END") // end earned income

        // unearned income
        for(let i=1; i<=6; i++){
            dataRecord.push(
                formatNumber(data[`unearnedIncome${i}Ln`], 2), // Ln
                formatNumber(data[`unearnedIncome${i}CTG`], 1), // CTG
                formatNumber(data[`unearnedIncome${i}ChildIdentifier`], 1), // Child Identifier
                formatString(data[`unearnedIncome${i}ChronicCareIndicator`], 1), // Chronic Care Indicator
                formatString(data[`unearnedIncome${i}IncomeSourceCode`], 2), // Income Source Code
                formatString(data[`unearnedIncome${i}Period`], 1),  // Period
                formatNumber(data[`unearnedIncome${i}Amount`], 6, true), // Amount
                formatNumber(data[`unearnedIncome${i}CD1`], 2), // CD 1
                formatNumber(data[`unearnedIncome${i}Exempt1`], 7, true), // Exempt 1
                formatNumber(data[`unearnedIncome${i}CD2`], 2), // CD 2
                formatNumber(data[`unearnedIncome${i}Exempt2`], 7, true), // Exempt 2

            )
        }
        dataRecord.push("END");  // end unearned income

        // resources
         for(let i=1; i<=6; i++){
            dataRecord.push(
                formatNumber(data[`resources${i}Ln`], 2), // Ln
                formatNumber(data[`resources${i}CategoricalIndicator`], 1), // Categorical Indicator
                formatNumber(data[`resources${i}ChildIdentifier`], 1), // Child Identifier
                formatString(data[`resources${i}ChronicCareIndicator`], 1), // Chronic Care Indicator
                formatString(data[`resources${i}unused`], 1), // unused
                formatNumber(data[`resources${i}CD`], 2), // CD
                formatNumber(data[`resources${i}ResValue`], 7),  // Res Value
                formatNumber(data[`resources${i}UTXN2flag`], 1), // UTXN2 flag
                "".padEnd(8, ' '), // 8 filler
            )
        }
        // Add padding to dataRecord to ensure it has 193 fields
        while (dataRecord.length < 193) {
            dataRecord.push(''); // Add empty strings as padding
        }



        // 3.  NH-TX Record (Optional - for Nursing Home Transaction applications)
        let nhtxRecord = [];
        if (data.submissionType === 'NHTX' || data.submissionType === 'SNHTX') {
            nhtxRecord = [
                'X',  // Submission Type
                formatNumber(data.statusChangeType, 1),
                formatDate(data.statusChangeType1AdmissionDate, 'MMDDYYYY'),
                formatString(data.statusChangeType1CurrentCareLevel, 10),
                formatNumber(data.statusChangeType1FromFacilityID, 8),
                formatNumber(data.statusChangeType1ToFacilityID, 8),
                formatDate(data.statusChangeType2AdmissionDate, 'MMDDYYYY'),
                formatString(data.statusChangeType2HospitalName, 100),
                formatDate(data.statusChangeType3TerminationDate, 'MMDDYYYY'),
                formatDate(data.statusChangeType4ReturnDate, 'MMDDYYYY'),
                formatDate(data.statusChangeType5DeceaseDate, 'MMDDYYYY'),
                formatNumber(data.statusChangeType5ResourceAmount, 9, true),
                formatNumber(data.financialChangeSocialSecurityOldAmount, 9, true),
                formatNumber(data.financialChangeSocialSecurityNewAmount, 9, true),
                formatDate(data.financialChangeSocialSecurityEffectiveDate, 'MMDDYYYY'),
                formatNumber(data.financialChangeVeteransPensionOldAmount, 9, true),
                formatNumber(data.financialChangeVeteransPensionNewAmount, 9, true),
                formatDate(data.financialChangeVeteransPensionEffectiveDate, 'MMDDYYYY'),
                formatNumber(data.financialChangeOtherPensionOldAmount, 9, true),
                formatNumber(data.financialChangeOtherPensionNewAmount, 9, true),
                formatDate(data.financialChangeOtherPensionEffectiveDate, 'MMDDYYYY'),
                formatNumber(data.financialChangeHealthInsurancePremiumOldAmount, 9, true),
                formatNumber(data.financialChangeHealthInsurancePremiumNewAmount, 9, true),
                formatDate(data.financialChangeHealthInsurancePremiumEffectiveDate, 'MMDDYYYY'),
                formatNumber(data.financialChangeOther1OldAmount, 9, true),
                formatNumber(data.financialChangeOther1NewAmount, 9, true),
                formatDate(data.financialChangeOther1EffectiveDate, 'MMDDYYYY'),
                formatNumber(data.financialChangeOther2OldAmount, 9, true),
                formatNumber(data.financialChangeOther2NewAmount, 9, true),
                formatDate(data.financialChangeOther2EffectiveDate, 'MMDDYYYY'),
                formatString(data.demographicChangeFirstName, 25),
                formatString(data.demographicChangeMiddleName, 25),
                formatString(data.demographicChangeLastName, 17),
                formatDate(data.demographicChangeDOB, 'MMDDYYYY'),
                formatString(data.demographicChangeSEX, 1),
                formatNumber(data.demographicChangeSSN, 9),
                formatString(data.demographicChangeMedicareNumber, 50),
                formatString(data.demographicChangePartABIndicator, 1),
                formatDate(data.demographicChangeStartDate, 'MMDDYYYY'),
                formatString(data.demographicChangeContactName, 28),
                formatNumber(data.demographicChangeContactPhoneNumber, 10),
                formatNumber(data.dischargeIND, 1),
                formatDate(data.dischargeNoticeDate, 'MMDDYYYY'),
                formatString(data.dischargeNameOfFacility, 100),
                formatString(data.dischargeFacilityAddress, 30),
                formatString(data.dischargeFacilityCity, 15),
                formatString(data.dischargeFacilityState, 2),
                formatNumber(data.dischargeFacilityZip, 9),
                formatNumber(data.dischargeProviderNumber, 8),
                formatString(data.dischargeFacilityContactPerson, 28),
                formatNumber(data.dischargeFacilityContactPhoneNumber, 10),
                formatString(data.dischargeResidentsName, 28),
                formatString(data.dischargeResidentCIN, 8),
                formatNumber(data.dischargeResidentSSN, 9),
                formatDate(data.dischargeDateFrom, 'MMDDYYYY'),
                formatString(data.dischargeLocation, 50),
                formatString(data.dischargeOutOfState, 1),
                formatString(data.dischargeOwnHome, 1),
                formatString(data.dischargeRelativesHome, 1),
                formatString(data.dischargeIRA, 1),
                formatString(data.dischargeShelter, 1),
                formatString(data.dischargeOutOfCounty, 1),
                formatString(data.dischargeALPAdultHome, 1),
                formatString(data.dischargeCongregateCare, 1),
                formatString(data.dischargeHospital, 1),
                formatString(data.dischargeAWOL, 1),
                formatString(data.dischargeOtherLocation, 50),
                formatString(data.dischargeCommunityAddress, 30),
                formatString(data.dischargeCommunityCity, 15),
                formatString(data.dischargeCommunityState, 2),
                formatNumber(data.dischargeCommunityZipCode, 9),
                formatString(data.dischargeCommunityContactPerson, 28),
                formatNumber(data.dischargeCommunityContactPhone, 10),
                formatString(data.dischargeDialysisServiceneeded, 1),
                formatString(data.dischargeDialysisCenter, 50),
                formatString(data.dischargePrivateHomecareAgency, 28),
                formatString(data.dischargeCASAOffice, 50),
                formatString(data.dischargeCASAAddress, 30),
                formatString(data.dischargeCASACity, 15),
                formatString(data.dischargeCASAState, 2),
                formatNumber(data.dischargeCASAZip, 9),
                formatString(data.dischargeOther, 200),
                formatString(data.respiteProviderName, 100),
                formatString(data.respiteProviderAddress, 30),
                formatString(data.respiteProviderCity, 15),
                formatString(data.respiteProviderState, 2),
                formatNumber(data.respiteProviderZip, 9),
                formatNumber(data.respiteProviderNumber, 8),
                formatString(data.respiteProviderContactPerson, 28),
                formatNumber(data.respiteProviderTelephone, 10),
                formatString(data.respiteClientName, 28),
                formatString(data.respiteClientCin, 8),
                formatDate(data.respiteDateFrom, 'MMDDYYYY'),
                formatDate(data.respiteDateTo, 'MMDDYYYY'),
                formatNumber(data.respiteTotalDays, 3),
                formatString(data.respiteProviderSignature, 28),
                formatDate(data.respiteDate, 'MMDDYYYY'),
                formatNumber(data.dischargeFormsIndicator, 1),
                formatDate(data.discharge259D259EFormDate, 'MMDDYYYY'),
                formatString(data.discharge259D259EছুরFacilityName, 100),
                formatString(data.discharge259D259EছুরFacilityAddress, 30),
                formatString(data.discharge259D259EছুরFacilityCity, 15),
                formatString(data.discharge259D259EছুরFacilityState, 2),
                formatNumber(data.discharge259D259EছুরFacilityZip, 9),
                formatNumber(data.discharge259D259EছুরProviderNumber, 8),
                formatString(data.discharge259D259EContactPerson, 28),
                formatNumber(data.discharge259D259ETelephone, 10),
                formatString(data.discharge259D259EResidentName, 28),
                formatString(data.discharge259D259ECIN, 8),
                formatNumber(data.discharge259D259ESSN, 9),
                formatString(data.discharge259D259EPhysiciansname, 28),
                formatString(data.discharge259D259EPhysiciansSpecialty, 30),
                formatString(data.discharge259D259EPhysiciansSignature, 28),
                formatDate(data.discharge259D259EDateFormSigned, 'MMDDYYYY'),
                formatString(data.discharge259D259EPhysiciansLicenseNo, 10),
                formatNumber(data.discharge259D259EPhysiciansTelephoneNo, 10),
                formatString(data.dischargeMAP259DDiagnosis, 50),
                formatDate(data.dischargeMAP259DAnticipatedDischargedate, 'MMDDYYYY'),
                formatString(data.dischargeMAP259DOwnHomeApartment, 1),
                formatString(data.dischargeMAP259DALPS, 1),
                formatString(data.dischargeMAP259DAdultHome, 1),
                formatString(data.dischargeMAP259DRelativesHome, 1),
                formatString(data.dischargeMAP259DCongregateCare, 1),
                formatString(data.dischargeMAP259EDischargedelayed, 1),
                formatDate(data.dischargeMAP259ENewanticipateddateofdischarge, 'MMDDYYYY'),
                formatString(data.dischargeMAP259EDischargePlancanceled, 1),
                formatString(data.dischargeMAP259EOtherSpecify, 200),
            ];

        }

        // 4. Household Composition Record(s) (Up to 20 members)
        const householdRecords: string[] = [];
        if(data.familyInfo && Array.isArray(data.familyInfo)){
            for (let i = 0; i < Math.min(data.familyInfo.length, 20); i++) {
                const member = data.familyInfo[i];
                householdRecords.push(
                    [
                        'M', // Submission Type
                        formatNumber(i + 1, 2),   // Line #  (Assuming line numbers start at 1)
                        formatString(member.firstName, 10),       // Name First
                        formatString(member.middleName, 1),        // M
                        formatString(member.lastName, 17),      // Last
                        formatDate(member.dateOfBirth, 'MMDDYYYY'), // Birth date
                        formatString(member.sex, 1),           // Sex
                        formatNumber(member.ssn, 9),           // SSN
                        formatString(member.isApplying, 1),   // MA
                        formatString(member.isParent, 1), // Resp Adult
                        formatString(member.hispanicOrLatino, 1), // Ethnic - H
                        formatString(member.americanIndianOrAlaskaNative, 1),  // Ethnic– I
                        formatString(member.asian, 1), // Ethnic – A
                        formatString(member.blackOrAfricanAmerican, 1), // Ethnic - B
                        formatString(member.nativeHawaiianOrOtherPacificIslander, 1), // Ethnic – P
                        formatString(member.white, 1), // Ethnic - W
                        formatString(member.nameCode, 1),     // Name Code
                        formatString(member.otherFirstName, 10),      // First
                        formatString(member.otherMiddleName, 1),       // MI
                        formatString(member.otherLastName, 17),     // Last
                        formatString(member.isPregnant, 1),  // Pregnant
                        formatString(member.cin, 8), // CIN
                        formatNumber(member.stateFedChargeCd, 2),  // State/Fed Charge Cd
                        formatNumber(member.stateFedChgDate, 6), // State/Fed Chg Date
                        formatNumber(member.tasa, 1), // TASA
                        formatNumber(member.emp, 2),  // EMP
                        formatNumber(member.ssi, 1), // SSI
                        formatString(member.bcs, 1), // BCS
                        formatNumber(member.relationship, 2),   // Relationship to applicant
                        formatString(member.cbicCC, 1),  // CIBIC CC
                        formatString(member.cbicCDC, 1), // CIBIC CDC
                        formatString(member.studentID, 9), // Student ID
                        formatString(member.aci, 1), // ACI
                        formatNumber(member.alienNumber, 10), // Alien #
                        formatDate(member.alienDateOfEntryOrDateOfStatus, 'MMDDYYYY'), // Alien Date of Entry or Date of Status
                        formatNumber(member.maritalStatus, 1),  // Marital Status
                        formatNumber(member.educationLevel, 2),// Education Level
                        formatDate(member.alienDateEnteredCountry, 'MMDDYYYY'), // Alien Date Entered Country
                        formatString(member.pid, 2), // PID
                        formatString(member.ssnValidation, 1),  // SSN Validation
                        formatString(member.dohBirthVerificationIndicator, 1), // DOH Birth Verification Indicator
                        formatString(member.wmsCatCd, 2), // WMS Cat Cd
                        formatString(member.dai, 2),  // DAI
                        formatString(member.nhStay, 1),  // NH Stay
                        formatString(member.submissionOfMAP3044, 1), // Submission of MAP-3044
                        formatString(member.submissionOfDOH5178ASupplementAforDOH4220, 1), // Submission of DOH-5178A
                        formatString(member.submissionOfDOH4495AAccessNYSupplementA, 1), // Submission of DOH-4495A
                        formatString(member.legalSubmissionOfDOH5149, 2), // Legal Submission of DOH-5149
                        formatString(member.gender, 1), // Gender
                        "".padEnd(5, ' '), // 5 filler
                        
                    ].join(',')
                );
            }
        }

        // 5. Image Record(s)
        const imageRecords: string[] = [];
        if (data.images && Array.isArray(data.images)) {
            data.images.forEach((image: any, index: number) => {  // Specify type as 'any'
                imageRecords.push(
                    [
                        'I', // Submission Type
                        formatString(image.imageFilename, 31),      // Image Filename
                        formatNumber(index + 1, 4),               // Sequence#
                        formatNumber(image.multiPageCount, 3),    // Multi Page Count
                        formatNumber(image.docCategoryCode, 2),   // Doc Category Code
                        formatNumber(image.docType, 4),         // Doc Type
                    ].join(',')
                );
            });
        }


        // 6. Trailer Record
        const trailerRecord = [
            'T', // Submission Type
            formatDate(data.submissionDate, 'MMDDYY'), // Submission Date
        ].join(',');


        // Combine all records
        const output = [headerRecord, dataRecord.join(','), ...nhtxRecord, ...householdRecords, ...imageRecords, trailerRecord].join('\n');

        fs.writeFile('./processed_files/output.txt', output, (err) => {
            if (err) {
                throw new CustomError(String(err), 400);
            } else {
                console.log('File saved successfully as output.txt');
            }
        });

    } catch (error) {
        console.error("Error processing data:", error);
        throw new CustomError(String(error), 400);
    }

    return { data, file };
};



export const formServices = {
    takeAndProcessData,
};