import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, BaseEntity } from "typeorm";
import { Post } from "./index";

@Entity({name: 'board'})
@Unique(['board_name'])
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, comment: '掲示板の名前'})
  board_name: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @OneToMany(() => Post, (post) => post.board )
  post: Post[];
}