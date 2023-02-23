import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartService } from 'src/cart/cart.service';
import { User, Cart, CartToProduct } from '../model/entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, CartToProduct])],
  controllers: [UserController],
  providers: [UserService, CartService],
  exports: [UserService],
})
export class UserModule {}
