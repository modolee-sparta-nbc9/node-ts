import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { List } from 'src/list/entities/list.entity';
import { CardService } from './card.service';
import { CardController } from './card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Card, List])],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
