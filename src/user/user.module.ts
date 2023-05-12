import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartService } from 'src/cart/cart.service';
import { User, Cart, CartToProduct, CartToProductOption } from '../model/entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, CartToProduct, CartToProductOption])],
  controllers: [UserController], 
  providers: [UserService, CartService],
  exports: [UserService],
})
export class UserModule {}
