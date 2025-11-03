import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
//ili posebno za tag i messages service
export class TagsService {
  constructor(private http: HttpClient) {}

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.api}/tags/all`);
  }

  deleteTag(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.api}/tags/delete/${id}`);
  }

  addNewTag(name: string): Observable<Tag> {
    return this.http.post<Tag>(`${environment.api}/tags/new`, { name });
  }

  updateTag(id: number, name: string) {
    return this.http.put(`${environment.api}/tags/update/${id}`, { name });
  }
}
