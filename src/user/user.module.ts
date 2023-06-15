import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartService } from 'src/cart/cart.service';
import { User, Cart, CartToProduct, CartToProductOption } from '../model/entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, CartToProduct, CartToProductOption])], // エンティティをインポート
  controllers: [UserController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [UserService, CartService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
  exports: [UserService], // 他のモジュールで使えるようにエクスポート
})
export class UserModule {}
