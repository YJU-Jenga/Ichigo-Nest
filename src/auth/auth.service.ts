import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { response, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/entity/user.entity';
import { Repository } from 'typeorm';
import { LogOutDto } from './dto/logout.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('AuthService');
    
    const user = await this.usersRepository.findOne({
      where: {email},
      select: ['email', 'password', 'id']
    });

    // 사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    if(user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(req:any, response: Response) {
    const { id, email } = req.user;
    const { accessToken, refreshToken } = await this.getTokens(id, email);

    // refresh token 갱신
    await this.updateRefreshToken(id, refreshToken);

    response.setHeader('Authorization', 'Bearer '+ refreshToken);

    response.cookie('jwt', accessToken, { httpOnly: true, maxAge: 30 * 1000 });
    response.cookie('jwt-refresh', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return {
		ok : true,
    };
  }


  async refreshTokens(req: any) {
    const { id, email, refresh_token } = req.user;
    const user = await this.usersRepository.findOne({
      where: {id},
      select: ['refreshToken']
    });

    if(!user) {
      return new NotFoundException();
    }

    if( refresh_token !== user.refreshToken) {
      return new UnauthorizedException();
    }

    const { accessToken, refreshToken } = await this.getTokens(id, email);
    await this.updateRefreshToken(id, refreshToken);

    response.cookie('jwt', accessToken, {httpOnly: true});
    response.cookie('jwt-refresh', refreshToken, {httpOnly: true});
    return {
      ok: true,
    };
  }

  async logout(id:number): Promise<NotFoundException | LogOutDto> {
    const user = await this.usersRepository.findOne({
      where: {id},
    });

    if (!user) {
      return new NotFoundException();
    }

    await this.usersRepository.update(id, {refreshToken: null});

    return {ok: true};
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    await this.usersRepository.update(id, { refreshToken});
  }

  async getTokens(id: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {id},
        {
          secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
          expiresIn: `${this.configService.get<string>('ACCESS_EXPIRES_IN')}m`,
        }
      ),
      this.jwtService.signAsync(
        {id, email},
        {
          secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
          expiresIn: `${this.configService.get<string>('REFRESH_EXPIRES_IN')}d`,
        }
      ),
    ]);

    return { accessToken, refreshToken }
  }

  async authUser(id: number) {
    const user = await this.usersRepository.findOneBy({id});
    return user;
  }
}
