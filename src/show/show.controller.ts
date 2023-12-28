import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dtos/create-show.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('공연 정보')
@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /**
   * 공연 생성
   * @param createShowDto
   * @returns
   */
  @Post()
  async create(@Body() createShowDto: CreateShowDto) {
    const data = await this.showService.create(createShowDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: '공연 생성에 성공했습니다.',
      data,
    };
  }

  /**
   * 공연 목록 조회 (검색)
   * @returns
   */
  @Get()
  findAll() {
    return this.showService.findAll();
  }

  /**
   * 공연 상세 조회
   * @param id
   * @returns
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showService.findOne(+id);
  }
}
