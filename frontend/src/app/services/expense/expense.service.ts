import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl = 'http://localhost:3434';

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/expenses`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  addExpense(reqBody: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/expense`, reqBody);
  }

  updateExpense(reqBody: any, expenseId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/expense/${expenseId}`, reqBody);
  }

  deleteExpense(expenseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/expense/${expenseId}`);
  }
}
