import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, Cart, Comment, Order, Post, Product, User, CartToProduct, OrderToProduct } from 'src/model/entity';

export const TypeOrmConfig: TypeOrmModule = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'username',
  password: 'mypassword',
  database: 'ichigo',
  entities: [User, Board, Post, Comment, Product, Cart, Order, CartToProduct, OrderToProduct], // Entity 연결
  synchronize: true,  //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다,
};