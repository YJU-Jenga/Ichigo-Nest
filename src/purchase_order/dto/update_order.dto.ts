import { IsNotEmpty, IsNumber, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDto {
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
    example: true,
    description: '注文状況',
    required: true
   })
  @IsNotEmpty()
  state: boolean;
}