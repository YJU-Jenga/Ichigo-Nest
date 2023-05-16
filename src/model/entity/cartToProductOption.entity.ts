import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne, JoinColumn } from "typeorm"

import { Clothes, CartToProduct } from "./index"

@Entity()
export class CartToProductOption extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cartToProductId!: number

    @Column()
    clothesId!: number

    @Column()
    color!: string
    
    @Column({comment: '주문 개수'})
    count: number;


    @ManyToOne(() => CartToProduct, (cartToProduct) => cartToProduct.cartToProductOption)
    @JoinColumn({name:"cartToProductId"})
    cartToProduct!: CartToProduct

    @ManyToOne(() => Clothes, (clothes) => clothes.cartToProductOption)
    clothes!: Clothes

}