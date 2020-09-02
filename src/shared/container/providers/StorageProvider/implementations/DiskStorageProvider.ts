import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvder from '../modules/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvder {
  public async saveFile(file: string): Promise<string> {
    const fileFormatted = file.replace(/[!@#$%^&* ()]/g, '');
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, fileFormatted),
    );

    return fileFormatted;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
