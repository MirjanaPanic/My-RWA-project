import { IsNumber } from 'class-validator';

export class CreateSessionDto {
  @IsNumber()
  focusTime: number;

  @IsNumber()
  breakTime: number;

  @IsNumber()
  loops: number;

  @IsNumber()
  tagId: number;
}
