import { Module } from '@nestjs/common';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothes } from 'src/model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clothes])], // エンティティをインポート
  controllers: [ClothesController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [ClothesService] // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class ClothesModule {}
