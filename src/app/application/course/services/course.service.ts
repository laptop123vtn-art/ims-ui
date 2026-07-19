import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Course,
  CourseCreateCommand,
  CourseFilterQuery,
  CourseUpdateCommand,
} from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7058/api/Course';

  getAllByFilter(query: CourseFilterQuery): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.baseUrl}/GetAllByFilter`, query);
  }

  create(model: CourseCreateCommand): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/Create`, model);
  }

  update(model: CourseUpdateCommand): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/Update`, model);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/Delete`, {
      params: { id: id.toString() },
    });
  }
}
