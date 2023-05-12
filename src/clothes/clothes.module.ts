import { Module } from '@nestjs/common';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothes } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clothes])],
  controllers: [ClothesController],
  providers: [ClothesService]
})
export class ClothesModule {}
