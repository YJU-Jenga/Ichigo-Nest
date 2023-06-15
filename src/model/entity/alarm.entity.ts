import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { User } from "./index";

@Entity({name: 'alarm'})
export class Alarm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  time_id: string;

  @Column({comment:"アラームの名前"})
  name: string;

  @Column({comment:"tts用文字", nullable: true})
  sentence: string;

  @Column({comment:"ファイルパス", nullable: true})
  file: string;
  
  @Column({comment:"状態、オフか、オンか"})
  state: boolean;
 
  @Column({comment:"0000000 1に変更すると繰り返し、日~月繰り返し確認用"})
  repeat: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @ManyToOne(
    () => User,
    (user) => user.alarm, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'user_id'})
  user:User;
}