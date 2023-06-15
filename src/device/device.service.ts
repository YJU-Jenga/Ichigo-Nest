import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto, SyncDeviceDto, UpdateDeviceDto } from './dto';

@Injectable()
export class DeviceService {
  constructor(@InjectRepository(Device) private deviceRepository: Repository<Device>){} // 依存性の注入、Deviceリポジトリを注入

  /**
   * @author ckcic
   * @description 販売するデバイスを登録するメソッド
   *
   * @param dto デバイス登録DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async create(dto: CreateDeviceDto): Promise<void>{
    try {
      const { name, macAddress } = dto;
      await this.deviceRepository.save({
        name,
        macAddress
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 登録されたデバイスを全て取得するメソッド
   *
   * @returns {Promise<Device[]>} 全ての登録されたデバイスのデータを戻り値として返す
   */
  async getAll(): Promise<Device[]>{
    try {
      return await this.deviceRepository.find({order: {'createdAt': 'desc'}})
    } catch (error) {
      console.log(error);
    }
  }

  
  /**
   * @author ckcic
   * @description デバイスをidで取得するメソッド
  *
  * @param id デバイスの固有id
  * @returns {Promise<Device>} デバイスのデータを戻り値として返す
  */
 async getOne(id: number): Promise<Device>{
    try {
      return await this.deviceRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }
  
  
  /**
   * @author ckcic
   * @description デバイスをMACアドレスで取得するメソッド
  *
  * @param id デバイスの固有id
  * @param res データを返すためのパラメーター
  * @returns {Promise<Device>} デバイスのデータを戻り値として返す
  */
 async getDevice(macAddress: string): Promise<Device>{
   try {
     return await this.deviceRepository.findOneBy({macAddress})
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description ユーザーに連動されているデバイスを全て取得するメソッド
   *
   * @param id ユーザーの固有id
   * @returns {Promise<Device[]>} 全てのユーザーに連動されているデバイスのデータを戻り値として返す
   */
  async syncedDevice(id: number): Promise<Device[]>{
    try {
      return await this.deviceRepository.find({where:{userId: id}});
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description デバイスを更新するメソッド
   *
   * @param id デバイスの固有id
   * @param dto デバイス更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async update(id: number, dto: UpdateDeviceDto): Promise<void>{
    try {
      const { name, macAddress, userId } = dto;
      await this.deviceRepository.update(id, {
        name,
        macAddress,
        userId
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description デバイスを連動するメソッド
   *
   * @param dto デバイス連動DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async sync(dto: SyncDeviceDto): Promise<void>{
    try {
      const { macAddress, userId } = dto;
      const device = await this.deviceRepository.findOne({where:{macAddress}});
      await this.deviceRepository.update(device.id, { userId });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description デバイスを削除するメソッド
   *
   * @param id デバイスの固有id
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void>{
    try {
      await this.deviceRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}