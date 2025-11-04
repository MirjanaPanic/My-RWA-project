import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  text: string;
}
