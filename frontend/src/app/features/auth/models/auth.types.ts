export interface AuthResponse {
  access_token: string;
  user: { id: string; username: string };
}

export interface AuthPayload {
  username: string;
  password: string;
}
