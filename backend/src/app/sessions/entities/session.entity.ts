import { Tag } from 'src/app/tags/entities/tag.entity';
import { User } from 'src/app/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//mapira se na tabelu u bazi
@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn() //auto-increment
  id: number;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Tag, (tag) => tag.sessions, {
    onDelete: 'CASCADE',
  })
  tag: Tag;

  //trajanje runde, broj rundi i pauza
  @Column('int')
  roundTime: number;

  @Column('int')
  repetitions: number;

  @Column('int')
  breakTime: number;
}
