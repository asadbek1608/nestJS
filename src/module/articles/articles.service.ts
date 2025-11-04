import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/shared/entities/article.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ArticleContent } from 'src/shared/entities/article.content';
import { Auth } from 'src/shared/entities/auth.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(ArticleContent) private articleContentRepository: Repository<ArticleContent>
  ){}
 async create(createArticleDto: CreateArticleDto, author: Auth) {
  const { content, title, description, body, imgUrl, isMemeberOnly } = createArticleDto;

  const contentEntities = content.map((data) =>
    this.articleContentRepository.create(data as DeepPartial<ArticleContent>)
  );

  const article = this.articleRepository.create({
    author,
    contents: contentEntities,
    title,
    description,
    body,
    imgUrl,
    isMemeberOnly,
  });

  return await this.articleRepository.save(article);
}

async findAll(
  page: number = 1,
  limit: number = 10,
  author?: string
): Promise<{ articles: Article[]; total: number }> {

  const query = this.articleRepository
    .createQueryBuilder("article")
    .leftJoinAndSelect("article.author", "author")
    .where("article.isPublished = :isPublished", {isPublished: true})
    .skip((page - 1) * limit)
    .take(limit);

  if (author) {
    query.andWhere("author.username = :author", { author });
  }

  const [articles, total] = await query.getManyAndCount();
  return { articles, total };
}

 async update(id: number, updateArticleDto: UpdateArticleDto, currentUser: Auth): Promise<Article> {
    const article = await this.articleRepository.findOneBy({id})

    if(article?.author.id !== currentUser.id) {
      throw new ForbiddenException("You can only update you own articles")
    }

    if(!article){
     throw new NotFoundException("Article not found")
    }

    Object.assign(article, updateArticleDto)
    return await this.articleRepository.save(article)
  }

async remove(id: number, currentUser: Auth) {
   const article = await this.articleRepository.findOneBy({id})

    if(!article){
     throw new NotFoundException("Article not found")
    }

    if(article?.author.id !== currentUser.id) {
      throw new ForbiddenException("You can only update you own articles")
    }
    await this.articleRepository.remove(article)
  }
}
