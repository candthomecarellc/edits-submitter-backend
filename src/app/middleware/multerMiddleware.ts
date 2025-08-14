import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create temp directory if it doesn't exist
const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, _file, cb) {
        cb(null, tempDir);
    },
    filename: function (_req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allow PDF files for documents and text files for response
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and text files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024, // 10 MB file size limit
        files: 1 // Only allow 1 file at a time
    },
});

// Memory storage for text files (response module)
const memoryStorage = multer.memoryStorage();

const textFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allow only text files
    if (file.mimetype === 'text/plain' || file.originalname.endsWith('.txt')) {
        cb(null, true);
    } else {
        cb(new Error('Only text files are allowed'));
    }
};

const uploadText = multer({
    storage: memoryStorage,
    fileFilter: textFileFilter,
    limits: { 
        fileSize: 5 * 1024 * 1024, // 5 MB file size limit for text files
        files: 4 // Allow up to 4 files for response logs
    },
});

export { upload, uploadText };
