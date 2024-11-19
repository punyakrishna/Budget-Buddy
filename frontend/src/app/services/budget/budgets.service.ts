import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private baseUrl = 'http://localhost:3434';

  constructor(private http: HttpClient) {}

  getBudgets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/budgets`);
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
