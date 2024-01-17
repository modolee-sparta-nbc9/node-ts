import { Body, Controller, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dtos/create-list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('리스트')
@Controller('lists')
export class ListContrller {
  constructor(private readonly listService: ListService) {}

  /**
   * 리스트 생성
   * @param createListDto
   * @returns
   */
  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }
}
