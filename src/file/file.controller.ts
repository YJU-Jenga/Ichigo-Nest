import { Controller, Get, Param } from '@nestjs/common';

@Controller('file')
export class FileController {
  constructor(){}
  
  @Get('/:url')
  async fileLoad (@Param('url') url: string) {
    return 
  }
  
}
