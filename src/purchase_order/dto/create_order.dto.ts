import { IsNotEmpty, IsNumber, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


/**
 * @author ckcic
 * @description 商品のオプションDTO
 */
class ProductOptionDto {
  @ApiProperty({ 
    example: 1,
    description: '注文した商品のID',
    required: true
   })
  @IsNotEmpty({each: true})
  productId: number;

  @ApiProperty({ 
    example: [1,2,3],
    description: '商品オプションのid配列',
    required: true
   })
  @IsNotEmpty({each: true})
  clothesIds: number[];
  
  @ApiProperty({ 
    example: ["ff4040","FF0000","FF3366"],
    description: '人形の服のカラーコード配列',
    required: true
   })
  @IsNotEmpty({each: true})
  colors: string[];

  @ApiProperty({ 
    example: [2,1,2],
    description: '注文した商品のオプションの数配列',
    required: true
   })
  @IsNotEmpty({each: true})
  optionCounts: number[];
}


/**
 * @author ckcic
 * @description 注文作成DTO
 */
export class CreateOrderDto {
  @ApiProperty({ 
    example: 1,
    description: 'ユーザーの固有id',
    required: true
   })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ 
    example: '12345',
    description: '注文者の郵便番号',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ 
    example: '東京都中央区~~~',
    description: '注文者の住所',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ 
    example: [1,2,3],
    description: '注文した商品の固有id配列',
    required: true
   })
  @IsNotEmpty({each: true})
  productIds: number[];

  @ApiProperty({ 
    example: [2,1,2],
    description: '注文した商品の数配列',
    required: true
   })
  @IsNotEmpty({each: true})
  counts: number[];

  @ApiProperty({ 
    example: [
      { productId: 1, clothesIds: [1,2,3], colors: ['ff4040', 'FF0000', 'FF3366'], optionCounts: [2, 1, 1] },
      { productId: 2, clothesIds: [4,5,6], colors: ['ff4040', 'FF0000', 'FF3366'], optionCounts: [2, 1, 1] },
      { productId: 3, clothesIds: [7,8,9], colors: ['ff4040', 'FF0000', 'FF3366'], optionCounts: [2, 1, 1] }
    ],
    description: '商品のオプションの配列',
    required: true
   })
  @IsNotEmpty({ each: true })
  productOptions: ProductOptionDto[];
}