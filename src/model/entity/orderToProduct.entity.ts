import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToMany } from "typeorm"
import { OrderToProductOption, Product, PurchaseOrder } from "./index"

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
    @JoinColumn({name: "orderId"})
    purchaseOrder!: PurchaseOrder

    @ManyToOne(() => Product, (product) => product.orderToProducts)
    product!: Product

    @OneToMany(() => OrderToProductOption, (orderToProductOption) => orderToProductOption.orderToProduct, { cascade:true, nullable: true, onDelete: 'CASCADE' })
    orderToProductOption: OrderToProductOption[] 
}