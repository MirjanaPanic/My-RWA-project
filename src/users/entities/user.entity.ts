import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//mapira se na tabelu u bazi
@Entity('users')
export class User {
  @PrimaryGeneratedColumn() //auto-increment
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;
}
