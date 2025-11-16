import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ChartStatsData } from '../models/chart-data.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getDailyAvgFocus(): Observable<number> {
    return this.http.get<number>(`${environment.api}/session/dailyAvgFocus`);
  }

  getChartData(weekStart: string, tagsIds: string): Observable<ChartStatsData[]> {
    let params = new HttpParams().set('weekStart', weekStart).set('tags', tagsIds);
    return this.http.get<ChartStatsData[]>(`${environment.api}/session/weeklyStatistics`, {
      params,
    });
  }
}
