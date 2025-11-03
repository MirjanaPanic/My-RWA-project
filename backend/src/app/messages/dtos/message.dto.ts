import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  text: string;
}
