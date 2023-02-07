import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { Board } from "./board.entity";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity({name: 'post'})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: number;
  
  @Column()
  boardId: number;
  

  @Column({type: 'varchar', length: 100, comment: '제목'})
  title: string;
  
  @Column({type: 'varchar', length: 4, nullable: true, comment: '비밀번호'})
  password: string;

  @Column({type: 'varchar', length: 1000, comment: '내용'})
  content: string;

  @Column({default: 0, comment: '조회수'})
  hit: number;

  @Column({default: false, comment: '응답상태'})
  state: boolean;

  @Column({comment: '비밀글 여부'})
  secret: boolean;

  @Column({type: 'varchar', length: 100, nullable: true, comment: '이미지 주소'})
  image: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;


  // 관계 설정

  @ManyToOne(
    () => User,
    (user) => user.post, { nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'writer'})
  user:User;

  @ManyToOne(
    () => Board,
    (board) => board.post, { nullable: false, onDelete: 'CASCADE' }
  )
  board:Board;

  @OneToMany(() => Comment, (comment) => comment.post )
  comment: Comment[];
}