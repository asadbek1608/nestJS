import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsEmail()
  @Length(3, 200)
  @IsNotEmpty()
  email: string;

  @Length(3, 300)
  @IsNotEmpty()
  @IsString()
  password: string;
}
