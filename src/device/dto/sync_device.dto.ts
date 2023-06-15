import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SyncDeviceDto {
  @ApiProperty({ 
    example: '12:34:56:78:90:AB',
    description: 'デバイスのMACアドレス',
    required: true
   })
  @IsNotEmpty()
  macAddress: string;

  @ApiProperty({ 
    example: '1',
    description: '連動するユーザーのid',
   })
  @IsOptional()
  userId: number|null;
}
  

  
