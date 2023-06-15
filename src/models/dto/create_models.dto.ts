import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateModelsDto {
  @ApiProperty({ 
    example: 1,
    description: '商品のid',
    required: true
   })
  @IsNotEmpty({message: '商品を選んでください。'})
  productId: number;

  @ApiProperty({ 
    example: 'くまさんの3Dモデル',
    description: '人形の3Dモデルの名前',
    required: true
  })
  @IsNotEmpty({message: '3Dモデルの名前を記入してください。'})
  name: string;
}
  

  
