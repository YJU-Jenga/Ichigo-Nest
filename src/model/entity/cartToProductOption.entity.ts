import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne, JoinColumn } from "typeorm"

import { Clothes, CartToProduct } from "./index"

@Entity()
export class CartToProductOption extends BaseEntity { // カートに入っている商品のオプションをエンティティで定義
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cartToProductId!: number

    @Column()
    clothesId!: number

    @Column({comment: '人形の服のカラーコード'})
    color!: string
    
    @Column({comment: 'オプションの数量'})
    count: number;

    // 関係定義
    @ManyToOne(() => CartToProduct, (cartToProduct) => cartToProduct.cartToProductOption)
    @JoinColumn({name:"cartToProductId"})
    cartToProduct!: CartToProduct

    @ManyToOne(() => Clothes, (clothes) => clothes.cartToProductOption)
    clothes!: Clothes

}