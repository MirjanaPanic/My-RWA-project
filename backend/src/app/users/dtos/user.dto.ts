//kad neko salje post zahtev, pa u body stavlja parametre
//definisemo sta sve moze da stigne

import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long.' })
  @MaxLength(30, { message: 'Username cannot exceed 30 characters.' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(100, { message: 'Password cannot exceed 100 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'Password must contain at least one uppercase, one lowercase letter, and one special character.',
  })
  password: string;
}
