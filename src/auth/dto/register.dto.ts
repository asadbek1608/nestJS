import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterDto {
  @IsString()
  @Length(3, 200)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @Length(3, 200)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(3, 200)
  @IsNotEmpty()
  password: string;
}
