import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/enum/role.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "./article.entity";
import { Comment } from "./comment.entity";

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

  @Column({nullable: true, type: "text"})
  bio: string;

  @Column({nullable: true})
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations
  @OneToMany(() => Article, (article) => article.author)
  articles: Article[]

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[]
}
