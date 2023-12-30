import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Common')
@Controller()
export class AppController {
  @Get('/health-check')
  healthCheck(): string {
    return 'This server is healthy';
  }
}
