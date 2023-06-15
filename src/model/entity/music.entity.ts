import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { User } from "./index";

@Entity({name: 'music'})
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({comment:"音声ファイルの名前"})
  name: string;

  @Column({comment:"ファイルパス"})
  file: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @ManyToOne(
    () => User,
    (user) => user.music, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'user_id'})
  user:User;
}