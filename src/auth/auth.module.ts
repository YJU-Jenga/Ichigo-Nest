import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy, JwtRefreshStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CartService } from 'src/cart/cart.service';
import { User, Cart, CartToProduct } from '../model/entity';

@Module({
  imports: [UserModule, PassportModule, HttpModule, JwtModule.register({}), TypeOrmModule.forFeature([User, Cart, CartToProduct])],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, CartService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
