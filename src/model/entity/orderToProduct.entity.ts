import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { Order } from "./order.entity"
import { Product } from "./product.entity"

@Entity()
export class OrderToProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    orderToProductId!: number

    @Column()
    orderId!: number

    @Column()
    productId!: number

    @ManyToOne(() => Order, (order) => order.orderToProducts)
    order!: Order

    @ManyToOne(() => Product, (product) => product.orderToProducts)
    product!: Product
}