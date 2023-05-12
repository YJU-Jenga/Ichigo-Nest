import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateClothesDto {
  @ApiProperty({ 
    example: 1,
    description: '상품아이디',
    required: true
   })
  @IsNotEmpty({message: '상품아이디가 비어있습니다.'})
  productId: number;

  @ApiProperty({ 
    example: '면티',
    description: '인형 옷 이름',
    required: true
  })
  @IsNotEmpty({message: '파일의 이름을 적어 주세요'})
  name: string;
}
  

  
