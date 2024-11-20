import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import constants from '../../core/constants';
import { LoaderService } from '../loader.service';
import { IExpenseRequest } from '../../core/interfaces/expenseInterface';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient, private loadingService: LoaderService) { }

  getExpenses(): Observable<any> {
    this.loadingService.showLoading();

    return this.http.get(`${constants.baseURL}/expenses`).pipe(
      finalize(() => this.loadingService.hideLoading())
    );;
  }

  getCategories(): Observable<any> {
    return this.http.get(`${constants.baseURL}/categories`);
  }

  addExpense(reqBody: IExpenseRequest): Observable<any> {
    return this.http.post(`${constants.baseURL}/expense`, reqBody);
  }

  updateExpense(reqBody: IExpenseRequest, expenseId: string): Observable<any> {
    return this.http.put(`${constants.baseURL}/expense/${expenseId}`, reqBody);
  }

  deleteExpense(expenseId: string): Observable<any> {
    return this.http.delete(`${constants.baseURL}/expense/${expenseId}`);
  }
}
