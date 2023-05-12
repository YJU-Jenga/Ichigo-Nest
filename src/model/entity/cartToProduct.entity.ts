import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { Cart } from "./cart.entity"
import { Product } from "./product.entity"
import { Clothes } from "./clothes.entity"
import { CartToProductOption } from "./cartToProductOption.entity"

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

    @OneToMany(() => CartToProductOption, (cartToProductOption) => cartToProductOption.cartToProduct, { cascade:true, nullable: true, onDelete: 'CASCADE' })
    cartToProductOption: CartToProductOption[] 

}