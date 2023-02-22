import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product> ){}

  async create (file: Express.Multer.File, dto:CreateProductDto) {
    try {
      const { name, price, description, stock, type } = dto
      return await this.productRepository.save({
        name,
        price,
        description,
        stock,
        type,
        image: file.path
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  async findAll (): Promise<Product[]> {
    try {
      return await this.productRepository.find({order:{'createdAt': 'DESC'}})
    } catch (error) {
      console.log(error);
    }
  }

  async findOne (id): Promise<Product> {
    try {
      return await this.productRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }
  
  async update (id: number, file: Express.Multer.File, dto:UpdateProductDto) {
    try {
      const { name, price, description, stock, type } = dto
      return await this.productRepository.update(id, {
        name,
        price,
        description,
        stock,
        type,
        image: file.path
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  async delete (id) {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
