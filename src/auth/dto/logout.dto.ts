import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class LogOutDto {
  @ApiProperty({
    example: true,
    description: '로그아웃',
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  ok: boolean;
}