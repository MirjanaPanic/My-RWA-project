import { UserDto } from '../dtos/user.dto';

export interface AuthState {
  user: UserDto | null; //id, username
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
