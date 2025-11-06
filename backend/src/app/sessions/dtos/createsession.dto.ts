import { IsNumber, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsNumber()
  focusTime: number;

  @IsNumber()
  breakTime: number;

  @IsNumber()
  loops: number;

  @IsOptional()
  @IsNumber()
  tagId?: number;
}
