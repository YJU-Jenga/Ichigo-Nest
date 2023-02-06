import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(user_id: string, password: string): Promise<any> {
    console.log('AuthService');
    
    const user = await this.usersService.findByLogin(user_id, password);
    const isMatch = await bcrypt.compare(password, user.password);

    // 사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    if(user && isMatch) {
      const { password, ...result } = user;

      // 유저 정보를 통해 토큰 값을 생성
      const accessToken = await this.jwtService.sign(result);
      
      // 토큰값을 추가한다.
      result['token'] = accessToken;

      // 비밀번호를 제외하고 유저 정보를 반환
      return result;
    }
    return null;
  }
}
