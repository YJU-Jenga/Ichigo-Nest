import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/model/entity/board.entity';
import { Cart } from 'src/model/entity/cart.entity';
import { Comment } from 'src/model/entity/comment.entity';
import { Order } from 'src/model/entity/order.entity';
import { Post } from 'src/model/entity/post.entity';
import { Product } from 'src/model/entity/product.entity';
import { User } from "../model/entity/user.entity";

export const TypeOrmConfig: TypeOrmModule = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'ichigo',
  entities: [User, Board, Post, Comment, Product, Cart, Order], // Entity 연결
  synchronize: true,  //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다
}