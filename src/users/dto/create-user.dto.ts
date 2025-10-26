import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  @ApiProperty({ description: "username for user", example: "asad" })
  username: string;

  @IsEmail()
  @Length(3, 100)
  @IsNotEmpty()
  @ApiProperty({ description: "email for user", example: "asad@gmail.com" })
  email: string;

  @IsString()
  @Length(3, 300)
  @IsNotEmpty()
  @ApiProperty({ description: "password for user", example: "asad11" })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "age for user", example: 18 })
  age: number;

  @IsString()
  @Length(3, 300)
  @IsNotEmpty()
  @ApiProperty({description: "img for user", example: "https://localhost:4001/img.png"})
  img: string;
}