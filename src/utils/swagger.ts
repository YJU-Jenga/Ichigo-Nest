import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

// ウェブページを更新してもToken値は維持するオプション
const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

/**
 * @author ckcic
 * @description Swagger 設定
 * Swagger（スワッガー）はAPIの設計とドキュメンテーションをサポートするためのオープンソースのフレームワーク
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('🍓 API Docs')
    .setDescription('🍓 Swagger API サーバー')
    .setVersion('1.0.0')
    //JWT 設定
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  // パス：http://localhost:5000/api-docs
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}