import {IsEmail, IsOptional, IsString} from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  displayName?: string;
}
