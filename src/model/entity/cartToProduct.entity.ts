import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { Cart } from "./cart.entity"
import { Product } from "./product.entity"

@Entity()
export class CartToProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    cartToProductId!: number

    @Column()
    cartId!: number

    @Column()
    productId!: number

    @Column()
    count!: number

    @ManyToOne(() => Cart, (cart) => cart.cartToProducts)
    cart!: Cart

    @ManyToOne(() => Product, (product) => product.cartToproducts)
    product!: Product
}