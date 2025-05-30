import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    cb(null, 'temp/');
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

export { upload };
