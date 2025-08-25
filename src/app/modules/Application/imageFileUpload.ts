import fs from 'fs';
import path from 'path';
import { createFolder, formatDate, getBatchNumber, getSubmitterId, updateBatchNumber } from '../../utils/utilityFunction';
import { createUniqueUID } from '../../utils/utilityFunction';
import CustomError from '../../errors/CusromError';

export const imageFileUpload = async (file: Express.Multer.File, folderPath: string, imageFileName: string) => {
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

export const createBatchFolder = async (file: Express.Multer.File[]) => {
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

    const SIGNATURE_DATE = new Date();
    const date = formatDate(SIGNATURE_DATE, 'mmddyy');
    const fileName = `${submitterId}${uniqueUID}${date}0001.pdf`;

    // Process files sequentially to ensure proper numbering
    for (let i = 0; i < file.length; i++) {
        const currentFile = file[i];
        const imageFileName = `${submitterId}${uniqueUID}${date}${(i + 2).toString().padStart(4, '0')}.pdf`;
        await imageFileUpload(currentFile, filePath, imageFileName);
    }

    const batchFileName = `${submitterId}${formatDate(new Date(), 'mmddyyyy')}${getBatchNumber()}`;

    fs.writeFile(path.join(folderPath, `${formatDate(new Date(), 'mmddyyyy')}${getBatchNumber()}.EOB`), '', (err) => {
        if (err) {
            new CustomError(String(err), 400);
        }
    });

    console.log('Batch folder created successfully');

    // fs.writeFile(path.join(folderPath, 'output.txt'), , (err) => {
    //     if (err) {
    //         new CustomError(String(err), 400);
    //     } else {
    //         console.log('File saved successfully as output.txt');
    //     }
    // });

    return { fileName, filePath, batchFileName }
}
