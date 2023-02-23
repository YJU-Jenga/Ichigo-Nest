import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderToProduct } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderToProduct])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
