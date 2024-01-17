import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dtos/create-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ) {}

  create(createListDto: CreateListDto) {
    return this.listRepository.save(createListDto);
  }
}
