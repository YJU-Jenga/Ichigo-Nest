import { IsNotEmpty, IsNumber, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDto {
  @ApiProperty({ 
    example: 1,
    description: '주문자 고유 아이디',
    required: true
   })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ 
    example: '12345',
    description: '주문자 우편번호',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ 
    example: '경기도 ~~~',
    description: '주문자 주소',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ 
    example: true,
    description: '주문자 상태',
    required: true
   })
  @IsNotEmpty()
  state: boolean;
}