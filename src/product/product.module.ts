import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // エンティティをインポート
  controllers: [ProductController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [ProductService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class ProductModule {}
