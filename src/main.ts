import { APP_PIPE, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { HttpExceptionFilter } from './utils/http-exception.flter';
import { ValidationPipe } from "@nestjs/common";
import { existsSync, mkdirSync } from 'fs';
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const uploadPath = 'uploads';
  if (!existsSync(uploadPath)) { // uploadsフォルダが存在しない場合、生成します。
    mkdirSync(uploadPath);
  }

  // /uploadsディレクトリを静的ファイルのルートとして設定
  app.useStaticAssets('/uploads');

  // https://docs.nestjs.com/techniques/mvc
  // 静的ファイルにアクセスするためのURLパスにプレフィックスを追加
  app.useStaticAssets(join(__dirname, '../', 'uploads'), {
    prefix: '/uploads'
  });
  
  // Global Middleware設定 
  // Corsを有効化
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
    credentials: true,
  });
  
  // 例外フィルター設定
  app.useGlobalPipes(
    new ValidationPipe({
    /**
     * https://docs.nestjs.com/techniques/validation
     * 
     * whitelist: DTOにないプロパティは無視します。
     * forbidNonWhitelisted: 渡すリクエスト値の中に定義されていない値がある場合、Errorを発生します。
     * transform: ネットワークを通じて入ってくるデータは一般的なJavaScriptオブジェクトです。
     *            オブジェクトを自動的にDTOに変換したい場合は、transform値をtrueに設定します。
     * disableErrorMessages: Errorが発生したときにError Messageを表示するかどうかを設定(true: 表示しない、false: 表示する)
     */

      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  // cookieParser 設定
  app.use(cookieParser());

  // Swagger 環境設定
  setupSwagger(app);

  // ポート設定
  await app.listen(5000);
}
bootstrap();
