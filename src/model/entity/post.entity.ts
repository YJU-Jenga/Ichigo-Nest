import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { Board, Comment, User } from "./index";

@Entity({name: 'post'})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: number;
  
  @Column()
  boardId: number;

  @Column({type: 'varchar', length: 100, comment: '投稿のタイトル'})
  title: string;
  
  @Column({type: 'varchar', length: 4, nullable: true, comment: '投稿のパスワード - 整数 4文字'})
  password: string;

  @Column({type: 'varchar', length: 1000, comment: '投稿の内容'})
  content: string;

  @Column({default: 0, comment: '閲覧回数'})
  hit: number;

  @Column({default: false, comment: '応答状態'})
  state: boolean;

  @Column({comment: '非公開設定'})
  secret: boolean;

  @Column({type: 'varchar', length: 100, nullable: true, comment: 'イメージファイルパス'})
  image: string;

  @CreateDateColumn({name: 'created_at', comment: '作成日'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '修正日'})
  updatedAt: Date;

  // 関係定義
  @ManyToOne(
    () => User,
    (user) => user.post, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'writer'})
  user:User;

  @ManyToOne(
    () => Board,
    (board) => board.post, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  board:Board;

  @OneToMany(() => Comment, (comment) => comment.post )
  comment: Comment[];
}