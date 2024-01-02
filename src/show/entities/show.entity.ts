import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowCategory } from '../types/show-category.type';
import { Schedule } from './schedule.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';
import { MAX_PRICE } from 'src/constants/point.constant';

@Entity('shows')
export class Show {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /**
   * 공연명
   * @example "임영웅 콘서트 IM HERO TOUR 2023 - 고양"
   */
  @IsNotEmpty({ message: '공연명을 입력해 주세요.' })
  @IsString()
  @Column({ unique: true })
  title: string;

  /**
   * 공연 설명
   * @example "히어로와 영웅시대가 함께 떠나는 IM HERO TOUR"
   */
  @IsNotEmpty({ message: '공연 설명을 입력해 주세요.' })
  @IsString()
  @Column({ type: 'text' })
  description: string;

  /**
   * 카테고리
   * @example "Concert"
   */
  @IsNotEmpty({ message: '카테고리를 입력해 주세요.' })
  @IsEnum(ShowCategory)
  @Column({ type: 'enum', enum: ShowCategory })
  category: ShowCategory;

  /**
   * 장소
   * @example "킨텍스 1전시장 1홀"
   */
  @IsNotEmpty({ message: '장소를 입력해 주세요.' })
  @IsString()
  @Column()
  place: string;

  /**
   * 가격
   * @example 50000
   */
  @IsNotEmpty({ message: '가격을 입력해 주세요.' })
  @IsNumber()
  @Max(MAX_PRICE, { message: '공연 가격은 50,000 포인트를 넘을 수 없습니다.' })
  @Column()
  price: number;

  /**
   * 썸네일
   * @example "https://ticketimage.interpark.com/Play/image/large/23/23017919_p.gif"
   */
  @IsNotEmpty({ message: '썸네일을 입력해 주세요.' })
  @IsString()
  @Column()
  thumbnail: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.show, { cascade: true })
  schedules: Schedule[];
}
