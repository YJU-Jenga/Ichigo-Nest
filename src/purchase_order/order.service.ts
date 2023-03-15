import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder, OrderToProduct } from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(PurchaseOrder) private readonly orderRepository: Repository<PurchaseOrder>,
    @InjectRepository(OrderToProduct) private readonly orderToProductRepository: Repository<OrderToProduct>
  ){}
  
  async createOrder(dto: CreateOrderDto) {
    try {
      const { userId, postalCode, address, productIds, counts } = dto;
      const newOrder = await this.orderRepository.save({
        userId,
        postalCode,
        address
      });

      productIds.forEach(async (productId, idx)=>{
        await this.orderToProductRepository.save({
          orderId: newOrder.id,
          productId,
          count: counts[idx]
        })
      });

    } catch (error) {
      console.log(error);
    }
  }

  async findAllOrder(): Promise<PurchaseOrder[]> {
    try {
      return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderToProducts', 'orderToProducts')
      .leftJoinAndSelect('orderToProducts.product', 'product')
      .orderBy({"createdAt":"DESC"})
      .getMany()
    } catch (error) {
      console.log(error);
    }
  }

  async findOneOrder(id: number): Promise<PurchaseOrder> {
    try {
      return await this.orderRepository
      .createQueryBuilder('order')
      .where("order.id=:id", {id})
      .leftJoinAndSelect('order.orderToProducts', 'orderToProducts')
      .leftJoinAndSelect('orderToProducts.product', 'product')
      .orderBy({"createdAt":"DESC"})
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
