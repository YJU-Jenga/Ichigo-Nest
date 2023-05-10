import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateAlarmDto, UpdateAlarmDto } from './dto';


@Injectable()
export class AlarmService {
  constructor(@InjectRepository(Alarm) private alarmRepository: Repository<Alarm>){}

  async create(file: Express.Multer.File, dto: CreateAlarmDto){
    try {
      if(file) {
        const { user_id, time_id, name, sentence, state, repeat } = dto;
        await this.alarmRepository.save({
          user_id,
          time_id,
          name,
          sentence,
          file: file.path,
          state,
          repeat
        });
      } else {
        const { user_id, time_id, name, sentence, state, repeat } = dto;
        await this.alarmRepository.save({
          user_id,
          time_id,
          name,
          sentence,
          file: null,
          state,
          repeat
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(user_id:number): Promise<Alarm[]>{
    try {
      return await this.alarmRepository.find({ where: { user_id }, order: {'time_id': 'asc'}})
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: number): Promise<Alarm>{
    try {
      return await this.alarmRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, file: Express.Multer.File, dto: UpdateAlarmDto){
    try {
      if(file) {
        const { user_id, time_id, name, sentence, state, repeat } = dto;
        await this.alarmRepository.save({
          user_id,
          time_id,
          name,
          sentence,
          file: file.path,
          state,
          repeat
        });
      } else {
        const { user_id, time_id, name, sentence, state, repeat } = dto;
        await this.alarmRepository.save({
          user_id,
          time_id,
          name,
          sentence,
          file: null,
          state,
          repeat
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number){
    try {
      await this.alarmRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
