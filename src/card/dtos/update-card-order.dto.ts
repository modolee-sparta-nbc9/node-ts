import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCardOrderDto {
  /**
   * 이전 카드 ID
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  prevCardId?: number;

  /**
   * 다음 카드 ID
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  nextCardId?: number;
}
