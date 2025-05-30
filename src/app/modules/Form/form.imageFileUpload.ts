import fs from 'fs';
import path from 'path';
import { createFolder, formatDate, getBatchNumber, getSubmitterId, updateBatchNumber } from '../../utils/utilityFunction';
import { createUniqueUID } from '../../utils/utilityFunction';
import { formTextGenerator } from './form.textGenerator';
import CustomError from '../../errors/CusromError';

const imageFileUpload = async (file: Express.Multer.File, folderPath: string, imageFileName: string) => {
    try {
        
        // Ensure the folder exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Create the file path
        const filePath = path.join(folderPath, imageFileName);

        // Use fs.copyFileSync to copy the file from its temporary location
        fs.copyFileSync(file.path, filePath);

        console.log('File has been saved successfully!');
        return {
            success: true,
            message: 'File uploaded successfully',
            path: filePath
        };
    } catch (error) {
        console.error('Error saving file:', error);
        throw error;
    }
}

const createBatchFolder = async (data: any, file: Express.Multer.File[], csvString: string, filledPdfBuffer: Buffer) => {
    const uniqueUID = createUniqueUID();
    updateBatchNumber();
    const folderPath = createFolder();
    const submitterId = getSubmitterId();
    const batchFolder = `${formatDate(new Date(), 'mmddyyyy')}${getBatchNumber()}`;
    const filePath = path.join(folderPath, batchFolder);
    
    // Ensure the batch folder exists
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }

    const date = formatDate(data.signatureDate, 'mmddyy');
    const fileName = `${submitterId}${uniqueUID}${date}0001.pdf`;
    fs.writeFileSync(path.join(filePath, fileName), filledPdfBuffer);

    // Process files sequentially to ensure proper numbering
    for (let i = 0; i < file.length; i++) {
        const currentFile = file[i];
        const imageFileName = `${submitterId}${uniqueUID}${date}${(i + 2).toString().padStart(4, '0')}.pdf`;
        await imageFileUpload(currentFile, filePath, imageFileName);
    }

    const formText = await formTextGenerator(data, file);
    const batchFileName = `${submitterId}${formatDate(new Date(), 'mmddyyyy')}${getBatchNumber()}`;

    if (formText) {
        fs.writeFile(path.join(filePath, `${batchFileName}.txt`), formText, (err) => {
            if (err) {
                new CustomError(String(err), 400);
            } else {
                console.log('File saved successfully as output.txt');
            }
        });
    }

    fs.writeFile(path.join(folderPath, `${formatDate(new Date(), 'mmddyyyy')}${getBatchNumber()}.EOB`), csvString, (err) => {
        if (err) {
            new CustomError(String(err), 400);
        }
    });

    fs.writeFile(path.join(folderPath, 'output.txt'), csvString, (err) => {
        if (err) {
            new CustomError(String(err), 400);
        } else {
            console.log('File saved successfully as output.txt');
        }
    });
}

export default {
    imageFileUpload,
    createBatchFolder,
}
