import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./user.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userModel: typeof Users) {}

  async create(createUserDto: CreateUserDto) {
    const {username, email, password, age, img} = createUserDto
    return this.userModel.create({ username, email, password, age, img });
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const users = await this.userModel.findByPk(+id);

    if (!users) throw new NotFoundException("User not found");
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const users = await this.userModel.findByPk(+id);
    if (!users) throw new NotFoundException("User not found");

    await this.userModel.update(updateUserDto, { where: { id: +id } });
    return { message: "Updated" };
  }

  async remove(id: number) {
    const users = await this.userModel.findByPk(+id);
    if (!users) throw new NotFoundException("User not found");

    await this.userModel.destroy({ where: { id: +id } });
    return { message: "Deleted" };
  }
}
