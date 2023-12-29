import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/types/user-role.type';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('예매 정보')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * 예매하기
   * @param createBookDto
   * @returns
   */
  @ApiBearerAuth()
  @Roles(UserRole.Customer)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Request() req, @Body() createBookDto: CreateBookDto) {
    const userId = req.user.id;
    const data = await this.bookService.create(userId, createBookDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: '예매에 성공했습니다.',
      data,
    };
  }

  /**
   * 예매 목록 조회
   * @returns
   */
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  /**
   * 예매 상세 조회
   * @param id
   * @returns
   */
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }
}
