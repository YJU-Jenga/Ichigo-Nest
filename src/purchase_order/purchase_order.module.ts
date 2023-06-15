import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { PurchaseOrderController } from './purchase_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder, OrderToProduct, Cart, CartToProduct, CartToProductOption, OrderToProductOption } from 'src/model/entity';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder, OrderToProduct, OrderToProductOption, Cart, CartToProduct, CartToProductOption])], // エンティティをインポート
  controllers: [PurchaseOrderController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [PurchaseOrderService, CartService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class PurchaseOrderModule {}
