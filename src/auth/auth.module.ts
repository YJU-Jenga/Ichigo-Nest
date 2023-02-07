import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/auth.jwt.stategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    // 토큰 서명 값 설정
    secret: jwtConstants.secret,
    // 토큰 유효시간 (임의 60초)
    // signOptions: {expiresIn: '60s'},
    signOptions: {expiresIn: '1h'},
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
