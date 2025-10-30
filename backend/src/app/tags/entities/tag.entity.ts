import { Session } from 'src/app/sessions/entities/session.entity';
import { User } from 'src/app/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//mapira se na tabelu u bazi
@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn() //auto-increment
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @ManyToOne(() => User, (user) => user.tags, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Session, (session) => session.tag)
  sessions: Session[];
}
