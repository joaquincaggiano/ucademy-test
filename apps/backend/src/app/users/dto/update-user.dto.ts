import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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

  @IsString()
  @MinLength(5)
  @IsOptional()
  username: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  phone: string;

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
