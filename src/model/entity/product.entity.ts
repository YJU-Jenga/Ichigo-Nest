import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { CartToProduct, Clothes, OrderToProduct, Models } from "./index";

@Entity()
// @Unique([])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, comment: '商品名'})
  name: string;

  @Column({comment: '商品価格'})
  price: number;

  @Column({type: 'varchar', length: 1000, comment: '商品の説明'})
  description: string;

  @Column({comment: '商品の在庫'})
  stock: number;

  @Column({comment: '商品種類(男・女)'})
  type: boolean;

  @Column({type: 'varchar', length: 100, nullable: true, comment: 'イメージファイルパス'})
  image: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @OneToMany(() => CartToProduct, (cartToProduct) => cartToProduct.product, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  cartToproducts: CartToProduct;
  
  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  orderToProducts: OrderToProduct[];

  @OneToMany(() => Clothes, (clothes) => clothes.product)
  models: Models;

  @OneToMany(() => Clothes, (clothes) => clothes.product)
  clothes: Clothes[];
}