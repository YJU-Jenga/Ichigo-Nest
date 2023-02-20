import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/model/entity/user.entity';
import { SignUpDto, SignInDto } from './dto';
import { Tokens } from './types';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    ) {}

  async singupLocal(dto: SignUpDto): Promise<Tokens> {
    try {
      const { name, email, password, phone } = dto;
      const newUser = await this.usersRepository.save({
        name,
        email,
        password: await this.hashData(password),
        phone
      });

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshToken(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException({
        message: "SQL에러",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);
    }
  }

  async singinLocal(dto: SignInDto): Promise<Tokens> {
    try {
      const { email, password } = dto;
      const user = await this.usersRepository.findOne({where: {email}});
      if (!user) throw new ForbiddenException("아이디와 비밀번호를 제대로 입력하십시오.");

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) throw new ForbiddenException("아이디와 비밀번호를 제대로 입력하십시오.");

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException({
        message: "SQL에러",
        error: error.sqlMessage,
      },
      HttpStatus.FORBIDDEN);
    }
  }

  async logout(id: number) {
    try {
      const user = await this.usersRepository.findOne({where: {id},});
      if (!user) throw new ForbiddenException("Access-Denied");
      await this.usersRepository.update(id, {refreshToken: null});
    } catch (error) {
      throw new HttpException({
        message: "인증되지 않은 접근",
        error: error,
      },
      HttpStatus.FORBIDDEN);
    }
  }

  async refreshTokens(id: number, refreshToken: string): Promise<Tokens> {
    try {
      if(refreshToken == undefined) throw new ForbiddenException("Access-Denied");
      
      const user = await this.usersRepository.findOne({where: {id}});
      if (!user) throw new ForbiddenException("Access-Denied");
      if(user.refreshToken == null) throw new ForbiddenException("Access-Denied");
      
      const refreshTokenMathres = bcrypt.compare(refreshToken, user.refreshToken);
      if (!refreshTokenMathres) throw new ForbiddenException("Access-Denied");
  
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException({
        message: "인증되지 않은 접근",
        error: error,
      },
      HttpStatus.FORBIDDEN);
    }
  }

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    await this.usersRepository.update(id, { refreshToken: await this.hashData(refreshToken)});
  }

  async getTokens(id: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email
        },
        {
          secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
          expiresIn: `${this.configService.get<string>('ACCESS_EXPIRES_IN')}m`,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: id, 
          email
        },
        {
          secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
          expiresIn: `${this.configService.get<string>('REFRESH_EXPIRES_IN')}d`,
        }
      ),
    ]);

    return { 
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

}
