import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { Product } from "./index";

@Entity({name: 'models'})
export class Models extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({comment:"3Dモデルの名前"})
  name: string;

  @Column({comment:"ファイルパス"})
  file: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @ManyToOne(() => Product, (product) => product.models, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({name:"productId"})
  product:Product;
} 