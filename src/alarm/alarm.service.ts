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
      const { user_id, time_id, name, sentence, state, repeat } = dto;
      const parsedUserId = JSON.parse(user_id.toString()).user_id;
      const parsedTimeId = JSON.parse(time_id).time_id;
      const parsedName = JSON.parse(name).name;
      const parsedSentence = JSON.parse(sentence).sentence;
      const parsedState = JSON.parse(state.toString());
      const parsedRepeat = JSON.parse(repeat).repeat;
      if(file) {
        await this.alarmRepository.save({
          user_id: parsedUserId,
          time_id: parsedTimeId,
          name: parsedName,
          sentence: parsedSentence,
          file: file.path,
          state: parsedState,
          repeat: parsedRepeat
        });
      } else {
        await this.alarmRepository.save({
          user_id: parsedUserId,
          time_id: parsedTimeId,
          name: parsedName,
          sentence: parsedSentence,
          file: null,
          state: parsedState,
          repeat: parsedRepeat
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
    const { user_id, time_id, name, sentence, state, repeat } = dto;
      const parsedUserId = JSON.parse(user_id.toString()).user_id;
      const parsedTimeId = JSON.parse(time_id).time_id;
      const parsedName = JSON.parse(name).name;
      const parsedSentence = JSON.parse(sentence).sentence;
      const parsedState = JSON.parse(state.toString());
      const parsedRepeat = JSON.parse(repeat).repeat;
      if(file) {
        await this.alarmRepository.update(id, {
          user_id: parsedUserId,
          time_id: parsedTimeId,
          name: parsedName,
          sentence: parsedSentence,
          file: file.path,
          state: parsedState,
          repeat: parsedRepeat
        });
      } else {
        await this.alarmRepository.update(id, {
          user_id: parsedUserId,
          time_id: parsedTimeId,
          name: parsedName,
          sentence: parsedSentence,
          file: null,
          state: parsedState,
          repeat: parsedRepeat
        });
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
