import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvder from '../modules/IStorageProvider';

export default class S3StorageProvider implements IStorageProvder {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new Error('File not found');

    const fileContent = await fs.promises.readFile(originalPath);

    const fileFormatted = file.replace(/[!@#$%^&* ()]/g, '');
    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: fileFormatted,
        ACL: 'public-read',
        ContentType,
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return fileFormatted;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
