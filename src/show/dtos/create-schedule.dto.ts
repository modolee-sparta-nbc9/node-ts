import { PickType } from '@nestjs/swagger';
import { Schedule } from '../entities/schedule.entity';

export class CreateScheduleDto extends PickType(Schedule, ['date', 'time']) {}
