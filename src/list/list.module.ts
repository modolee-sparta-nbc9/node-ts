import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Card } from 'src/card/entities/card.entity';
import { ListService } from './list.service';
import { ListContrller } from './list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([List, Card])],
  providers: [ListService],
  controllers: [ListContrller],
})
export class ListModule {}
