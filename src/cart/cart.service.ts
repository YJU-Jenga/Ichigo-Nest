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
  
  async updateAddedProdcut (cartId: number, dto:UpdateAddedProductDto) {
    try {
      const { productId, count } = dto
      return await this.cartToProductRepository.update(cartId, {
        productId,
        count
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteAddedProdcut (dto: DeleteAddedProductDto) {
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
