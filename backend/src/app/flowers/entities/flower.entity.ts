import { User } from 'src/app/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//mapira se na tabelu u bazi
@Entity('flowers')
export class Flower {
  @PrimaryGeneratedColumn() //auto-increment
  id: number;

  @Column({ type: 'float' })
  x: number;

  @Column({ type: 'float' })
  y: number;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
  })
  user: User;
}
