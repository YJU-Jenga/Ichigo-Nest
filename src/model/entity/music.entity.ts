import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'music'})
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({comment:"파일 이름"})
  name: string;

  @Column({comment:"파일 경로"})
  file: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @ManyToOne(
    () => User,
    (user) => user.music, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'user_id'})
  user:User;
}