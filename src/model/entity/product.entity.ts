import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, ManyToOne } from "typeorm";
import { Cart } from "./cart.entity";
import { Order } from "./order.entity";

@Entity()
// @Unique([])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

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

  @ManyToOne(
    () => Cart,
    (cart) => cart.product, { nullable: false, onDelete: 'CASCADE' }
  )
  cart:Cart;

  @OneToMany(() => Order, (order) => order.product )
  order: Order[];

}