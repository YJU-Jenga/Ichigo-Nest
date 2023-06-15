import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateClothesDto {
  @ApiProperty({ 
    example: 1,
    description: '商品のid',
    required: true
   })
  @IsNotEmpty({message: '商品を選んでください。'})
  productId: number;

  @ApiProperty({ 
    example: 'Tシャツ',
    description: '人形の服の名前',
    required: true
  })
  @IsNotEmpty({message: '服の名前を記入してください。'})
  name: string;
}
  

  
