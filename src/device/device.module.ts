import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { Device } from 'src/model/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Device])], // エンティティをインポート
  controllers: [DeviceController], // コントローラはクライアントへのリクエストとレスポンスを担当
  providers: [DeviceService] // プロバイダーにサービスを登録、サービスはビジネスロジックを担当
})
export class DeviceModule {}
