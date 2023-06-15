import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, BaseEntity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import {Cart, Comment, PurchaseOrder, Post, Calendar, Device, Alarm, Music} from './index';

@Entity({name: 'user'})
@Unique(['email'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 30, comment: 'ユーザー名（ニックネーム）'})
  name: string;

  @Column({type: 'varchar', length: 50, comment: 'ユーザーID(メール形式)'})
  email: string;

  @Column({nullable: true, comment: 'メール認証日'})
  email_verified_at: Date;

  @Column({type: 'varchar', length: 255, comment: 'ユーザーのパスワード'})
  password: string;

  @Column({type: 'varchar', length: 50, comment: 'ユーザーの電話番号'})
  phone: string;

  @Column({default: false, comment: '権限'})
  permission: boolean;

  @Column({nullable: true ,comment: 'refresh jwt token'})
  refreshToken?: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @OneToMany(() => Post, (post) => post.user )
  post: Post[];

  @OneToMany(() => Comment, (comment) => comment.user )
  comment: Comment[];

  // @OneToOne(() => Cart, (cart) => cart.user)
  // cart:Cart;

  @OneToMany(() => Device, (device) => device.user )
  device: Device[];

  @OneToMany(() => Alarm, (alarm) => alarm.user )
  alarm: Alarm[];

  @OneToMany(() => Music, (music) => music.user )
  music: Music[];
  
  @OneToMany(() => Calendar, (calendar) => calendar.user)
  calendar: Calendar[];

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.user )
  purchaseOrder: PurchaseOrder[];
}