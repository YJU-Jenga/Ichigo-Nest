import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { CartToProduct } from "./cartToProduct.entity";
import { OrderToProduct } from "./orderToProduct.entity";
import { Clothes } from "./clothes.entity";
import { Models } from "./models.entity";

@Entity()
// @Unique([])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, comment: '상품이름'})
  name: string;

  @Column({comment: '상품가격'})
  price: number;

  @Column({type: 'varchar', length: 1000, comment: '상품설명'})
  description: string;

  @Column({comment: '상품재고'})
  stock: number;

  @Column({comment: '상품종류(남,녀)'})
  type: boolean;

  @Column({type: 'varchar', length: 100, nullable: true, comment: '상품 이미지 주소'})
  image: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @OneToMany(() => CartToProduct, (cartToProduct) => cartToProduct.product, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  cartToproducts: CartToProduct;
  
  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  orderToProducts: OrderToProduct[];

  @OneToMany(() => Clothes, (clothes) => clothes.product)
  models: Models;

  @OneToMany(() => Clothes, (clothes) => clothes.product)
  clothes: Clothes[];
}