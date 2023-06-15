import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartToProduct, CartToProductOption } from '../model/entity';
import { Repository } from 'typeorm';
import {
  AddProductDto,
  AddProductWithOptionDto,
  DeleteAddedProductDto,
  UpdateAddedProductDto,
  UpdateProductWithOptionDto,
} from './dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>, // Cartリポジトリを注入
    @InjectRepository(CartToProduct) private readonly cartToProductRepository: Repository<CartToProduct>, // CartToProductリポジトリを注入
    @InjectRepository(CartToProductOption) private readonly cartToProductOptionRepository: Repository<CartToProductOption>, // CartToProductOptionリポジトリを注入
  ) {} // 依存性の注入


  /**
   * @author ckcic
   * @description カートを作成するメソッド
   *
   * @param userId ユーザーの固有id
   * @returns {Promise<void>}
   */
  async createCart(userId: number): Promise<void> {
    try {
      await this.cartRepository.save({ userId });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description ユーザーのカートの固有idを取得するメソッド
   *
   * @param userId ユーザーの固有id
   * @returns {Promise<Cart>} カートのデータを戻り値として返す
   */
  async findCartId(userId: number): Promise<Cart> {
    try {
      return await this.cartRepository.findOneBy({ userId });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @author ckcic
   * @description カートを取得するメソッド
   *
   * @param cartId カートの固有id
   * @returns {Promise<Cart>} カートのデータを戻り値として返す
   */
  async findOneCart(cartId: number): Promise<Cart> {
    try {
      return await this.cartRepository.findOneBy({ id: cartId });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description カートを削除するメソッド
   *
   * @param userId ユーザーの固有id
   * @returns {Promise<void>}
   */
  async deleteCart(userId: number): Promise<void> {
    try {
      await this.cartRepository
        .createQueryBuilder('cart')
        .where('cart.userId=:userId', { userId })
        .delete()
        .execute();
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description カートに商品を追加するメソッド
   *
   * @param dto カートに商品追加DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async addProduct(dto: AddProductDto): Promise<void> {
    try {
      const { cartId, productId, count } = dto;

      // 追加する商品がカートに既に存在するのか確認
      const flag = await this.cartToProductRepository.findOneBy({
        cartId,
        productId,
      });

      console.log(flag);

      if (flag != null) {
        await this.cartToProductRepository.update(flag.cartToProductId, {
          count: flag.count + 1,
        });
      }

      await this.cartToProductRepository.save({
        cartId,
        productId,
        count,
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description カートに商品とオプションを追加するメソッド
   *
   * @param dto カートに商品とオプション追加DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>}
   */
  async addProductWithOption(dto: AddProductWithOptionDto): Promise<void> {
    try {
      const { cartId, productId, count, clothesIds, colors } = dto;

      // 追加する商品がカートに既に存在するのか確認
      const cTP = await this.cartToProductRepository.findOneBy({
        cartId,
        productId,
      });

      if (cTP != null) {
        clothesIds.forEach(async (clothesId, idx) => {
          const prevOption = await this.cartToProductOptionRepository.findOne({
            where: [{ cartToProductId: cTP.cartToProductId }, { clothesId }],
          });
          if (prevOption == null) {
            await this.cartToProductOptionRepository.save({
              cartToProductId: cTP.cartToProductId,
              clothesId,
              color: colors[idx],
              count: 1,
            });
          } else if (colors[idx] == prevOption.color) {
            await this.cartToProductOptionRepository.update(prevOption.id, {
              cartToProductId: cTP.cartToProductId,
              clothesId,
              color: colors[idx],
              count: prevOption.count + 1,
            });
          } else {
            await this.cartToProductOptionRepository.save({
              cartToProductId: cTP.cartToProductId,
              clothesId,
              color: colors[idx],
              count: 1,
            });
          }
        });
        return;
      }

      const newCTP = await this.cartToProductRepository.save({
        cartId,
        productId,
        count,
      });

      clothesIds.forEach(async (clothesId, idx) => {
        await this.cartToProductOptionRepository.save({
          cartToProductId: newCTP.cartToProductId,
          clothesId,
          color: colors[idx],
          count: 1,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description カートの中にいる商品とオプションを更新するメソッド
   *
   * @param ctpId カートの中にいる商品の固有id
   * @param dto カートの中にいる商品とオプション更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>} 
   */
  async updateProductWithOption(
    ctpId: number,
    dto: UpdateProductWithOptionDto,
  ) {
    try {
      const { cartId, productId, count, clothesIds, colors, counts } = dto;

      if (clothesIds.length > 0) {
        await this.cartToProductRepository.update(ctpId, {
          cartId,
          productId,
          count,
        });
        const ctpos = await this.cartToProductOptionRepository.find({
          where: { cartToProductId: ctpId },
        });
        console.log('sdf', ctpos.length);

        if (ctpos.length == 0) {
          clothesIds.forEach(async (clothesId, idx) => {
            await this.cartToProductOptionRepository.save({
              cartToProductId: ctpId,
              clothesId: clothesId,
              color: colors[idx],
              count: counts[idx],
            });
          });
          return;
        }

        if (clothesIds.length == ctpos.length) {
          ctpos.forEach(async (ctpo, idx) => {
            await this.cartToProductOptionRepository.update(ctpo.id, {
              cartToProductId: ctpId,
              clothesId: clothesIds[idx],
              color: colors[idx],
              count: counts[idx],
            });
          });
        } else {
          ctpos.forEach(async (ctpo, idx) => {
            await this.cartToProductOptionRepository.delete(ctpo.id);
            await this.cartToProductOptionRepository.save({
              cartToProductId: ctpId,
              clothesId: clothesIds[idx],
              color: colors[idx],
              count: counts[idx],
            });
          });
        }
      } else {
        await this.cartToProductRepository.update(ctpId, {
          cartId,
          productId,
          count,
        });
        const ctpos = await this.cartToProductOptionRepository.find({
          where: { cartToProductId: ctpId },
        });
        ctpos.forEach(async (ctpo) => {
          await this.cartToProductOptionRepository.delete(ctpo.id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @author ckcic
   * @description カートの中にいる商品を全て取得するメソッド
   *
   * @param cartId カートの固有id
   * @returns {Promise<Cart[]>} カートの中にいる商品全てのデータを戻り値として返す
   */
  async findAllProductInCart(cartId: number): Promise<Cart[]> {
    try {
      return await this.cartRepository
        .createQueryBuilder('cart')
        .where('cart.id=:cartId', { cartId })
        .leftJoinAndSelect('cart.cartToProducts', 'cartToProducts')
        .leftJoinAndSelect('cartToProducts.product', 'product')
        .leftJoinAndSelect(
          'cartToProducts.cartToProductOption',
          'cartToProductOption',
        )
        .getMany();
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description カートの中にいる商品を更新するメソッド
   *
   * @param cartId カートの中にいる商品の固有id
   * @param dto カートの中にいる商品更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>} 
   */
  async updateAddedProduct(cartId: number, dto: UpdateAddedProductDto): Promise<void> {
    try {
      const { productId, count } = dto;
      await this.cartToProductRepository.update(cartId, {
        productId,
        count,
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description カートの中にいる商品を削除するメソッド
   *
   * @param dto カートの中にいる商品削除DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>} 
   */
  async deleteAddedProduct(dto: DeleteAddedProductDto): Promise<void> {
    try {
      const { cartId, productId } = dto;
      // console.log(dto);
      const ctpId = await this.cartToProductRepository.findOne({
        where: [{ cartId, productId }],
      });
      console.log(ctpId);
      if (ctpId != null) {
        const delOpIds = await this.cartToProductOptionRepository.find({
          where: { cartToProductId: ctpId.cartToProductId },
        });
        // console.log(delOpIds);
        if (delOpIds != null) {
          delOpIds.forEach(async (delOpId) => {
            await this.cartToProductOptionRepository.delete(delOpId.id);
          });
        }
      }

      await this.cartToProductRepository
        .createQueryBuilder('cartToProduct')
        .where('cartId=:cartId', { cartId })
        .where('productId=:productId', { productId })
        .delete()
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
}
