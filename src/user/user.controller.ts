import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from '../model/entity/user.entity';

@Controller('user')
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
  
  // 유저 생성
  @Post('/create_user')
  @UsePipes(ValidationPipe)
  async onCreateUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.craeteUser(createUserDto);
  }

  // 전체 유저 조회
  @Get('/user_all')
  getUserAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @Query 방식 - 단일 유저 조회
  @Get('/user')
  findByUserOne1(@Query('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // @Param 방식 - 단일 유저 조회
  @Get('/user/:id')
  findByUserOne2(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // @Param & @Body 혼합 방식 - 단일 유저 수정
  @Patch('/user/:id')
  @UsePipes(ValidationPipe)
  setUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto : UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, updateUserDto);
  }

  // @Query 방식 - 단일 유저 삭제
  @Delete('/delete_user')
  deleteUser(@Query('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

}
