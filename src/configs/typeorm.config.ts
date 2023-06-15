import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, Calendar ,Cart, Comment, PurchaseOrder, Post, Product, User, CartToProduct, OrderToProduct, Device, Alarm, Music, Clothes, CartToProductOption, Models, OrderToProductOption } from 'src/model/entity';

export const TypeOrmConfig: TypeOrmModule = {
  type: 'mysql', // データベース設定
  host: 'db',
  port: 3306,
  username: 'username',
  password: 'mypassword',
  database: 'ichigo',
  entities: [Board, Calendar ,Cart, Comment, PurchaseOrder, Post, Product, User, CartToProduct, OrderToProduct, Device, Alarm, Music, Clothes, CartToProductOption, Models, OrderToProductOption], // Entityをつなぐ
  synchronize: true,  //trueの値を設定すると、アプリケーションを再実行する時、エンティティで修正されたカラムの長さタイプ変更値などを該当テーブルをDropして再作成してくれます
};