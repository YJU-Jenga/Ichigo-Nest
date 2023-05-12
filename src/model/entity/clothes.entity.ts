import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { CartToProductOption } from "./cartToProductOption.entity";

@Entity({name: 'clothes'})
export class Clothes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({comment:"옷 이름"})
  name: string;

  @Column({comment:"파일 경로", nullable: true})
  file: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정
  @ManyToOne(() => Product, (Product) => Product.clothes, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  product:Product;


  @OneToMany(() => CartToProductOption, (cartToProductOption) => cartToProductOption.clothes, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  cartToProductOption: CartToProductOption
}