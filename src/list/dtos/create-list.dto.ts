import { PickType } from '@nestjs/swagger';
import { List } from '../entities/list.entity';

export class CreateListDto extends PickType(List, ['title']) {}
