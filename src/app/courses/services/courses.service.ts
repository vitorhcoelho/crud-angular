import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private readonly API = 'http://localhost:8080/api/courses';
  // buscar solucao usando proxy config
  private readonly API = 'api/courses';

  constructor(
    private httpClient: HttpClient
  ) { }

  listCourses() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      tap(courses => console.log(courses))
    );
  }
}
