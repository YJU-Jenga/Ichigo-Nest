import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, BaseEntity } from "typeorm";
import { Post } from "./index";

@Entity({name: 'board'})
@Unique(['board_name'])
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, comment: '게시판 이름'})
  board_name: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @OneToMany(() => Post, (post) => post.board )
  post: Post[];
}