import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAddedProductDto {
  @ApiProperty({ 
    example: 1,
    description: '商品の固有ID',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  productId: number; 

  @ApiProperty({ 
    example: 1,
    description: '商品の数',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
  