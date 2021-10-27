import multer from 'multer';
import { extname, resolve } from 'path';
import { nanoid } from 'nanoid';

export const multerConfig = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new Error('File mimetype must be png or jpeg'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', '..', 'public', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${nanoid()}${extname(file.originalname)}`);
    },
  }),
};
