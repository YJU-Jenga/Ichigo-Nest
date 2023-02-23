import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteAddedProductDto {
  @ApiProperty({ 
    example: 1,
    description: '장바구니 고유 아이디',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  cartId: number; 

  @ApiProperty({ 
    example: 1,
    description: '상품 고유 아이디',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
  