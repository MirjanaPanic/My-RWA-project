import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Tag } from '../../settings/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getDailyAvgFocus(): Observable<number> {
    return this.http.get<number>(`${environment.api}/session/dailyAvgFocus`);
  }

   getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.api}/session/tags`);
  }
}
