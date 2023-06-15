import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateAlarmDto, UpdateAlarmDto } from './dto';


@Injectable()
export class AlarmService {
  constructor(@InjectRepository(Alarm) private alarmRepository: Repository<Alarm>){} // 依存性の注入、Alarmリポジトリを注入

  /**
   * @author ckcic
   * @description アラームを登録するメソッド
   *
   * @param dto アラーム登録DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async create(dto: CreateAlarmDto): Promise<void>{
    try {
      const { user_id, time_id, name, sentence, file, state, repeat } = dto;
      await this.alarmRepository.save({
          user_id,
          time_id,
          name,
          sentence,
          file,
          state,
          repeat
        });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description ユーザーが登録したアラームを全て取得するメソッド
   *
   * @param user_id ユーザーの固有id
   * @returns {Promise<Alarm[]>} 全てのユーザーが登録したアラームのデータを戻り値として返す
   */
  async getAll(user_id:number): Promise<Alarm[]>{
    try {
      return await this.alarmRepository.find({ where: { user_id }, order: {'time_id': 'asc'}})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description アラームを取得するメソッド
   *
   * @param id アラームの固有id
   * @returns {Promise<Alarm>} アラームのデータを戻り値として返す
   */
  async getOne(id: number): Promise<Alarm>{
    try {
      return await this.alarmRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description アラームを更新するメソッド
   *
   * @param id アラームの固有id
   * @param dto アラーム更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async update(id: number, dto: UpdateAlarmDto): Promise<void>{
    const { user_id, time_id, name, sentence, file, state, repeat } = dto;
    await this.alarmRepository.update(id, {
        user_id,
        time_id,
        name,
        sentence,
        file,
        state,
        repeat
      });
  }

  
  /**
   * @author ckcic
   * @description アラームを削除するメソッド
   *
   * @param id アラームの固有id
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void>{
    try {
      await this.alarmRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
