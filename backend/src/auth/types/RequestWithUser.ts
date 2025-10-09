import { User } from 'src/users/entities/user.entity';

export interface RequestWithUser extends Express.Request {
  user: User;
}
