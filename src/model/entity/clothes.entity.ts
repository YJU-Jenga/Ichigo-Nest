import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn, OneToMany } from "typeorm";
import { Product, CartToProductOption } from "./index";

@Entity({name: 'clothes'})
export class Clothes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({comment:"服の名前"})
  name: string;

  @Column({comment:"ファイルパス", nullable: true})
  file: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @ManyToOne(() => Product, (Product) => Product.clothes, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  product:Product;

  @OneToMany(() => CartToProductOption, (cartToProductOption) => cartToProductOption.clothes, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  cartToProductOption: CartToProductOption

  @OneToMany(() => CartToProductOption, (cartToProductOption) => cartToProductOption.clothes, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  orderToProductOption: CartToProductOption
}