import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateArticleContentDto {
    @IsString()
    content: string

    order: number

    @IsEnum(["image", "code", "list", "paragraph", "heading"])
    contentType: string 
}

export class CreateArticleDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    body: string

    @IsString()
    imgUrl: string

    @IsArray()
    @IsString({each: true})
    tags: string[]

    @IsOptional()
    @IsBoolean()
    isMemeberOnly?: boolean

    @IsArray()
    @Type(() => CreateArticleContentDto)
    content: CreateArticleContentDto[]
}
