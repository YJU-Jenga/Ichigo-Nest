import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { Post, User } from "./index";

@Entity({name: 'comment'})
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: number;

  @Column()
  postId: number;

  @Column({type: 'varchar', length: 1000, comment: '댓글 내용'})
  content: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @ManyToOne(
    () => User,
    (user) => user.comment, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'writer'})
  user:User;

  @ManyToOne(
    () => Post,
    (post) => post.comment, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  post:Post;
}