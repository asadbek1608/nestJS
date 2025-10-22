import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsNumber()
    age: number

    @IsString()
    img: string
}