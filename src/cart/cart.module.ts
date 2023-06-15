import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartToProduct, CartToProductOption } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartToProduct, CartToProductOption])], // エンティティをインポート
  controllers: [CartController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [CartService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
  exports: [CartService] // 他のモジュールで使えるようにエクスポート
})
export class CartModule {}
