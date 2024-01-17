import { IsNotEmpty, IsNumber } from 'class-validator';
import { List } from 'src/list/entities/list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /**
   * 리스트 ID
   * @example 1
   */
  @IsNotEmpty()
  @IsNumber()
  @Column({ unsigned: true })
  listId: number;

  @Column({ unique: true })
  lexoRank: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => List, (list) => list.cards)
  list: List;
}
