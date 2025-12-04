import { IsString } from 'class-validator';
import {Expose, Transform} from 'class-transformer';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}

export class UserResponseDto {
  @Expose()
  id: string;
  @Expose()
  login: string;
  @Expose()
  version: number;

  @Expose()
  @Transform(({ value }) => value.getTime())
  createdAt: number;

  @Expose()
  @Transform(({ value }) => value.getTime())
  updatedAt: number;
}
