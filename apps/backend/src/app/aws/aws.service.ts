import { Injectable } from '@nestjs/common';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  private s3: S3Client;
  private bucketName: string;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION || '',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || '';
  }

  async uploadFileToS3(key: string, base64String: string) {
    const base64Data = Buffer.from(base64String, 'base64');

    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };

    const command = new PutObjectCommand(params);
    await this.s3.send(command);

    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  async deleteImage(key: string): Promise<void> {
    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3.send(deleteCommand);
    } catch (error) {
      console.error(`Error deleting file ${key} from bucket ${this.bucketName}:`, error);
      throw error;
    }
  }
}
