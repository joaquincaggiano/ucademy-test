import { IsNotEmpty, IsString } from "class-validator";

export class UploadFileDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly base64String: string;
}
