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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    const data = await this.bookService.findAll(userId);

    return {
      statusCode: HttpStatus.OK,
      message: '예매 목록 조회에 성공했습니다.',
      data,
    };
  }

  /**
   * 예매 상세 조회
   * @param id
   * @returns
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    const userId = req.user.id;
    return this.bookService.findOne(id, userId);
  }
}
