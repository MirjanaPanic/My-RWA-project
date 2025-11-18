import { Tag } from 'src/app/tags/entities/tag.entity';
import { User } from 'src/app/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SessionStatus } from '../models/session.status';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Tag, (tag) => tag.sessions, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  tag?: Tag;

  @Column('int')
  roundTime: number;

  @Column('int')
  repetitions: number;

  @Column('int')
  breakTime: number;

  @Column('timestamp')
  startTime: Date;

  @Column({
    type: 'enum',
    enum: SessionStatus,
  })
  sessionStatus: SessionStatus;

  @Column('int')
  currentRound: number;

  @Column('int')
  timeLeft: number; //u sekundama
}
