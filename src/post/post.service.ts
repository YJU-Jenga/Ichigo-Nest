import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../model/entity';
import { WritePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>, // Postリポジトリを注入
  ) {} // 依存性の注入

  // 掲示板の事前定義
  // 1 = 商品お問い合わせ掲示板
  // 2 = Q & A掲示板
  // 3 = 商品レビュー掲示板

  /**
   * @author ckcic
   * @description 投稿作成するメソッド
   *
   * @param file イメージファイル
   * @param boardId 掲示板の固有id
   * @param writePostDto 投稿作成DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<HttpException|boolean>} 成功またはエラーを戻り値として返す
   */
  async write(file: Express.MulterS3.File, boardId: number, writePostDto: WritePostDto): Promise<HttpException|boolean> {
    try {
      // console.log(file);
      if(file) { // イメージファイルがあるのか
        const { writer, secret, title, content, password} = writePostDto;

        if(secret) { // 非公開設定
          await this.postRepository.save({
            writer,
            boardId,
            title,
            content,
            password,
            secret: true,
            image: file.key,
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
            image: file.key
          });
        }
      } else {
        const { writer, secret, title, content, password} = writePostDto;
        if(secret) { // 非公開設定
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
        message: "SQLエラー",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);      
    }
  }


  /**
   * @author ckcic
   * @description 掲示板の投稿を全て取得するメソッド
   *
   * @param boardId 掲示板の固有id
   * @returns {Promise<Post[]>} 該当掲示板にある全ての投稿のデータをJSON形式で戻り値として返す
   */
  async findAll(boardId: number): Promise<Post[]> {
    return this.postRepository.find({where: {boardId}, order: {'createdAt': 'desc'}});
  }


  /**
   * @author ckcic
   * @description 掲示板のページネーション用のメソッド、なくてもページネーションができて使わなくなった。
   *
   * @param boardId 掲示板の固有id
   * @param skip スキップ数
   * @param take 取得数
   * @returns {Promise<Post[]>} 該当掲示板にある全ての投稿のデータをJSON形式で戻り値として返す
   */
  async findPosts(boardId:number, skip:number, take:number): Promise<Post[]> {
    return this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.user', 'user')
    .select(['post', 'user.name'])
    .where('boardId = :boardId', {boardId})
    .orderBy('post.createdAt', 'DESC')
    .skip(skip) // 指定されたスキップ数だけ結果の先頭からスキップ
    .take(take) // 指定された取得数だけ結果を取得
    .getMany();
  }


  /**
   * @author ckcic
   * @description 投稿の内容を取得するメソッド
   *
   * @param postId 投稿の固有id
   * @returns {Promise<Post>} 投稿のデータを戻り値として返す
   */
  async view(postId: number): Promise<Post> {
    let {hit} = await this.postRepository
    .createQueryBuilder('post')
    .where("id = :id", {id: postId})
    .getOne();

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
    .where("post.id = :id", {id: postId})
    .getOne();

    return post;
  }


  /**
   * @author ckcic
   * @description 投稿の内容を更新するメソッド
   *
   * @param file イメージファイル
   * @param postId 掲示板の固有id
   * @param updatePostDto 投稿更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<HttpException|boolean>} 成功またはエラーを戻り値として返す
   */
  async update(file: Express.MulterS3.File, postId: number, updatePostDto: UpdatePostDto): Promise<HttpStatus|boolean> {
    try {
      
      if(file) { // イメージファイルがあるのか
        const { writer, secret, title, content, password} = updatePostDto;

        if(secret) { // 非公開設定
          await this.postRepository.update(postId, {
            writer,
            title,
            content,
            password,
            secret: true,
            image: file.key,
          });
        }
        else {
          await this.postRepository.update(postId, {
            writer,
            title,
            content,
            password: null,
            secret: false,
            image: file.key
          });
        }
      } else {
        const { writer, secret, title, content, password} = updatePostDto;
        if(secret) { // 非公開設定
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
        message: "SQLエラー",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);      
    }
  }


  /**
   * @author ckcic
   * @description 投稿の内容を削除するメソッド
   *
   * @param postId 掲示板の固有id
   * @returns {Promise<HttpException|boolean>} 成功またはエラーを戻り値として返す
   */
  async delete(postId:number): Promise<HttpException|boolean> {
    try {
      await this.postRepository.delete(postId);
      return true;
    } catch (error) {
      throw new HttpException({
        message: "SQLエラー",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);  
    }
  }


  // テストコード
  // async seed(): Promise<HttpException|boolean> {
  //   try {
  //     for(let i = 1; i <= 3; i++) {
  //       for(let j = 0; j < 10; j++) {
  //         await this.postRepository.save({
  //           writer: 1,
  //           boardId: i,
  //           title: `제목 ${j+1}`,
  //           content: `내용 ${j+1}`,
  //           password: null,
  //           secret: false,
  //         });
  //       }
  //     }
  //     return true;
  //   } catch (error) {
  //     throw new HttpException({
  //       message: "SQL에러",
  //       error: error.sqlMessage,
  //     },
  //     HttpStatus.FORBIDDEN);  
  //   }
  // }
}
