import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user (only single word)' })
  @IsString()
  @MinLength(3)
  readonly username: string;
  @ApiProperty({ description: 'First name of the user.' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @ApiProperty({ description: 'Middle name of the user.' })
  @IsString()
  @IsOptional()
  readonly middleName: string;
  @ApiProperty({ description: 'Last name of the user.' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @ApiProperty({ description: 'Email address of the user.' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ description: 'Password for the user.' })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
