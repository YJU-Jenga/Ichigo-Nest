import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product> ){} // 依存性の注入、Productリポジトリを注入

  /**
   * @author ckcic
   * @description 商品をショッピングモールに登録するメソッド
   *
   * @param file イメージファイル
   * @param dto 商品登録DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async create (file: Express.Multer.File, dto:CreateProductDto): Promise<void> {
    try {
      const { name, price, description, stock, type } = dto
      console.log("asdfasdfdsa",file, dto);

      await this.productRepository.save({
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
  

  /**
   * @author ckcic
   * @description 全ての商品を取得するメソッド
   *
   * @returns {Promise<Product[]>} 全ての商品のデータを戻り値として返す
   */
  async findAll (): Promise<Product[]> {
    try {
      return await this.productRepository.find({order:{'createdAt': 'DESC'}})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 商品のデータを取得するメソッド
   *
   * @param id 商品の固有id
   * @returns {Promise<Product>} 商品のデータを戻り値として返す
   */
  async findOne (id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }
  

  /**
   * @author ckcic
   * @description 商品のデータを更新するメソッド
   *
   * @param id 商品の固有id
   * @param file イメージファイル
   * @param dto 商品更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async update (id: number, file: Express.Multer.File, dto:UpdateProductDto): Promise<void> {
    try {
      const { name, price, description, stock, type } = dto
      await this.productRepository.update(id, {
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
  

  /**
   * @author ckcic
   * @description 商品のデータを削除するメソッド
   *
   * @param id 商品の固有id
   * @returns {Promise<void>}
   */
  async delete (id: number): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
