import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateModelsDto {
  @ApiProperty({ 
    example: 1,
    description: '상품아이디',
    required: true
   })
  @IsNotEmpty({message: '상품정보가 비어있습니다.'})
  productId: number;

  @ApiProperty({ 
    example: '테드 모델',
    description: '인형 3d 모델 이름',
    required: true
  })
  @IsNotEmpty({message: '파일의 이름을 적어 주세요'})
  name: string;
}
  

  
