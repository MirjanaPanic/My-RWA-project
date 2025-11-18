import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.api}/messages/all`);
  }

  updateMessage(id: number, text: string) {
    return this.http.put(`${environment.api}/messages/update/${id}`, { text });
  }

  deleteMessage(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.api}/messages/delete/${id}`);
  }

  addNewMessage(text: string): Observable<Message> {
    return this.http.post<Message>(`${environment.api}/messages/new`, { text });
  }
}
