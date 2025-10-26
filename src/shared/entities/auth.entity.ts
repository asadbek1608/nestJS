import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/enum/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Auth"})
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({default: "asad"})
  username: string;

  @Column()
  @ApiProperty({default: "asad@gmail.com"})
  email: string;

  @Column()
  @ApiProperty({default: "asad11"})
  password: string;

  @Column({default: Role.User})
  role: string;
}
