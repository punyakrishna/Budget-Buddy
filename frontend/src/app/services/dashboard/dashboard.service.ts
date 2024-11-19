import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:3434';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`);
    // .pipe(
    //   catchError((error) => {
    //     console.error('API Error:', error);
    //     return throwError(() => error); // Better error handling
    //   })
    // );
  }
}
