import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { User, Post } from "./index";

@Entity({name: 'device'})
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  macAddress: string;

  @Column({comment:"デバイスの名前"})
  name: string;

  @Column({nullable: true})
  userId: number;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 관계 설정

  @ManyToOne(
    () => User,
    (user) => user.device, { cascade:true, nullable: true, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'userId'})
  user:User;
}