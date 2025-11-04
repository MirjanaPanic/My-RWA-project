import { User } from 'src/app/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//mapira se na tabelu u bazi
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn() //auto-increment
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  text: string;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
  })
  user: User;
}
