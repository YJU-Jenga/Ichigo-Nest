import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./index";

@Entity({name: 'calendar'})
export class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId:number;

  @Column({comment:"スケジュールのタイトル"})
  title: string;

  @Column({comment:"スケジュール開始時間"})
  start: Date;

  @Column({comment:"スケジュール終了時間"})
  end: Date;

  @Column({comment:"場所", nullable: true})
  location?: string;

  @Column({comment:"スケジュールの内容", nullable: true})
  description?: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @ManyToOne(
    () => User,
    (user) => user.post, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'userId'})
  user:User;
}