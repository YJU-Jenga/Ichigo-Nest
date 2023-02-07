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

  async write(file: Express.Multer.File, writePostDto: WritePostDto): Promise<void> {
    try {
      
      if(file) {        
        const {secret, title, content, password} = writePostDto;

        if(secret) {
          await this.postRepository.save({
            writer: 1,
            boardId: 1,
            title,
            content,
            password,
            secret: true,
            image: file.path,
          });
        }
        else {
          await this.postRepository.save({
            writer: 1,
            boardId: 1,
            title,
            content,
            password: null,
            secret: false,
            image: file.path
          });
        }
      } else {
        const { secret, title, content, password} = writePostDto;
        if(secret) {
          await this.postRepository.save({
            writer: 1,
            boardId: 1,
            title,
            content,
            password,
            secret: true,
          });
        }
        else {
          await this.postRepository.save({
            writer: 1,
            boardId: 1,
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

}
