import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  // @IsString()
  // readonly role?: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;

  @IsOptional()
  readonly profileImage?: string;

  @IsOptional()
  @IsOptional()
  readonly subjects?: string[];

  @IsOptional()
  @IsOptional()
  readonly phoneNumber?: string;
}

export class LoginUser {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
