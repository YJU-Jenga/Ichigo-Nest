import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PurchaseOrder,
  OrderToProduct,
  OrderToProductOption,
} from 'src/model/entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { CartService } from 'src/cart/cart.service';
import { DeleteAddedProductDto } from 'src/cart/dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder) private readonly orderRepository: Repository<PurchaseOrder>, // PurchaseOrderリポジトリを注入
    @InjectRepository(OrderToProduct) private readonly orderToProductRepository: Repository<OrderToProduct>, // OrderToProductリポジトリを注入
    @InjectRepository(OrderToProductOption) private readonly orderToProductOptionRepository: Repository<OrderToProductOption>, // OrderToProductOptionリポジトリを注入
    private readonly cartService: CartService, // CartServiceクラスのインスタンスを注入
  ) {} // 依存性の注入


  /**
   * @author ckcic
   * @description ユーザーのカートから注文を作成するメソッド
   * 
   * @param dto 注文作成DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>} 
   */
  async createOrder(dto: CreateOrderDto): Promise<void> {
    try {
      const {
        userId,
        postalCode,
        address,
        productIds,
        counts,
        productOptions,
      } = dto;

      // データベースに格納
      const newOrder = await this.orderRepository.save({
        userId,
        postalCode,
        address,
      });

      // ユーザーのカートの情報を取得
      const find_cart = await this.cartService.findCartId(userId);

      // 注文した商品のid配列を繰り返す
      productIds.forEach(async (productId, idx) => {
        // 注文のデータをorderToProductRepositoryに格納
        const newOrderToProduct = await this.orderToProductRepository.save({
          orderId: newOrder.id,
          productId,
          count: counts[idx],
        });

        if (productOptions.length != 0) { // オプションがいたら
          // 注文した商品のオプション配列を繰り返す
          productOptions.forEach(async (productOption) => {
            const { productId, clothesIds, colors, optionCounts } =
              productOption;
            // 人形の服id配列を繰り返す
            clothesIds.forEach(async (clothesId, idx) => {
              if (newOrderToProduct.productId == productId) {
                // カスタマイズした人形の服のデータをorderToProductOptionRepositoryに格納
                await this.orderToProductOptionRepository.save({
                  orderToProductId: newOrderToProduct.orderToProductId,
                  clothesId,
                  color: colors[idx],
                  count: optionCounts[idx],
                });
              }
            });
          });
        }

        // ユーザーのカートにある商品のデータを削除する
        let delete_dto: DeleteAddedProductDto = {
          cartId: find_cart.id,
          productId,
        };
        await this.cartService.deleteAddedProduct(delete_dto);
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 全ての注文を取得するメソッド
   * 
   * @returns {Promise<PurchaseOrder[]>} 全ての注文のデータを戻り値として返す
   */
  async findAllOrder(): Promise<PurchaseOrder[]> {
    try {
      return await this.orderRepository
        .createQueryBuilder('purchaseOrder')
        .leftJoinAndSelect('purchaseOrder.orderToProducts', 'orderToProducts') // エンティティを結合し、注文した商品を取得
        .leftJoinAndSelect('orderToProducts.product', 'product') // エンティティを結合し、商品の詳しいデータを取得
        .orderBy('purchaseOrder.created_at', 'DESC')
        .getMany();
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description ユーザーの全ての注文を取得するメソッド
   * 
   * @param userId ユーザーの固有ID
   * @returns {Promise<PurchaseOrder[]>}  ユーザーの全ての注文データを戻り値として返す
   */
  async findAllUserOrder(userId: number): Promise<PurchaseOrder[]> {
    try {
      return await this.orderRepository
        .createQueryBuilder('purchaseOrder')
        .leftJoinAndSelect('purchaseOrder.orderToProducts', 'orderToProducts')
        .leftJoinAndSelect('orderToProducts.product', 'product')
        .where('userId = :userId', { userId })
        .orderBy('purchaseOrder.created_at', 'DESC')
        .getMany();
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 注文のデータを取得するメソッド
   * 
   * @param id　注文の固有ID
   * @returns {Promise<PurchaseOrder>} 注文のデータを戻り値として返す
   */
  async findOneOrder(id: number): Promise<PurchaseOrder> {
    try {
      return await this.orderRepository
        .createQueryBuilder('purchaseOrder')
        .where('purchaseOrder.id=:id', { id })
        .leftJoinAndSelect('purchaseOrder.orderToProducts', 'orderToProducts')
        .leftJoinAndSelect('orderToProducts.product', 'product')
        .orderBy('purchaseOrder.created_at', 'DESC')
        .getOne();
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 注文のデータを更新するメソッド
   * 
   * @param id　注文の固有ID
   * @param dto 注文更新DTO、DTO(Data Transfer Object)にマッピングしてデータの受け渡しやバリデーションに使用
   * @returns {Promise<void>} 
   */
  async updateOrder(id: number, dto: UpdateOrderDto): Promise<void> {
    try {
      const { userId, postalCode, address, state } = dto;
      await this.orderRepository.update(id, {
        userId,
        postalCode,
        address,
        state,
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author ckcic
   * @description 注文のデータを削除するメソッド
   * 
   * @param id　注文の固有ID
   * @returns {Promise<void>} 
   */
  async deleteOrder(id: number): Promise<void> {
    try {
      await this.orderToProductRepository.delete({ orderId: id });
      await this.orderRepository.delete({ id });
    } catch (error) {
      console.log(error);
    }
  }
}
