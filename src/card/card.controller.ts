import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardService } from './card.service';
import { UpdateCardOrderDto } from './dtos/update-card-order.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('카드')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  /**
   * 카드 생성
   * @param createCardDto
   * @returns
   */
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  /**
   * 카드 목록 조회
   * @returns
   */
  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  /**
   * 카드 순서 변경
   * @param id
   * @param updateCardOrderDto
   * @returns
   */
  @Put(':id/order')
  updateOrder(
    @Param('id') id: number,
    @Body() updateCardOrderDto: UpdateCardOrderDto,
  ) {
    const { prevCardId, nextCardId } = updateCardOrderDto;
    if (!prevCardId && !nextCardId) {
      throw new BadRequestException(
        'prevCardId, nextCardId 둘 중 하나를 있어야 합니다.',
      );
    }

    return this.cardService.updateOrder(id, updateCardOrderDto);
  }
}
