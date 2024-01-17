import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { UpdateCardOrderDto } from './dtos/update-card-order.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { LexoRank } from 'lexorank';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}

  async create({ listId }: CreateCardDto) {
    const firstCard = await this.cardRepository.findOne({
      where: { listId },
      order: { lexoRank: 'ASC' },
    });

    let lexoRank: LexoRank;
    if (firstCard) {
      const firstCardRank = LexoRank.parse(firstCard.lexoRank);
      lexoRank = firstCardRank.genPrev();
    } else {
      lexoRank = LexoRank.middle();
    }

    return this.cardRepository.save({ listId, lexoRank: lexoRank.toString() });
  }

  findAll() {
    return this.cardRepository.find({ order: { lexoRank: 'ASC' } });
  }

  async updateOrder(
    id: number,
    { prevCardId, nextCardId }: UpdateCardOrderDto,
  ) {
    let prevCard: Card;
    let prevCardRank: LexoRank;
    let nextCard: Card;
    let nextCardRank: LexoRank;
    let currentCardRank: LexoRank;

    const currentCard = await this.cardRepository.findOneBy({ id });
    if (!currentCard) {
      throw new BadRequestException('선택한 카드가 없습니다.');
    }

    if (prevCardId) {
      prevCard = await this.cardRepository.findOneBy({ id: prevCardId });

      if (!prevCard) {
        throw new BadRequestException('이동하려는 위치를 찾을 수 없습니다.');
      }

      prevCardRank = LexoRank.parse(prevCard.lexoRank);
    }
    if (nextCardId) {
      nextCard = await this.cardRepository.findOneBy({ id: nextCardId });

      if (!nextCard) {
        throw new BadRequestException('이동하려는 위치를 찾을 수 없습니다.');
      }

      nextCardRank = LexoRank.parse(nextCard.lexoRank);
    }

    if (prevCard && nextCard) {
      // 중간에 끼어 있는 경우
      currentCardRank = prevCardRank.between(nextCardRank);
    } else if (prevCard) {
      // 맨 마지막 위치
      currentCardRank = prevCardRank.genNext();
    } else if (nextCard) {
      // 맨 앞 위치
      currentCardRank = nextCardRank.genPrev();
    }

    return this.cardRepository.save({
      id,
      lexoRank: currentCardRank.toString(),
    });
  }
}
