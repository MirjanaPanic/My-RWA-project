import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "../models/message.model";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
//ili posebno za tag i messages service
export class MessagesService {
  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.api}/messages/all`);
  }
}
