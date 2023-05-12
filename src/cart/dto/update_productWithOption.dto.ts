import { IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductWithOptionDto {
  @ApiProperty({ 
    example: 1,
    description: '유저의 장바구니 고유 아이디',
    required: true
   })
  @IsNotEmpty()
  cartId: number;

  @ApiProperty({ 
    example: 1,
    description: '상품 고유 아이디',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  productId: number; 

  @ApiProperty({ 
    example: 1,
    description: '상품 개수',
    required: true
   })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ 
    example: [1,2,3],
    description: '주문 상품의 옷 번호들',
    required: true
   })
  @IsOptional()
  clothesIds: number[];

  @ApiProperty({ 
    example: ["ff4040","FF0000","FF3366"],
    description: '옷들의 색들',
    required: true
   })
  @IsOptional()
  colors: string[];
}
  