import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { Product, PurchaseOrder } from "./index"

@Entity()
export class OrderToProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    orderToProductId!: number

    @Column()
    orderId!: number

    @Column()
    productId!: number

    @Column({comment: '주문 개수'})
    count: number;

    @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.orderToProducts)
    purchaseOrder!: PurchaseOrder

    @ManyToOne(() => Product, (product) => product.orderToProducts)
    product!: Product
}