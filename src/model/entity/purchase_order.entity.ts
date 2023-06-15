import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User, OrderToProduct } from "./index";

@Entity()
// @Unique([])
export class PurchaseOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({name: "postal_code", type: 'varchar',  comment: '注文者の郵便番号'})
  postalCode: string;

  @Column({type: 'varchar',  comment: '注文者の住所'})
  address: string;

  // 注文の状態 - 0, 1
  // 0 : 注文受付中 - お客様の注文と支払い情報を受け取りました。 
  // 1 : 注文処理完了 - 注文処理に必要なすべての情報を受け取りました。
  @Column({default: false, comment: '注文の状態'})
  state: boolean;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @ManyToOne(() => User, (user) => user.purchaseOrder, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  user:User;

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.purchaseOrder, { cascade:true, nullable: false, onDelete: 'CASCADE' })
  orderToProducts:OrderToProduct[];
}