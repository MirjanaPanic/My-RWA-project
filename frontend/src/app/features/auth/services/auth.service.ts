import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, AuthPayload } from '../models/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.api}/auth/login`, credentials);
  }

  register(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.api}/auth/register`, payload);
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    if (this.isTokenExpired()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (!payload.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp < currentTime;
    } catch (e) {
      return true;
    }
  }
}
