import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Flower } from '../models/flower.model';

@Injectable({
  providedIn: 'root',
})
export class GardenService {
  constructor(private http: HttpClient) {}

  getCompletedSessions(): Observable<number> {
    return this.http.get<number>(`${environment.api}/session/completedSessions`);
  }

  getAllFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(`${environment.api}/garden/flowers`);
  }

  addNewFlower(x: number, y: number): Observable<Flower> {
    return this.http.post<Flower>(`${environment.api}/garden/newFlower`, {
      x,
      y,
    });
  }
}
