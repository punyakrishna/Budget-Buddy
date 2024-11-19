import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private baseUrl = 'http://localhost:3434';

  constructor(private http: HttpClient) { }

  getBudgets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/budgets`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  addBudget(reqBody: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/budget`, reqBody);
  }

  updateBudget(reqBody: any, budgetId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/budget/${budgetId}`, reqBody);
  }

  deleteBudget(budgetId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/budget/${budgetId}`);
  }
}
