import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}