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
import { User, Cart, CartToProduct, CartToProductOption } from '../model/entity';

@Module({
  imports: [UserModule, PassportModule, HttpModule, JwtModule.register({}), TypeOrmModule.forFeature([User, Cart, CartToProduct, CartToProductOption])], // モジュールとエンティティをインポート
  controllers: [AuthController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, CartService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
  exports: [AuthService], // 他のモジュールで使えるようにエクスポート
})
export class AuthModule {}
