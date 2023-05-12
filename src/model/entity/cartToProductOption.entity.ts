import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne, JoinColumn } from "typeorm"

import { Clothes } from "./clothes.entity"
import { CartToProduct } from "./cartToProduct.entity"

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

    @ManyToOne(() => CartToProduct, (cartToProduct) => cartToProduct.cartToProductOption)
    @JoinColumn({name:"cartToProductId"})
    cartToProduct!: CartToProduct

    @ManyToOne(() => Clothes, (clothes) => clothes.cartToProductOption)
    clothes!: Clothes

}