import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class OidDto {
  @IsString()
  $oid: string;
}

export class UsersDto {
  @ValidateNested()
  @Type(() => OidDto)
  id: OidDto;

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

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
