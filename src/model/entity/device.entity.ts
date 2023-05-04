import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity({name: 'device'})
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  macAddress: string;

  @Column({comment:"기기 이름"})
  name: string;

  @Column({nullable: true})
  userId: number;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @ManyToOne(
    () => User,
    (user) => user.device, { cascade:true, nullable: true, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'userId'})
  user:User;
}