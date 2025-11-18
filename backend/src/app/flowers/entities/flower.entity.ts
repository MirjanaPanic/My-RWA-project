import { User } from 'src/app/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flowers')
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  x: number;

  @Column({ type: 'float' })
  y: number;

  @ManyToOne(() => User, (user) => user.flowers, {
    onDelete: 'CASCADE',
  })
  user: User;
}
