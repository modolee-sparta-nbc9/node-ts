import { IsNotEmpty, IsString } from 'class-validator';
import { Card } from 'src/card/entities/card.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /**
   * 리스트 제목
   * @example "새 리스트"
   */
  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((types) => Card, (card) => card.list)
  cards: Card[];
}
