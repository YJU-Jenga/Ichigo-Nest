import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAddedProductDto {
  @ApiProperty({ 
    example: 1,
    description: '상품 고유 아이디',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  productId: number; 

  @ApiProperty({ 
    example: 1,
    description: '상품 개수',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
  