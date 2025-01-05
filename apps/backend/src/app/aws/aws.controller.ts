import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('/aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('/upload-file')
  async uploadFile(@Body() data: UploadFileDto) {
    try {
      const url = await this.awsService.uploadFileToS3(
        `profile_image/${data.userId}.png`,
        data.base64String
      );

      return {
        status: 200,
        url,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to upload the file',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':key/delete')
  async deleteFile(@Param('key') key: string) {
    try {
      await this.awsService.deleteImage(key);
      return {
        status: 200,
        message: 'File deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to delete the file',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
