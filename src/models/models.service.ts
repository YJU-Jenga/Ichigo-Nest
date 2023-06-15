import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Models } from 'src/model/entity/models.entity';
import { Repository } from 'typeorm';
import { CreateModelsDto, UpdateModelsDto } from './dto';

@Injectable()
export class ModelsService {
  constructor(@InjectRepository(Models) private modelsRepository: Repository<Models>){} // 依存性の注入、Modelsリポジトリを注入

  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを登録するメソッド
   *
   * @param file 3Dモデルファイル
   * @param dto 3Dモデルファイル登録DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async create(file: Express.Multer.File, dto: CreateModelsDto): Promise<void>{
    try {
      const { productId, name } = dto;
      const parsedProductId = JSON.parse(productId.toString()).productId;
      const parsedName = JSON.parse(name).name;
      const model = await this.modelsRepository.findOneBy({productId: parsedProductId});
      if(model == undefined) { // データベースにあれば
        if(file) {
          await this.modelsRepository.save({
            productId: parsedProductId,
            name: parsedName,
            file: file.path,
          });
        } else {
          await this.modelsRepository.save({
            productId: parsedProductId,
            name: parsedName,
            file: null,
          });
        }
      } else {  // フロントエンドで更新するページを作っていないので
        if(file) {
          await this.modelsRepository.update(model.id, {
            productId: parsedProductId,
            name: parsedName,
            file: file.path,
          });
        } else {
          await this.modelsRepository.update(model.id, {
            productId: parsedProductId,
            name: parsedName,
            file: null,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを全て取得するメソッド
   *
   * @param productId 商品の固有id
   * @returns {Promise<Models[]>} 全ての3Dモデルファイルのデータを戻り値として返す
   */
  async getAll(productId:number): Promise<Models[]>{
    try {
      return await this.modelsRepository.find({ where: { productId }, order: {'name': 'asc'}})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを取得するメソッド
   *
   * @param productId 商品の固有id
   * @returns {Promise<Models>} 商品の3Dモデルファイルのデータを戻り値として返す
   */
  async getModel(productId: number): Promise<Models>{
    try {
      return await this.modelsRepository.findOne({where: {productId}})
    } catch (error) {
      console.log(error);
    }
  }

  
  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを取得するメソッド
   *
   * @param id 3Dモデルファイルの固有id
   * @returns {Promise<Models>} 3Dモデルファイルのデータを戻り値として返す
   */
  async getOne(id: number): Promise<Models>{
    try {
      return await this.modelsRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを更新するメソッド
   *
   * @param id 3Dモデルファイルの固有id
   * @param file 3Dモデルファイル
   * @param dto 3Dモデルファイル更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async update(id: number, file: Express.Multer.File, dto: UpdateModelsDto): Promise<void>{
    const { productId, name } = dto;
      const parsedUserId = JSON.parse(productId.toString()).productId;
      const parsedName = JSON.parse(name).name;
      if(file) {
        await this.modelsRepository.update(id, {
          productId: parsedUserId,
          name: parsedName,
          file: file.path,
        });
      } else {
        await this.modelsRepository.update(id, {
          productId: parsedUserId,
          name: parsedName,
          file: null,
        });
      }
  }


  /**
   * @author ckcic
   * @description 商品の3Dモデルファイルを削除するメソッド
   *
   * @param id 3Dモデルファイルの固有id
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void>{
    try {
      await this.modelsRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
