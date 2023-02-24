import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ 
    example: '상품명',
    description: '상품이름',
    required: true
   })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: 15000,
    description: '상품가격',
    required: true
   })
  // @IsNumber()
  @IsNotEmpty()
  price: number; 

  @ApiProperty({ 
    example: '상품내용',
    description: '상품설명',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    example: 1000,
    description: '상품재고',
    required: true
   })
  // @IsNumber()
  @IsNotEmpty()
  stock: number;
  
  @ApiProperty({ 
    example: true,
    description: '상품종류(남,녀)',
    required: true
   })
  // @IsBoolean()
  @IsNotEmpty()
  type: boolean;
}
  