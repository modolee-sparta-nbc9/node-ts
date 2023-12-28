import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  scheduleId: number;

  @Column({ unsigned: true })
  availableSeats: number;

  @Column({ unsigned: true })
  totalSeats: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => Schedule, (schedule) => schedule.seat)
  @JoinColumn()
  schedule: Schedule;
}
