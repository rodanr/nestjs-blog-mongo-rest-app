import { IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'username',
  'password',
] as const) {}
