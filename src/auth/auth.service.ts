import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import * as nodemailer from "nodemailer";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "src/shared/entities/auth.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  private transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "asaddevo211@gmail.com",
      pass: "hwmy yqke qpaj kipx",
    },
  });
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<{message: string}> {
    const { username, email, password } = registerDto;

    const users = await this.authRepo.findOneBy({ email });
    if (users) throw new UnauthorizedException("User already exist");

    await this.transport.sendMail({
      from: "asaddevo211@gmail.com",
      to: email,
      subject: "hi",
      text: "hello",
    });

    const hash = await bcrypt.hash(password, 10);
    const result = this.authRepo.create({username, email, password: hash, role: "user",});

    await this.authRepo.save(result)
    return { message: "Registred" };
  }

  async login(loginDto: LoginDto): Promise<{message: string} | {message: string, token:  string}> {
    const { email, password } = loginDto;

    const users = await this.authRepo.findOneBy({ email });
    if (!users) throw new UnauthorizedException("User not found");

    const isMatch = await bcrypt.compare(password, users.password);

    if (isMatch) {
        const payload = { sub: users.id, username: users.username, role: users.role };
        const token = await this.jwtService.signAsync(payload);
        return { message: "Success", token };
    }else{
        return {message: "Wrong password"}
    }
  }
}
