import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/shared/entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { username, email, password, age, img } = createUserDto;
    const user = this.userRepo.create({ username, email, password, age, img });
    return this.userRepo.save(user);
  }

  async findAll(): Promise<Users[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<Users> {
    const users = await this.userRepo.findOneBy({ id: +id });

    if (!users) throw new NotFoundException("User not found");
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    const users = await this.userRepo.findOneBy({ id: +id });
    if (!users) throw new NotFoundException("User not found");

    await this.userRepo.update(id, updateUserDto);
    return { message: "Updated" };
  }

  async remove(id: number): Promise<{ message: string }> {
    const users = await this.userRepo.findOneBy({ id: +id });
    if (!users) throw new NotFoundException("User not found");

    await this.userRepo.remove(users);
    return { message: "Deleted" };
  }
}
