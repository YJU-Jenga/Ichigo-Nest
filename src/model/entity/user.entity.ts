import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, BaseEntity, OneToMany, OneToOne } from "typeorm";
import { Cart } from "./cart.entity";
import { Comment } from "./comment.entity";
import { PurchaseOrder } from "./purchase_order.entity";
import { Post } from "./post.entity";

@Entity({name: 'user'})
@Unique(['email'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 30, comment: '유저 이름'})
  name: string;

  @Column({type: 'varchar', length: 50, comment: '유저 아이디(이메일)'})
  email: string;

  @Column({nullable: true, comment: '이메일 인증'})
  email_verified_at: Date;

  @Column({type: 'varchar', length: 255, comment: '유저 비밀번호'})
  password: string;

  @Column({type: 'varchar', length: 50, comment: '유저 전화번호'})
  phone: string;

  @Column({default: false, comment: '권한'})
  permission: boolean;

  @Column({nullable: true ,comment: 'jwt token'})
  refreshToken?: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @OneToMany(() => Post, (post) => post.user )
  post: Post[];

  @OneToMany(() => Comment, (comment) => comment.user )
  comment: Comment[];

  // @OneToOne(() => Cart, (cart) => cart.user )
  // cart:Cart;

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.user )
  purchaseOrder: PurchaseOrder[];
}