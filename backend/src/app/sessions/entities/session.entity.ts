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
  })
  tag: Tag; //OPCIONI

  //note

  //trajanje runde, broj rundi i pauza
  @Column('int')
  roundTime: number;

  @Column('int')
  repetitions: number;

  @Column('int')
  breakTime: number;

  @Column('timestamp') //datum i vreme pocetka sesije
  startTime: Date;

  @Column({
    type: 'enum',
    enum: SessionStatus,
  })
  sessionStatus: SessionStatus;

  //round 2/4 breaktime:10min sessionTime:50
  //currentRound, timeLeft rad, //PAUSED_WORK
  //currentRound, timeLeft pauza, //PAUSED_BREAK

  //pamtiti na svakih 10sek
  //koristiti za paused i early done
  @Column('int')
  currentRound: number;

  @Column('int')
  timeLeft: number; //u sekundama
}
//efikasno vreme je samo vreme u rundama, pauze ne racunati :)
