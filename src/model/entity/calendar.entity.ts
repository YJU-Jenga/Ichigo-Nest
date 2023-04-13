import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'calendar'})
export class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId:number;

  @Column()
  title: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({nullable: true})
  location?: string;

  @Column({nullable: true})
  description?: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정
  @ManyToOne(
    () => User,
    (user) => user.post, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'userId'})
  user:User;
}