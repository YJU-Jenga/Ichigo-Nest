import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateMusicDto, UpdateMusicDto } from './dto';

@Injectable()
export class MusicService {
  constructor(@InjectRepository(Music) private musicRepository: Repository<Music>){}

  async create(file: Express.Multer.File, dto: CreateMusicDto){
    try {
      const { user_id, name } = dto;
      const parsedUserId = JSON.parse(user_id.toString()).user_id;
      const parsedName = JSON.parse(name.toString()).name;
      if(file) {
        await this.musicRepository.save({
          user_id: parsedUserId,
          name: parsedName,
          file: file.path,
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

  async getAll(user_id:number): Promise<Music[]>{
    try {
      return await this.musicRepository.find({ where: { user_id }, order: {'name': 'asc'}})
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: number): Promise<Music>{
    try {
      return await this.musicRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, file: Express.Multer.File, dto: UpdateMusicDto){
    const { user_id, name } = dto;
      const parsedUserId = JSON.parse(user_id.toString()).user_id;
      const parsedName = JSON.parse(name).name;
      if(file) {
        await this.musicRepository.update(id, {
          user_id: parsedUserId,
          name: parsedName,
          file: file.path,
        });
      } else {
        await this.musicRepository.update(id, {
          user_id: parsedUserId,
          name: parsedName,
          file: null,
        });
      }
  }

  async delete(id: number){
    try {
      await this.musicRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
