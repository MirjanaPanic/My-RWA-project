import { Flower } from 'src/app/flowers/entities/flower.entity';
import { Message } from 'src/app/messages/entities/message.entity';
import { Session } from 'src/app/sessions/entities/session.entity';
import { Tag } from 'src/app/tags/entities/tag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//mapira se na tabelu u bazi
@Entity('users')
export class User {
  @PrimaryGeneratedColumn() //auto-increment
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  //lista poruka
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Flower, (flower) => flower.user)
  flowers: Flower[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
