import { IsNotEmpty, IsNumber } from 'class-validator';
import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  userId: number;

  /**
   * 공연회차 ID
   * @example 1
   */
  @IsNumber()
  @IsNotEmpty({ message: '공연회차 ID를 입력해 주세요.' })
  @Column({ unsigned: true })
  scheduleId: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.books, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne((type) => Schedule, { onDelete: 'CASCADE' })
  schedule: Schedule;
}
