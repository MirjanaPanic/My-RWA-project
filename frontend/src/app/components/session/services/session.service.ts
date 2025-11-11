import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../models/session.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SessionStatus } from '../models/session.status';

@Injectable({
  providedIn: 'root',
})
//ili posebno za tag i messages service
export class SessionService {
  constructor(private http: HttpClient) {}

  createNewSession(
    focusTime: number,
    breakTime: number,
    loops: number,
    tagId?: number
  ): Observable<Session> {
    return this.http.post<Session>(`${environment.api}/session/new`, {
      focusTime,
      breakTime,
      loops,
      tagId,
    });
  }

  pausedWorkUpdate(id: number, timeLeft: number, status: SessionStatus): Observable<Session> {
    return this.http.patch<Session>(`${environment.api}/session/pausedWork/${id}`, {
      timeLeft,
      status,
    });
  }

  continueSession(id: number, status: SessionStatus): Observable<Session> {
    return this.http.patch<Session>(`${environment.api}/session/continue/${id}`, {
      status,
    });
  }
}
