import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../../../pages/settings/models/tag.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
//ili posebno za tag i messages service
export class TimerService {
  constructor(private http: HttpClient) {}

  getMatchingTags(input: string): Observable<Tag[]> {
    const params = new HttpParams().set('input', input);
    return this.http.get<Tag[]>(`${environment.api}/tags/search`, { params });
  }
}
