import { Request, Response } from 'express';
import { parseBatchLog } from './batchLogParse';
import { parseReceptionLog } from './receptionLogParse';
import { parseDecisionLog } from './decisionLogParse';
import * as fs from 'fs';
import * as path from 'path';
import { BatchLog, DecisionLog, ReceptionLog } from './notice.interface';
import { record } from 'zod';

export const uploadBatchLog = async (req: Request, res: Response) => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        // Check if we have exactly 4 files
        if (req.files.length !== 4) {
            return res.status(400).json({
                success: false,
                message: 'Exactly 4 files are required: BatchLog, ReceptionLog, DecisionLog, and BudgetLog'
            });
        }

        // Create temp directory if it doesn't exist
        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        let parsedData: {
            batchLog : BatchLog[],
            receptionLog : ReceptionLog[],
            decisionLog : DecisionLog[],
            // budgetLog : BatchLog[],
        } = {
            batchLog : [],
            receptionLog : [],
            decisionLog : [],
            // budgetLog : [],
        };
        const uploadedFiles: string[] = [];

        // Process each uploaded file
        for (const file of req.files) {
            // Check if file is a text file
            if (file.mimetype !== 'text/plain') {
                return res.status(400).json({
                    success: false,
                    message: `File ${file.originalname} is not a text file`
                });
            }

            const fileName = file.originalname;
            const filePath = path.join(tempDir, fileName);
            
            // Save the uploaded file to temp directory
            fs.writeFileSync(filePath, file.buffer);
            uploadedFiles.push(filePath);

            // Parse the file based on its type
            if (fileName.includes('BatchList')) {
                parsedData.batchLog = parseBatchLog(fileName, filePath);
            } else if (fileName.includes('ReceptionLog')) {
                parsedData.receptionLog = parseReceptionLog(fileName, filePath);
            } else if (fileName.includes('AppDecision')) {
                // For now, parse as batch log - you can add specific parsing later
                parsedData.decisionLog = parseDecisionLog(fileName, filePath);
            // } else if (fileName.includes('BudgetLog')) {
            //     // For now, parse as batch log - you can add specific parsing later
            //     parsedData = parseBatchLog();
            }
        }

        // Clean up the uploaded files with error handling
        uploadedFiles.forEach(filePath => {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (cleanupError) {
                console.warn(`Warning: Could not delete temporary file ${filePath}:`, cleanupError);
                // Continue processing even if cleanup fails
            }
        });

        console.log(parsedData);

        return res.status(200).json({
            success: true,
            message: 'All response log files uploaded and parsed successfully',
            data: parsedData
        });

    } catch (error) {
        console.error('Error uploading response log files:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing response log files',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getBatchLogs = async (req: Request, res: Response) => {
    try {
        // For now, return mock data or parse existing files
        // In a real application, you'd store this data in a database
        const tempDir = path.join(process.cwd(), 'temp');
        
        let batchLogs: BatchLog[] = [];
        
        // Check if batch log files exist and parse them
        const batchLogFile = path.join(tempDir, 'BatchLog_08112025.txt');
        const receptionLogFile = path.join(tempDir, 'ReceptionLog_08112025.txt');
        
        // if (fs.existsSync(batchLogFile)) {
        //     const batchData = parseBatchLog();
        //     if (Array.isArray(batchData)) {
        //         batchLogs = [...batchLogs, ...batchData];
        //     }
        // }
        
        // if (fs.existsSync(receptionLogFile)) {
        //     const receptionData = parseReceptionLog();
        //     if (Array.isArray(receptionData)) {
        //         batchLogs = [...batchLogs, ...receptionData];
        //     }
        // }

        return res.status(200).json({
            success: true,
            message: 'Batch logs retrieved successfully',
            data: batchLogs
        });

    } catch (error) {
        console.error('Error retrieving batch logs:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving batch logs',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
