import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShowDto } from './dtos/create-show.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Like, Repository } from 'typeorm';
import { FindAllShowDto } from './dtos/find-all-show.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show) private readonly showReporitory: Repository<Show>,
  ) {}

  async create(createShowDto: CreateShowDto) {
    const { schedules, seats, ...restOfShow } = createShowDto;

    const existedShow = await this.showReporitory.findOneBy({
      title: createShowDto.title,
    });

    if (existedShow) {
      throw new BadRequestException('이미 사용 중인 공연명입니다.');
    }

    const show = await this.showReporitory.save({
      ...restOfShow,
      schedules: schedules.map((schedule) => ({
        ...schedule,
        seat: {
          availableSeats: seats,
          totalSeats: seats,
        },
      })),
    });

    return show;
  }

  async findAll({ keyword, category }: FindAllShowDto) {
    const shows = await this.showReporitory.find({
      where: {
        ...(keyword && { title: Like(`%${keyword}%`) }),
        ...(category && { category }),
      },
    });

    return shows;
  }

  async findOne(id: number) {
    const show = await this.showReporitory.findOne({
      where: { id },
      relations: {
        schedules: {
          seat: true,
        },
      },
    });

    if (!show) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }

    return show;
  }
}
