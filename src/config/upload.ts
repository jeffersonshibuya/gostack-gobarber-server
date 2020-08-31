import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const filehash = crypto.randomBytes(8).toString('hex');
        const fileName = `${filehash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      bucket: 'images-app-gobarber',
    },
  },
} as IUploadConfig;
