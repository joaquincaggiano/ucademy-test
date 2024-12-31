import {
    IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateUsersStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
