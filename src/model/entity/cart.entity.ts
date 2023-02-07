import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, OneToMany, BaseEntity, JoinColumn } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity({name: 'cart'})
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({comment: '수량'})
  count: number;

  @Column({name:"totoal_price", comment: '총 가격'})
  totalPrice: number;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @OneToOne(() => User, {nullable: false} )
  @JoinColumn()
  user:User;

  @OneToMany(() => Product, (product) => product.cart )
  product: Product[];
}