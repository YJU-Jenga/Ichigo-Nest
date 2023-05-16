import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, JoinColumn } from "typeorm"
import { Clothes, OrderToProduct } from "./index"

@Entity()
export class OrderToProductOption extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    orderToProductId!: number

    @Column()
    clothesId!: number

    @Column()
    color!: string
    
    @Column({comment: '주문 개수'})
    count: number;

    @ManyToOne(() => OrderToProduct, (orderToProduct) => orderToProduct.orderToProductOption)
    @JoinColumn({name: "orderToProductId"})
    orderToProduct!: OrderToProduct

    @ManyToOne(() => Clothes, (clothes) => clothes.orderToProductOption)
    clothes!: Clothes

}