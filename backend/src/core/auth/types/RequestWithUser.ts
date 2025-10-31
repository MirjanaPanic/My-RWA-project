import { JwtUser } from './JwtUser';

export interface RequestWithUser extends Express.Request {
  user: JwtUser;
}
