import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './entities/book.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Seat } from 'src/show/entities/seat.entity';
import { Schedule } from 'src/show/entities/schedule.entity';

@Injectable()
export class BookService {
  constructor(private readonly dataSource: DataSource) {}

  async create(userId: number, { scheduleId }: CreateBookDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 공연 회차정보 조회
      const schedule = await queryRunner.manager.findOne(Schedule, {
        where: { id: scheduleId },
        relations: {
          show: true,
        },
      });

      if (!schedule) {
        throw new NotFoundException('공연 회차 정보가 없습니다.');
      }

      // 예매 내역 생성
      const book = await queryRunner.manager.save(Book, {
        userId,
        scheduleId,
      });

      // 포인트 차감 -> show 가격 정보
      const price = schedule.show.price;
      const user = await queryRunner.manager.findOneBy(User, { id: userId });
      user.points = user.points - price;
      await queryRunner.manager.save(User, user);

      // 좌석 개수 줄이기
      const seat = await queryRunner.manager.findOneBy(Seat, { scheduleId });
      seat.availableSeats -= 1;
      await queryRunner.manager.save(Seat, seat);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return book;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.error(err);
      throw err;
    }
  }

  async findAll() {
    return `This action returns all book`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} book`;
  }
}
