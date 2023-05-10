import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder, OrderToProduct } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { CartService } from 'src/cart/cart.service';
import { DeleteAddedProductDto } from 'src/cart/dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder) private readonly orderRepository: Repository<PurchaseOrder>,
    @InjectRepository(OrderToProduct) private readonly orderToProductRepository: Repository<OrderToProduct>,
    private readonly cartService: CartService,
  ){}
  
  async createOrder(dto: CreateOrderDto) {
    try {
      const { userId, postalCode, address, productIds, counts } = dto;
      const newOrder = await this.orderRepository.save({
        userId,
        postalCode,
        address
      });

      const find_cart = await this.cartService.findOneCart_userId(userId)

      productIds.forEach(async (productId, idx)=>{
        await this.orderToProductRepository.save({
          orderId: newOrder.id,
          productId,
          count: counts[idx]
        });

        let delete_dto: DeleteAddedProductDto = {
          cartId: find_cart.id,
          productId
        }

        await this.cartService.deleteAddedProduct(delete_dto);

      });


    } catch (error) {
      console.log(error);
    }
  }

  async findAllOrder(): Promise<PurchaseOrder[]> {
    try {
      return await this.orderRepository
      .createQueryBuilder('purchaseOrder')
      .leftJoinAndSelect('purchaseOrder.orderToProducts', 'orderToProducts')
      .leftJoinAndSelect('orderToProducts.product', 'product')
      .orderBy("purchaseOrder.created_at","DESC")
      .getMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findAllUserOrder(userId: number): Promise<PurchaseOrder[]> {
    try {
      return await this.orderRepository.
      createQueryBuilder('purchaseOrder')
      .leftJoinAndSelect('purchaseOrder.orderToProducts', 'orderToProducts')
      .leftJoinAndSelect('orderToProducts.product', 'product')
      .where("userId = :userId", {userId})
      .orderBy("purchaseOrder.created_at","DESC")
      .getMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findOneOrder(id: number): Promise<PurchaseOrder> {
    try {
      return await this.orderRepository
      .createQueryBuilder('purchaseOrder')
      .where("purchaseOrder.id=:id", {id})
      .leftJoinAndSelect('purchaseOrder.orderToProducts', 'orderToProducts')
      .leftJoinAndSelect('orderToProducts.product', 'product')
      .orderBy("purchaseOrder.created_at","DESC")
      .getOne();
    } catch (error) {
      console.log(error);
    }
  }

  async updateOrder(id: number, dto: UpdateOrderDto) {
    try {
      const { userId, postalCode, address, state } = dto;
      await this.orderRepository.update(id ,{
        userId,
        postalCode,
        address,
        state
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOrder(id: number) {
    try {
      await this.orderToProductRepository.delete({orderId:id})
      return await this.orderRepository.delete({id});
    } catch (error) {
      console.log(error);
    }
  }
}
