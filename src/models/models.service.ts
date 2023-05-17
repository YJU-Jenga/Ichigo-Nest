import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Models } from 'src/model/entity/models.entity';
import { Repository } from 'typeorm';
import { CreateModelsDto, UpdateModelsDto } from './dto';

@Injectable()
export class ModelsService {
  constructor(@InjectRepository(Models) private modelsRepository: Repository<Models>){}

  async create(file: Express.Multer.File, dto: CreateModelsDto){
    try {
      const { productId, name } = dto;
      const parsedProductId = JSON.parse(productId.toString()).productId;
      const parsedName = JSON.parse(name).name;
      if(file) {
        await this.modelsRepository.save({
          Productid: parsedProductId,
          name: parsedName,
          file: file.path,
        });
      } else {
        await this.modelsRepository.save({
          Productid: parsedProductId,
          name: parsedName,
          file: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(Productid:number): Promise<Models[]>{
    try {
      return await this.modelsRepository.find({ where: { Productid }, order: {'name': 'asc'}})
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: number): Promise<Models>{
    try {
      return await this.modelsRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, file: Express.Multer.File, dto: UpdateModelsDto){
    const { productId, name } = dto;
      const parsedUserId = JSON.parse(productId.toString()).productId;
      const parsedName = JSON.parse(name).name;
      if(file) {
        await this.modelsRepository.update(id, {
          Productid: parsedUserId,
          name: parsedName,
          file: file.path,
        });
      } else {
        await this.modelsRepository.update(id, {
          Productid: parsedUserId,
          name: parsedName,
          file: null,
        });
      }
  }

  async delete(id: number){
    try {
      await this.modelsRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
