import { IsNotEmpty, IsNumber, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class ProductOptionDto {
  @ApiProperty({ 
    example: 1,
    description: '주문 상품의 아이디',
    required: true
   })
  @IsNotEmpty({each: true})
  productId: number;

  @ApiProperty({ 
    example: [1,2,3],
    description: '주문 상품 옵션의 아이디들',
    required: true
   })
  @IsNotEmpty({each: true})
  clothesIds: number[];
  
  @ApiProperty({ 
    example: ["ff4040","FF0000","FF3366"],
    description: '주문 상품 옵션의 색들',
    required: true
   })
  @IsNotEmpty({each: true})
  colors: string[];

  @ApiProperty({ 
    example: [2,1,2],
    description: '주문 상품 옵션의 개수들',
    required: true
   })
  // @IsNumber()
  @IsNotEmpty({each: true})
  optionCounts: number[];
}

export class CreateOrderDto {
  @ApiProperty({ 
    example: 1,
    description: '주문자 고유 아이디',
    required: true
   })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ 
    example: '12345',
    description: '주문자 우편번호',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ 
    example: '경기도 ~~~',
    description: '주문자 주소',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ 
    example: [1,2,3],
    description: '주문자 상품 고유 번호들',
    required: true
   })
  // @IsNumber()
  @IsNotEmpty({each: true})
  productIds: number[];

  @ApiProperty({ 
    example: [2,1,2],
    description: '주문 상품의 개수들',
    required: true
   })
  // @IsNumber()
  @IsNotEmpty({each: true})
  counts: number[];

  @ApiProperty({ 
    example: [
      { productId: 1, clothesIds: [1,2,3], colors: ['ff4040', 'FF0000', 'FF3366'], optionCounts: [2, 1, 1] },
      { productId: 2, clothesIds: [4,5,6], colors: ['ff4040', 'FF0000', 'FF3366'], optionCounts: [2, 1, 1] },
      { productId: 3, clothesIds: [7,8,9], colors: ['ff4040', 'FF0000', 'FF3366'], optionCounts: [2, 1, 1] }
    ],
    description: '주문 상품 옵션들',
    required: true
   })
  @IsNotEmpty({ each: true })
  productOptions: ProductOptionDto[];

  // @ApiProperty({ 
  //   example: [1,2,3],
  //   description: '주문 상품 옵션의 아이디들',
  //   required: true
  //  })
  // @IsNotEmpty({each: true})
  // clothesIds: number[];
  
  // @ApiProperty({ 
  //   example: ["ff4040","FF0000","FF3366"],
  //   description: '주문 상품 옵션의 색들',
  //   required: true
  //  })
  // @IsNotEmpty({each: true})
  // colors: string[];

  // @ApiProperty({ 
  //   example: [2,1,2],
  //   description: '주문 상품 옵션의 개수들',
  //   required: true
  //  })
  // // @IsNumber()
  // @IsNotEmpty({each: true})
  // optionCounts: number[];
}