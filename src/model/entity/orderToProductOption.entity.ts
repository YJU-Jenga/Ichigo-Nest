import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, JoinColumn } from "typeorm"
import { Clothes, OrderToProduct } from "./index"

@Entity()
export class OrderToProductOption extends BaseEntity { // 注文に入っている商品のオプションをエンティティで定義
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    orderToProductId!: number

    @Column()
    clothesId!: number

    @Column({comment: '商品の注文数'})
    color!: string
    
    @Column({comment: 'オプションの数量'})
    count: number;

    // 関係定義
    @ManyToOne(() => OrderToProduct, (orderToProduct) => orderToProduct.orderToProductOption)
    @JoinColumn({name: "orderToProductId"})
    orderToProduct!: OrderToProduct

    @ManyToOne(() => Clothes, (clothes) => clothes.orderToProductOption)
    clothes!: Clothes

}