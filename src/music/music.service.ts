import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateMusicDto, UpdateMusicDto } from './dto';

@Injectable()
export class MusicService {
  constructor(@InjectRepository(Music) private musicRepository: Repository<Music>){} // 依存性の注入、Musicリポジトリを注入

  /**
   * @author ckcic
   * @description アラーム登録用の音声ファイルを登録するメソッド
   *
   * @param file 音声ファイル
   * @param dto 音声ファイル登録DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async create(file: Express.MulterS3.File, dto: CreateMusicDto): Promise<void>{
    try {
      const { user_id, name } = dto;
      const parsedUserId = JSON.parse(user_id.toString()).user_id;
      const parsedName = JSON.parse(name.toString()).name;
      if(file) { // 音声ファイルあるのか
        await this.musicRepository.save({
          user_id: parsedUserId,
          name: parsedName,
          file: file.key,
        });
      } else {
        await this.musicRepository.save({
          user_id: parsedUserId,
          name: parsedName,
          file: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description ユーザーがアラーム用に登録した全ての音声ファイルを取得するメソッド
   *
   * @param user_id ユーザーの固有id
   * @returns {Promise<Music[]>} ユーザーがアラーム用に登録した全ての音声ファイルのデータを戻り値として返す
   */
  async getAll(user_id:number): Promise<Music[]>{
    try {
      return await this.musicRepository.find({ where: { user_id }, order: {'name': 'asc'}})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description アラーム用に登録した音声ファイルを取得するメソッド
   *
   * @param id 音声ファイルの固有id
   * @returns {Promise<Music>} 音声ファイルのデータを戻り値として返す
   */
  async getOne(id: number): Promise<Music>{
    try {
      return await this.musicRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @author ckcic
   * @description アラーム登録用の音声ファイルを更新するメソッド
   *
   * @param id 音声ファイルの固有id
   * @param file 音声ファイル
   * @param dto 音声ファイル更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async update(id: number, file: Express.MulterS3.File, dto: UpdateMusicDto): Promise<void>{
    const { user_id, name } = dto;
      const parsedUserId = JSON.parse(user_id.toString()).user_id;
      const parsedName = JSON.parse(name).name;
      if(file) { // 音声ファイルあるのか
        await this.musicRepository.update(id, {
          user_id: parsedUserId,
          name: parsedName,
          file: file.key,
        });
      } else {
        await this.musicRepository.update(id, {
          user_id: parsedUserId,
          name: parsedName,
          file: null,
        });
      }
  }


  /**
   * @author ckcic
   * @description アラーム登録用の音声ファイルを削除するメソッド
   *
   * @param id 音声ファイルの固有id
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void>{
    try {
      await this.musicRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
