//povratni podaci
export interface AuthResponse {
  access_token: string;
}

//ulazni podaci
export interface AuthPayload {
  username: string;
  password: string;
}
