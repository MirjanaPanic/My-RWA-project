//povratni podaci
export interface AuthResponse {
  access_token: string;
  user: { id: string; username: string };
}

//ulazni podaci
export interface AuthPayload {
  username: string;
  password: string;
}
