import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartToProduct, CartToProductOption } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartToProduct, CartToProductOption])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
