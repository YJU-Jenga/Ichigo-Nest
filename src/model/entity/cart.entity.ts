import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, BaseEntity, JoinColumn, OneToMany } from "typeorm";
import { User, CartToProduct } from "./index";

@Entity({name: 'cart'})
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId:number;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @OneToOne(() => User, {nullable: false} )
  @JoinColumn()
  user:User;

  @OneToMany(() => CartToProduct, (cartToProduct) => cartToProduct.cart, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  cartToProducts: CartToProduct[];
}