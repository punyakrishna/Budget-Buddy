import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl = 'http://localhost:3434';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/expenses`);
    // .pipe(
    //   catchError((error) => {
    //     console.error('API Error:', error);
    //     return throwError(() => error); // Better error handling
    //   })
    // );
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
    // .pipe(
    //   catchError((error) => {
    //     console.error('API Error:', error);
    //     return throwError(() => error); // Better error handling
    //   })
    // );
  }
}
