import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SyncDeviceDto {
  @ApiProperty({ 
    example: '12:34:56:78:90:AB',
    description: '기기의 MAC주소',
    required: true
   })
  @IsNotEmpty()
  macAddress: string;

  @ApiProperty({ 
    example: '1',
    description: '연동하는 유저의 아이디',
   })
  @IsOptional()
  userId: number|null;
}
  

  
