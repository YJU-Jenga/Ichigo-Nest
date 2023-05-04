import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto, UpdateDeviceDto } from './dto';

@Injectable()
export class DeviceService {
  constructor(@InjectRepository(Device) private deviceRepository: Repository<Device>){}

  async create(dto: CreateDeviceDto){
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

  async getAll(): Promise<Device[]>{
    try {
      return await this.deviceRepository.find({order: {'createdAt': 'desc'}})
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: number): Promise<Device>{
    try {
      return await this.deviceRepository.findOneBy({id})
    } catch (error) {
      console.log(error);
    }
  }

  async getDevice(macAddress: string): Promise<Device>{
    try {
      return await this.deviceRepository.findOneBy({macAddress})
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, dto: UpdateDeviceDto){
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

  async delete(id: number){
    try {
      await this.deviceRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}