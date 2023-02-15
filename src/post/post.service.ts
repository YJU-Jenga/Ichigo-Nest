import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../model/entity/post.entity';
import { WritePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async write(file: Express.Multer.File, boardId, writePostDto: WritePostDto): Promise<HttpException|boolean> {
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
      return true;
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

  async findPosts(boardId:number, skip:number, take:number): Promise<Post[]> {
    return this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.user', 'user')
    .select(['post', 'user.name'])
    .where('boardId = :boardId', {boardId})
    .orderBy('post.createdAt', 'DESC')
    .skip(skip)
    .take(take)
    .getMany();
  }

  async view(postId: number): Promise<Post> {
    let {hit, writer} = await this.postRepository
    .createQueryBuilder('post')
    .where("id = :id", {id: postId})
    .getOne()

    await this.postRepository
    .createQueryBuilder()
    .update(Post)
    .set({hit: hit+1 })
    .where("id = :id", {id: postId})
    .execute();
    
    const post = await this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.user', 'user')
    .select(['post', 'user.name'])
    .getOne();

    return post;
  }

  async update(file: Express.Multer.File, postId, updatePostDto: UpdatePostDto): Promise<HttpStatus|boolean> {
    try {
      
      if(file) {        
        const { writer, secret, title, content, password} = updatePostDto;

        if(secret) {
          await this.postRepository.update(postId, {
            writer,
            title,
            content,
            password,
            secret: true,
            image: file.path,
          });
        }
        else {
          await this.postRepository.update(postId, {
            writer,
            title,
            content,
            password: null,
            secret: false,
            image: file.path
          });
        }
      } else {
        const { writer, secret, title, content, password} = updatePostDto;
        if(secret) {
          await this.postRepository.update(postId, {
            writer,
            title,
            content,
            password,
            secret: true,
          });
        }
        else {
          await this.postRepository.update(postId, {
            writer,
            title,
            content,
            password: null,
            secret: false,
          });
        }
      }

      return true;
    } catch (error) {
      throw new HttpException({
        message: "SQL에러",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);      
    }
  }

  async delete(postId:number): Promise<HttpException|boolean> {
    try {
      await this.postRepository.delete(postId);
      return true;
    } catch (error) {
      throw new HttpException({
        message: "SQL에러",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);  
    }
  }

  async seed(): Promise<HttpException|boolean> {
    try {
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
      return true;
    } catch (error) {
      throw new HttpException({
        message: "SQL에러",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);  
    }
  }
}
