import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartToProduct, CartToProductOption } from '../model/entity';
import { Repository } from 'typeorm';
import { AddProductDto, AddProductWithOptionDto, DeleteAddedProductDto, UpdateAddedProductDto, UpdateProductWithOptionDto } from './dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartToProduct) private readonly cartToProductRepository: Repository<CartToProduct>,
    @InjectRepository(CartToProductOption) private readonly cartToProductOptionRepository: Repository<CartToProductOption>,
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

  async addProductWithOption (dto:AddProductWithOptionDto) {
    try {
      const { cartId, productId, count, clothesIds, colors } = dto

      const cTP = await this.cartToProductRepository.findOneBy({cartId, productId});

      if(cTP != null) {
        clothesIds.forEach(async (clothesId, idx)=>{
          await this.cartToProductOptionRepository.save({
            cartToProductId: cTP.cartToProductId,
            clothesId,
            color: colors[idx]
          });
        });
        return
      }

      const newCTP = await this.cartToProductRepository.save({
        cartId,
        productId,
        count
      });

      clothesIds.forEach(async (clothesId, idx)=>{
        await this.cartToProductOptionRepository.save({
          cartToProductId: newCTP.cartToProductId,
          clothesId,
          color: colors[idx]
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductWithOption (ctpId:number, dto:UpdateProductWithOptionDto) {
    try {
      const { cartId, productId, count, clothesIds, colors } = dto


      if(clothesIds.length > 0) {
        await this.cartToProductRepository.update(ctpId, {
          cartId,
          productId,
          count
        });
        const ctpos = await this.cartToProductOptionRepository.find({where: {cartToProductId: ctpId}})
        console.log("sdf",ctpos.length);

        if(ctpos.length == 0) {
          clothesIds.forEach(async (clothesId, idx)=>{
            await this.cartToProductOptionRepository.save({
              cartToProductId: ctpId,
              clothesId: clothesId,
              color: colors[idx]
            });
          });
          return
        }

        if (clothesIds.length == ctpos.length) {
          ctpos.forEach(async (ctpo, idx)=>{
            await this.cartToProductOptionRepository.update(ctpo.id, {
              cartToProductId: ctpId,
              clothesId: clothesIds[idx],
              color: colors[idx]
            });
          });
        } else {
          ctpos.forEach(async (ctpo, idx)=>{
            await this.cartToProductOptionRepository.delete(ctpo.id);
            await this.cartToProductOptionRepository.save({
              cartToProductId: ctpId,
              clothesId: clothesIds[idx],
              color: colors[idx]
            });
          });
        }

      } else {
        await this.cartToProductRepository.update(ctpId, {
          cartId,
          productId,
          count
        });
        const ctpos = await this.cartToProductOptionRepository.find({where: {cartToProductId: ctpId}})
        ctpos.forEach(async (ctpo)=>{
          await this.cartToProductOptionRepository.delete(ctpo.id);
        });
      }

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
      .leftJoinAndSelect('cartToProducts.cartToProductOption', 'cartToProductOption')
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

      const ctpId = await this.cartToProductRepository.findOne({where: [{cartId}, {productId}]});
      const delOpIds = await this.cartToProductOptionRepository.find({where: {cartToProductId: ctpId.cartToProductId}});

      delOpIds.forEach(async(delOpId)=>{
        await this.cartToProductOptionRepository.delete(delOpId.id);
      })

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
