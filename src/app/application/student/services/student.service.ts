import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, StudentFilterQuery } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7058/api/Student';

  getAllByFilter(query: StudentFilterQuery): Observable<Student[]> {
    return this.http.post<Student[]>(`${this.baseUrl}/GetAllByFilter`, query);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/Delete`, {
      params: { id: id.toString() },
    });
  }
}
