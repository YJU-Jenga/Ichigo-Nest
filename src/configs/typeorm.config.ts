import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, Calendar ,Cart, Comment, PurchaseOrder, Post, Product, User, CartToProduct, OrderToProduct, Device, Alarm, Music, Clothes, CartToProductOption, Models, OrderToProductOption } from 'src/model/entity';

export const TypeOrmConfig: TypeOrmModule = {
  type: 'mysql', // データベース設定
  host: process.env.MYSQL_SERVER, //'db',
  port: 3306,
  username: process.env.MYSQL_USER, // 'username',
  password: process.env.MYSQL_PASSWORD, // 'mypassword',
  database: process.env.MYSQL_DATABASE, // 'ichigo',
  entities: [Board, Calendar ,Cart, Comment, PurchaseOrder, Post, Product, User, CartToProduct, OrderToProduct, Device, Alarm, Music, Clothes, CartToProductOption, Models, OrderToProductOption], // Entityをつなぐ
  synchronize: true,  //trueの値を設定すると、アプリケーションを再実行する時、エンティティで修正されたカラムの長さタイプ変更値などを該当テーブルをDropして再作成してくれます
};