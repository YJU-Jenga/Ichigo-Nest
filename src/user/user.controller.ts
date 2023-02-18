import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe, UseGuards, Request, Res, HttpStatus} from '@nestjs/common';
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update_user.dto";
import { User } from '../model/entity/user.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, JwtRefreshAuthGuard } from 'src/auth/guards';

@Controller('user')
@ApiTags('User')  // Swagger Tag 설정
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 1. Body (@Body() 변수명: 자료형) -> @Body() body -> 전체 처리방식 
   * 2. Body (@Body('키') 키_변수: 자료형) -> @Body('id') id : number - 단일 처리 방식
   *    (Body에서 데이터를 처리하는 방식은 위와 같이 "묶어서" 처리하는 방식과 "하나씩" 단일로 처리하는 방식이 있습니다.)
   * 3. Query Params (@Query('키') 키_변수: 자료형) -> @Query('id') id: number 
   * 4. Path Variables (@Param('키') 키_변수: 자료형) -> @Param('id') id: number
   * 5. 그리고 위 방식을 혼합해서 사용할 수 있습니다.
  */
  // @Body 방식 - @Body 어노테이션 여러개를 통해 요청 객체를 접근할 수 있습니다.
  

  // 전체 유저 조회
  @Get('/user_all')
  @UseGuards(JwtAuthGuard)  // 검증된 유저만 접근 가능 - 토큰 발행 된 유저
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @ApiOperation({
    summary: '전체 유저 조회',
    description: '전체 유저 조회 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            name: "client",
            user_id: "client@gmail.com",
            email_verified_at: null,
            phone: "010-1234-5678",
            permission: false,
            remember_token: false,
            createdAt: "2023-02-06T06:11:25.748Z",
            updatedAt: "2023-02-06T06:11:25.748Z",
        },
        ],
      },
    },
  })
  getUserAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @Query 방식 - 단일 유저 조회
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  findByUserOne1(@Query('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }



  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @ApiOperation({
    summary: '로그인 유저 조회',
    description: '로그인 유저 조회 API',
  })
  @ApiCreatedResponse({
    description: '유저의 로그인으로 확인',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            name: "client",
            user_id: "client@gmail.com",
            email_verified_at: null,
            phone: "010-1234-5678",
            permission: false,
            createdAt: "2023-02-06T06:11:25.748Z",
            updatedAt: "2023-02-06T06:11:25.748Z",
        },
        ],
      },
    },
  })
  @Get('/:email')
  findUser(@Param('email') email: string){
    return this.userService.findUser(email);
  }

  // @Param 방식 - 단일 유저 조회
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  findByUserOne2(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // @Param & @Body 혼합 방식 - 단일 유저 수정
  @UseGuards(JwtAuthGuard)
  @Patch('/user/:id')
  @UsePipes(ValidationPipe)
  setUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto : UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtRefreshAuthGuard)
  // @Query 방식 - 단일 유저 삭제
  @Delete('/delete_user')
  deleteUser(@Query('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
