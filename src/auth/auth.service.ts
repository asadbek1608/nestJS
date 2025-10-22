import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';
import * as nodemailer from "nodemailer"
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "asaddevo211@gmail.com",
            pass: "hwmy yqke qpaj kipx"
        }
    })
    constructor(
        @InjectModel(Auth) private authModel: typeof Auth,
        private jwtService: JwtService
    ){}
    
    async register(registerDto: RegisterDto){
        const {username, email, password} = registerDto
        
        const users = await this.authModel.findOne({where: {email}})
        if (users) throw new UnauthorizedException("User already exist")

        await this.transport.sendMail({
            from: "asaddevo211@gmail.com",
            to: email,
            subject: "hi",
            text: "hello"
        })
        await this.authModel.create({username, email, password})
        return {message: "Registred"}
    }

     async login(loginDto: LoginDto){
        const { email, password} = loginDto
        
        const users = await this.authModel.findOne({where: {email}})
        if (!users) throw new UnauthorizedException("User not found")

        const payload = { sub: users.id, username: users.username }
        const token = await this.jwtService.signAsync(payload)
        return {message: "Success", token}
    }
}
