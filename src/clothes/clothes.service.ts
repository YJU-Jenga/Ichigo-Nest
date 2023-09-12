import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothes } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateClothesDto, UpdateClothesDto } from './dto';

@Injectable()
export class ClothesService {
  constructor(@InjectRepository(Clothes) private clothesRepository: Repository<Clothes>){} // 依存性の注入、Clothesリポジトリを注入

  /**
   * @author ckcic
   * @description 商品の服(オプション)のイメージファイルを登録するメソッド
   *
   * @param file 服のイメージファイル
   * @param dto 服のイメージファイル登録DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async create(file: Express.MulterS3.File, dto: CreateClothesDto): Promise<void>{
    try {
      const { productId, name } = dto;
      const parsedProductId = JSON.parse(productId.toString()).productId;
      const parsedName = JSON.parse(name).name;
      if(file) { // 服のイメージファイルあるのか
        await this.clothesRepository.save({
          productId: parsedProductId,
          name: parsedName,
          file: file.key,
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


  /**
   * @author ckcic
   * @description 商品の服(オプション)のデータを全て取得するメソッド
   *
   * @param productId 商品の固有id
   * @returns {Promise<Clothes[]>} 全ての服のイメージファイルのデータを戻り値として返す
   */
  async getAll(productId:number): Promise<Clothes[]>{
    try {
      return await this.clothesRepository.find({ where: { productId }, order: {'createdAt': 'asc'}})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 商品の服(オプション)のイメージファイルを取得するメソッド
   *
   * @param id 服の固有id
   * @returns {Promise<Clothes>} 服のデータをJSON形式で戻り値として返す
   */
  async getOne(id: number): Promise<Clothes>{
    try {
      return await this.clothesRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @author ckcic
   * @description 商品の服(オプション)のイメージファイルを更新するメソッド
   *
   * @param id 服の固有id
   * @param file 服のイメージファイル
   * @param dto 服のイメージファイル更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async update(id: number, file: Express.MulterS3.File, dto: UpdateClothesDto): Promise<void>{
    const { productId, name } = dto;
      const parsedUserId = JSON.parse(productId.toString()).productId;
      const parsedName = JSON.parse(name).name;
      if(file) { // 服のイメージファイルあるのか
        await this.clothesRepository.update(id, {
          productId: parsedUserId,
          name: parsedName,
          file: file.key,
        });
      } else {
        await this.clothesRepository.update(id, {
          productId: parsedUserId,
          name: parsedName,
          file: null,
        });
      }
  }


  /**
   * @author ckcic
   * @description 商品の服(オプション)のイメージファイルを削除するメソッド
   *
   * @param id 服の固有id
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void>{
    try {
      await this.clothesRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
