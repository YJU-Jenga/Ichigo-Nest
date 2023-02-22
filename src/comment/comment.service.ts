import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Post } from 'src/model/entity';
import { Repository } from 'typeorm';
import { UpdateCommentDto, WriteCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ){}

  async write(dto: WriteCommentDto){
    try {
      const { writer, postId, content } = dto;
      await this.commentRepository.save({
        writer,
        postId,
        content
      });
      await this.postRepository.update(postId, {state: true});
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(postId: number): Promise<Comment[]>{
    try {
      return await this.commentRepository.find({where: {postId}, order: {'createdAt': 'desc'}})
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: number): Promise<Comment>{
    try {
      return await this.commentRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, dto: UpdateCommentDto){
    try {
      const { writer, postId, content } = dto;
      await this.commentRepository.update(id, {
        writer,
        postId,
        content
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number){
    try {
      const { postId } = await this.commentRepository
      .createQueryBuilder('comment')
      .select(['comment.postId'])
      .where('id = :id', {id})
      .getOne();

      const { countComments } = await this.commentRepository
      .createQueryBuilder('comment')
      .select('COUNT(*) AS countComments')
      .where('comment.postId = :postId', {postId})
      .groupBy('comment.postId')
      .getRawOne();

      if(countComments <= 1) {
        await this.postRepository.update(postId, {state: false})
      }

      await this.commentRepository.delete({id});
      
      
    } catch (error) {
      console.log(error);
    }
  }
}