import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { Models } from 'src/model/entity/models.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Models])],
  providers: [ModelsService],
  controllers: [ModelsController]
})
export class ModelsModule {}
