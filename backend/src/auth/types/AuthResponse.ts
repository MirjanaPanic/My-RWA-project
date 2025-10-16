export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
  };
}
