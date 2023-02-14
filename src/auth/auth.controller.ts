import { Controller, UseGuards, Post, Req, Body, Get, NotFoundException, Query, Res, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LogOutDto } from './dto/logout.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService){}

  // login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({
    summary: '로그인 API',
    description: '아이디와 비밀번호를 통해 로그인을 진행',
  })
  @ApiCreatedResponse({
    description: '로그인 정보',
    schema: {
      example: {
    },
    },
  })
  async login(@Req() req, @Res({passthrough: true}) response) {
    return await this.authService.login(req, response);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/refreshToken')
  async refresh(@Req() req) {
    return await this.authService.refreshTokens(req);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req, @Res() res: Response): Promise<NotFoundException | Response> {
    const cookie = req.cookies['jwt'];

    const data = await this.jwtService.decode(cookie);
    
    await this.authService.logout(data['id'])
    res.clearCookie('jwt');
    res.clearCookie('jwt-refresh');
    
    return res.send({
      message:"logout"
    });
  }

  @Get('/cookies')
  async getCookies(@Req() req, @Res() res: Response) {
    const jwt = req.cookies['jwt'];
    const jwtRefresh = req.cookies['jwt-refresh'];
    return res.send({jwt, jwtRefresh})
  }

  @Get("/user")
  async user(@Req() req: Request) {
    try {
      const cookie = req.cookies['jwt'];

      const data = await this.jwtService.decode(cookie);
      
      if(!data) {
        // throw new UnauthorizedException();
        return null;
      }

      const user = await this.authService.authUser(data['id']);

      const {password, refreshToken, ...result} = user;
      
      return result;
      
    } catch (e) {
      throw new UnauthorizedException();
    }
  }


}
