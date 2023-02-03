import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";


@Entity()
// @Unique([])
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({comment: '주문 개수'})
  count: number;

  @Column({name: "postal_code", type: 'varchar',  comment: '주문자 우편번호'})
  postalCode: string;

  @Column({type: 'varchar',  comment: '주문자 주소'})
  adress: string;

  // 주문 상태 - 0, 1
  // 0 : 주문 접수 중 - 고객님의 주문과 결제 정보가 접수되었습니다. 지금은 주문을 변경할 수 없지만 주문 처리 준비를 시작하면 변경할 수 있습니다.
  // 1 : 주문 처리 완료 - 주문 처리에 필요한 모든 정보가 접수되었습니다. 제품이 준비되는 대로 소식을 보내 드리고 출고를 준비하겠습니다. 지금도 주문을 변경할 수 있습니다.
  @Column({default: false, comment: '주문 상태'})
  state: boolean;

  @CreateDateColumn({name: 'created_at', comment: '생성일'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', comment: '수정일'})
  updatedAt: Date;

  // 관계 설정

  @ManyToOne(
    () => User,
    (user) => user.order, { nullable: false, onDelete: 'CASCADE' }
  )
  user:User;

  @OneToMany(
    () => Product,
    (product) => product.order, { nullable: false, onDelete: 'CASCADE' }
  )
  product:Product[];

  

}