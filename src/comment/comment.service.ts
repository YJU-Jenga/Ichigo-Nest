import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Post } from 'src/model/entity';
import { Repository } from 'typeorm';
import { UpdateCommentDto, WriteCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>, // Commentリポジトリを注入
    @InjectRepository(Post) private postRepository: Repository<Post>, // Postリポジトリを注入
  ){} // 依存性の注入

  /**
   * @author ckcic
   * @description コメントを作成するメソッド
   *
   * @param dto コメント作成DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async write(dto: WriteCommentDto): Promise<void>{
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


  /**
   * @author ckcic
   * @description 投稿のコメントを全て取得するメソッド
   *
   * @param postId 投稿の固有id
   * @returns {Promise<Comment[]>} 全てのコメントのデータを戻り値として返す
   */
  async getAll(postId: number): Promise<Comment[]>{
    try {
      let resCommtens = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .select(['comment', 'user.name'])
      .where('postId = :postId', {postId})
      .orderBy('comment.createdAt', 'DESC')
      .getMany();

      return resCommtens;
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description コメントを取得するメソッド
   *
   * @param id コメントの固有id
   * @returns {Promise<Comment>} コメントのデータを戻り値として返す
   */
  async getOne(id: number): Promise<Comment>{
    try {
      return await this.commentRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description コメントを更新するメソッド
   *
   * @param id コメントの固有id 
   * @param dto コメント更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>} 
   */
  async update(id: number, dto: UpdateCommentDto): Promise<void>{
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


  /**
   * @author ckcic
   * @description コメントを削除するメソッド
   *
   * @param id コメントの固有id
   * @returns {Promise<void>} 
   */
  async delete(id: number): Promise<void>{
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

      if(countComments <= 1) { // コメントの数で応答状態を変える
        await this.postRepository.update(postId, {state: false})
      }

      await this.commentRepository.delete({id});
      
      
    } catch (error) {
      console.log(error);
    }
  }
}