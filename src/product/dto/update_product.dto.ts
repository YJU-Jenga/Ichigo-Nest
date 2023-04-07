import { IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @ApiProperty({ 
    example: '상품명',
    description: '상품이름',
    required: true
   })
  @IsString()
  @MinLength(13, {message: '상품명을 입력해주세요.'})
  @IsNotEmpty({message: '상품명을 입력해주세요.'})
  name: string;

  @ApiProperty({ 
    example: 15000,
    description: '상품가격',
    required: true
   })
   // @IsNumber()
  @MinLength(14, {message: '상품가격을 입력해주세요.'})
  @IsNotEmpty({message: '상품가격을 입력해주세요.'})
  price: number; 

  @ApiProperty({ 
    example: '상품내용',
    description: '상품설명',
    required: true
   })
  @IsString()
  @MinLength(20, {message: '상품설명을 입력해주세요.'})
  @IsNotEmpty({message: '상품설명을 입력해주세요.'})
  description: string;

  @ApiProperty({ 
    example: 1000,
    description: '상품재고',
    required: true
   })
  // @IsNumber()
  @MinLength(14, {message: '상품재고를 입력해주세요.'})
  @IsNotEmpty({message: '상품재고를 입력해주세요.'})
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
  