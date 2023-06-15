import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @ApiProperty({ 
    example: 'くまさん',
    description: '商品名',
    required: true
   })
  @IsString()
  @MinLength(12, {message: '商品名を記入してください。'}) // フロントエンドで JSON.stringify({ name: form.name })してデータを送るので実際のデータが空いているか確認
  @IsNotEmpty({message: '商品名を記入してください。'})
  name: string;

  @ApiProperty({ 
    example: 15000,
    description: '商品価格',
    required: true
   })
  @MinLength(11, {message: '商品価格を記入してください。'}) // フロントエンドで JSON.stringify({ price: form.price })してデータを送るので実際のデータが空いているか確認
  @IsNotEmpty({message: '商品価格を記入してください。'})
  price: number; 

  @ApiProperty({ 
    example: 'かわいいくまさん',
    description: '商品の説明',
    required: true
   })
  @IsString()
  @MinLength(19, {message: '商品の説明を記入してください。'}) // フロントエンドで JSON.stringify({ description: form.description })してデータを送るので実際のデータが空いているか確認
  @IsNotEmpty({message: '商品の説明を記入してください。'})
  description: string;

  @ApiProperty({ 
    example: 1000,
    description: '商品の在庫',
    required: true
   })
  @MinLength(11, {message: '商品の在庫を記入してください。'}) // フロントエンドで JSON.stringify({ stock: form.stock })してデータを送るので実際のデータが空いているか確認
  @IsNotEmpty({message: '商品の在庫を記入してください。'})
  stock: number;
  
  @ApiProperty({ 
    example: true,
    description: '商品種類(男・女)',
    required: true
   })
  @IsNotEmpty()
  type: boolean;
}
  