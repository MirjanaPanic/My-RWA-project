import { IsEnum, IsNumber } from 'class-validator';
import { SessionStatus } from '../models/session.status';

export class UpdateSessionDto {
  @IsEnum(SessionStatus)
  status: SessionStatus;

  @IsNumber()
  timeLeft: number;
}
