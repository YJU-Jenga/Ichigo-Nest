import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartToProduct } from '../model/entity';
import { Repository } from 'typeorm';
import { AddProductDto, DeleteAddedProductDto, UpdateAddedProductDto } from './dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartToProduct) private readonly cartToProductRepository: Repository<CartToProduct>,
  ){}

  async createCart (userId: number) {
    try {
      return await this.cartRepository.save({userId});
    } catch (error) {
      console.log(error);
    }
  }

  async findOneCart (cartId:number): Promise<Cart> {
    try {
      return await this.cartRepository.findOneBy({id: cartId})
    } catch (error) {
      console.log(error);
    }
  }

  async findOneCart_userId (userId:number): Promise<Cart> {
    try {
      return await this.cartRepository.findOneBy({userId})
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart (userId: number) {
    try {
      return await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId=:userId',{userId})
      .delete()
      .execute();
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct (dto:AddProductDto) {
    try {
      const { cartId, productId, count } = dto

      const flag = await this.cartToProductRepository.findOneBy({cartId, productId});

      console.log(flag);

      if(flag != null) {
        return await this.cartToProductRepository.update(flag.cartToProductId, {
          count : flag.count + 1
        });
      }

      return await this.cartToProductRepository.save({
        cartId,
        productId,
        count
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  async findAllProductInCart (cartId: number) {
    try {
      return await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.id=:cartId', {cartId})
      .leftJoinAndSelect('cart.cartToProducts', 'cartToProducts')
      .leftJoinAndSelect('cartToProducts.product', 'product')
      .getMany()
    } catch (error) {
      console.log(error);
    }
  }
  
  async updateAddedProduct (cartId: number, dto:UpdateAddedProductDto) {
    try {
      const { productId, count } = dto
      return await this.cartToProductRepository.update(cartId, {
        productId,
        count
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteAddedProduct (dto: DeleteAddedProductDto) {
    try {
      const {cartId, productId} = dto;
      return await this.cartToProductRepository
      .createQueryBuilder('cartToProduct')
      .where('cartId=:cartId',{cartId})
      .where('productId=:productId',{productId})
      .delete()
      .execute();
    } catch (error) {
      console.log(error);
    }
  }
}
