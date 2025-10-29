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
    const token = localStorage.getItem('access_token'); //string or null
    // dupla negacija:
    // !string je false !!string je true ->postoji token
    // !null je true !!null je false ->ne postoji token
    return !!token; //ako postoji token, vraca true
  }
}
