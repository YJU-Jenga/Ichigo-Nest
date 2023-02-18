import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy, JwtRefreshStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../model/entity/user.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, PassportModule, HttpModule, JwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
