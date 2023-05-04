import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDeviceDto {
  @ApiProperty({ 
    example: '딸기인형1',
    description: '기기이름',
    required: true
   })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: '12:34:56:78:90:AB',
    description: '기기의 MAC주소',
    required: true
   })
  @IsNotEmpty()
  macAddress: string;
}
  

  
