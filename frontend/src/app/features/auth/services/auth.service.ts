import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccessTokenResponse, RegisterPayload } from '../../../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/auth/login`, credentials);
  }

  //register
  register(payload: RegisterPayload): Observable<AccessTokenResponse> {
    return this.http.post<AccessTokenResponse>(`${this.apiUrl}/auth/register`, payload);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
