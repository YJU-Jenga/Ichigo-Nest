import { IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductWithOptionDto {
  @ApiProperty({ 
    example: 1,
    description: 'ユーザーのカートの固有ID',
    required: true
   })
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

  @ApiProperty({ 
    example: 1,
    description: '商品の数',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ 
    example: [1,2,3],
    description: '商品の服(オプション)のid配列',
    required: true
   })
  @IsOptional()
  clothesIds: number[];

  @ApiProperty({ 
    example: ["ff4040","FF0000","FF3366"],
    description: '人形の服のカラーコード配列',
    required: true
   })
  @IsOptional()
  colors: string[];

  @ApiProperty({ 
    example: [1,2,3],
    description: '注文した商品のオプションの数配列',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  counts: number[];
}
  