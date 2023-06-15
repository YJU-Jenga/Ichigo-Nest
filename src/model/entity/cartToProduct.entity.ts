import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { Cart, Product, Clothes, CartToProductOption } from "./index"

@Entity()
export class CartToProduct extends BaseEntity { // カートに入っている商品をエンティティで定義
    @PrimaryGeneratedColumn()
    cartToProductId!: number

    @Column()
    cartId!: number

    @Column()
    productId!: number

    @Column({comment: '商品の数量'})
    count!: number

    // 関係定義
    @ManyToOne(() => Cart, (cart) => cart.cartToProducts)
    cart!: Cart

    @ManyToOne(() => Product, (product) => product.cartToproducts)
    product!: Product

    @OneToMany(() => CartToProductOption, (cartToProductOption) => cartToProductOption.cartToProduct, { cascade:true, nullable: true, onDelete: 'CASCADE' })
    cartToProductOption: CartToProductOption[] 

}