import { IsNotEmpty, IsNumber, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
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
  adress: string;

  @ApiProperty({ 
    example: [1,2,3],
    description: '주문자 상품 고유 번호들',
    required: true
   })
  @IsNumber()
  @IsNotEmpty({each: true})
  productIds: number[];

  @ApiProperty({ 
    example: [2,1,2],
    description: '주문 상품의 개수들',
    required: true
   })
  @IsNumber()
  @IsNotEmpty({each: true})
  counts: number[];
}