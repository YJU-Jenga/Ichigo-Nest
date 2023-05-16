import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { Product } from "./index";

@Entity({name: 'models'})
export class Models extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Productid: number;

  @Column({comment:"파일 이름"})
  name: string;

  @Column({comment:"파일 경로"})
  file: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @ManyToOne(() => Product, (product) => product.models, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({name:"Productid"})
  product:Product;
}