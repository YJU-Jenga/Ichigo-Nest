import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, BaseEntity, OneToMany, OneToOne } from "typeorm";
import { Cart } from "./cart.entity";
import { Comment } from "./comment.entity";
import { Order } from "./order.entity";
import { Post } from "./post.entity";

@Entity({name: 'user'})
@Unique(['user_id'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 30, comment: '유저 이름'})
  name: string;

  @Column({type: 'varchar', length: 50, comment: '유저 아이디(이메일)'})
  user_id: string;

  @Column({nullable: true, comment: '이메일 인증'})
  email_verified_at: Date;

  @Column({type: 'varchar', length: 255, comment: '유저 비밀번호'})
  password: string;

  @Column({type: 'varchar', length: 50, comment: '유저 전화번호'})
  phone: string;

  @Column({default: false, comment: '권한'})
  permission: boolean;

  @Column({default: false, comment: '내 정보 기억 - 자동 로그인'})
  remember_token: boolean;

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

  @OneToMany(() => Order, (order) => order.user )
  order: Order[];
}