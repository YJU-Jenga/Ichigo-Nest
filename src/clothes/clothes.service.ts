import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothes } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateClothesDto, UpdateClothesDto } from './dto';

@Injectable()
export class ClothesService {
  constructor(@InjectRepository(Clothes) private clothesRepository: Repository<Clothes>){}

  async create(file: Express.Multer.File, dto: CreateClothesDto){
    try {
      const { productId, name } = dto;
      const parsedProductId = JSON.parse(productId.toString()).productId;
      const parsedName = JSON.parse(name).name;
      if(file) {
        await this.clothesRepository.save({
          productId: parsedProductId,
          name: parsedName,
          file: file.path,
        });
      } else {
        await this.clothesRepository.save({
          productId: parsedProductId,
          name: parsedName,
          file: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(productId:number): Promise<Clothes[]>{
    try {
      return await this.clothesRepository.find({ where: { productId }, order: {'name': 'asc'}})
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: number): Promise<Clothes>{
    try {
      return await this.clothesRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, file: Express.Multer.File, dto: UpdateClothesDto){
    const { productId, name } = dto;
      const parsedUserId = JSON.parse(productId.toString()).productId;
      const parsedName = JSON.parse(name).name;
      if(file) {
        await this.clothesRepository.update(id, {
          productId: parsedUserId,
          name: parsedName,
          file: file.path,
        });
      } else {
        await this.clothesRepository.update(id, {
          productId: parsedUserId,
          name: parsedName,
          file: null,
        });
      }
  }

  async delete(id: number){
    try {
      await this.clothesRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
