import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Auth } from "./auth.entity";
import { ArticleContent } from "./article.content";
import { Comment } from "./comment.entity";

@Entity({name: "article"})
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    title: string

    @Column({type: "text"})
    description: string

    @Column({type: "text"})
    body: string

    @Column()
    imgUrl: string

    @Column()
    tags: string

    @Column({default: false})
    isMemeberOnly: boolean

    @Column({default: false})
    isPublished: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    // realations
    @ManyToOne(() => Auth, (user) => user.articles)
    author: Auth;

    @OneToMany(() => Comment, (comment) => comment.article, {cascade: true})
    comments: Comment[]

    @OneToMany(() => ArticleContent, (content) => content.article, {cascade: true})
    contents: ArticleContent[]
}