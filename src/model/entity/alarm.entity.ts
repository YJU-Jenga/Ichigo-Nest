import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'alarm'})
export class Alarm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  time_id: string;

  @Column({comment:"알람 이름"})
  name: string;

  @Column({comment:"tts용 문자", nullable: true})
  sentence: string;

  @Column({comment:"파일 경로", nullable: true})
  file: string;
  
  @Column({comment:"상태, 꺼저있냐, 켜저있나"})
  state: boolean;
 
  @Column({comment:"0000000 1로 바꾸면 반복, 일~월 반복 확인용"})
  repeat: string;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @ManyToOne(
    () => User,
    (user) => user.alarm, { cascade:true, nullable: false, onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'user_id'})
  user:User;
}