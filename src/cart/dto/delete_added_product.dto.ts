import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteAddedProductDto {
  @ApiProperty({ 
    example: 1,
    description: 'ユーザーのカートの固有ID',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  cartId: number; 

  @ApiProperty({ 
    example: 1,
    description: '商品の固有ID',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
  