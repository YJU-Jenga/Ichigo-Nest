import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from '../model/entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])], // エンティティをインポート
  controllers: [PostController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [PostService], // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
  exports: [PostService] // 他のモジュールで使えるようにエクスポート
})
export class PostModule {}
