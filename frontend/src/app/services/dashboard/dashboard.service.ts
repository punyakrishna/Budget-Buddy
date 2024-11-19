import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:3434'; // Centralized base URL

  constructor(private http: HttpClient) { }

  // headers = new HttpHeaders().set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM4MzE1NTBmNmIwM2JlY2Q3MTBiNDkiLCJpYXQiOjE3MzE5OTc1MDYsImV4cCI6MTczMjA4MzkwNn0.zMWieeSG-2G1xDzMkiF3hEOSvsxP_d3JJar96AVXWOg`);


  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`)
    // .pipe(
    //   catchError((error) => {
    //     console.error('API Error:', error);
    //     return throwError(() => error); // Better error handling
    //   })
    // );
  }


}
