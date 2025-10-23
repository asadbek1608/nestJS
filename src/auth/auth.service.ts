import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Auth } from "./auth.model";
import { InjectModel } from "@nestjs/sequelize";
import { RegisterDto } from "./dto/register.dto";
import * as nodemailer from "nodemailer";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

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
    @InjectModel(Auth) private authModel: typeof Auth,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const users = await this.authModel.findOne({ where: { email } });
    if (users) throw new UnauthorizedException("User already exist");

    await this.transport.sendMail({
      from: "asaddevo211@gmail.com",
      to: email,
      subject: "hi",
      text: "hello",
    });

    const hash = await bcrypt.hash(password, 10);
    await this.authModel.create({
      username,
      email,
      password: hash,
      role: "user",
    });
    return { message: "Registred" };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const users = await this.authModel.findOne({ where: { email } });
    if (!users) throw new UnauthorizedException("User not found");

    const isMatch = await bcrypt.compare(password, users.dataValues.password);

    if (isMatch) {
        const payload = { sub: users.dataValues.id, username: users.dataValues.username, role: users.dataValues.role };
        const token = await this.jwtService.signAsync(payload);
        return { message: "Success", token };
    }else{
        return {message: "Wrong password"}
    }
  }
}
