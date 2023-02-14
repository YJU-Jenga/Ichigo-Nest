import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../model/entity/post.entity';
import { WritePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async write(file: Express.Multer.File, boardId, writePostDto: WritePostDto): Promise<void> {
    try {
      
      if(file) {        
        const { writer, secret, title, content, password} = writePostDto;

        if(secret) {
          await this.postRepository.save({
            writer,
            boardId,
            title,
            content,
            password,
            secret: true,
            image: file.path,
          });
        }
        else {
          await this.postRepository.save({
            writer,
            boardId,
            title,
            content,
            password: null,
            secret: false,
            image: file.path
          });
        }
      } else {
        const { writer, secret, title, content, password} = writePostDto;
        if(secret) {
          await this.postRepository.save({
            writer,
            boardId,
            title,
            content,
            password,
            secret: true,
          });
        }
        else {
          await this.postRepository.save({
            writer,
            boardId,
            title,
            content,
            password: null,
            secret: false,
          });
          
        }
      }
    } catch (error) {
      throw new HttpException({
        message: "SQL에러",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);      
    }
  }

  async findAll(boardId): Promise<Post[]> {
    return this.postRepository.find({where: {boardId}, order: {'createdAt': 'desc'}});
  }

  async view(postId: number): Promise<Post> {
    let hit = await this.postRepository
    .createQueryBuilder()
    .select("post")
    .from(Post, "post")
    .where("id = :id", {id: postId})
    .getOne()

    await this.postRepository
    .createQueryBuilder()
    .update(Post)
    .set({hit: hit.hit++ })
    .where("id = :id", {id: postId})
    
    const post = await this.postRepository.findOneBy({id: postId})

    return post;
  }

  async seed() {
    for(let i = 1; i <= 3; i++) {
      for(let j = 0; j < 10; j++) {
        await this.postRepository.save({
          writer: 1,
          boardId: i,
          title: `제목 ${j+1}`,
          content: `내용 ${j+1}`,
          password: null,
          secret: false,
        });
      }
    }
  }
}
