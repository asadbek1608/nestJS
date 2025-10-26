import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "User" })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ default: "asad" })
  username: string;

  @Column()
  @ApiProperty({ default: "asad@gmail.com" })
  email: string;

  @Column()
  @ApiProperty({ default: "asad11" })
  password: string;

  @Column()
  @ApiProperty({ default: 18 })
  age: number;

  @Column()
  @ApiProperty({ default: "https://localhost:4001/img.png" })
  img: string;
}
