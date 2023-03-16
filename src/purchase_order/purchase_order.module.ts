import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { PurchaseOrderController } from './purchase_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder, OrderToProduct, Cart, CartToProduct } from 'src/model/entity';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder, OrderToProduct, Cart, CartToProduct])],
  providers: [PurchaseOrderService, CartService],
  controllers: [PurchaseOrderController]
})
export class PurchaseOrderModule {}
