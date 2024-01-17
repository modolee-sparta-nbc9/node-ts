import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dtos/create-show.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllShowDto } from './dtos/find-all-show.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/types/user-role.type';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('공연 정보')
@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /**
   * 공연 생성
   * @param createShowDto
   * @returns
   */
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
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
  async findAll(@Query() findAllShowDto: FindAllShowDto) {
    const data = await this.showService.findAll(findAllShowDto);

    return {
      statusCode: HttpStatus.OK,
      message: '공연 목록 조회에 성공했습니다.',
      data,
    };
  }

  /**
   * 공연 상세 조회
   * @param id
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.showService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: '공연 상세 조회에 성공했습니다.',
      data,
    };
  }
}
