import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { Models } from 'src/model/entity/models.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Models])], // エンティティをインポート
  controllers: [ModelsController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [ModelsService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class ModelsModule {}
