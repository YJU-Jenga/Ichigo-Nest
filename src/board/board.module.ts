import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "../model/entity/board.entity";
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
