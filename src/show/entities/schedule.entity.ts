import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Show } from './show.entity';
import { Seat } from './seat.entity';
import { IsDateString, IsMilitaryTime, IsNotEmpty } from 'class-validator';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  showId: number;

  /**
   * 공연 날짜
   * @example "2024-01-19"
   */
  @IsNotEmpty({ message: '공연 날짜를 입력해 주세요.' })
  @IsDateString()
  @Column({ type: 'date' })
  date: Date;

  /**
   * 공연 시간
   * @example "19:30"
   */
  @IsNotEmpty({ message: '공연 시간을 입력해 주세요.' })
  @IsMilitaryTime()
  @Column({ type: 'time' })
  time: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => Show, (show) => show.schedules, { onDelete: 'CASCADE' })
  show: Show;

  @OneToOne((type) => Seat, (seat) => seat.schedule, { cascade: true })
  seat: Seat;
}
