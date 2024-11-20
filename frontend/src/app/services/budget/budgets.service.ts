import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import constants from '../../core/constants';
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  constructor(private http: HttpClient, private loadingService: LoaderService) { }

  getBudgets(): Observable<any> {
    this.loadingService.showLoading();

    return this.http.get(`${constants.baseURL}/budgets`).pipe(
      finalize(() => this.loadingService.hideLoading())
    );;
  }

  getCategories(): Observable<any> {
    return this.http.get(`${constants.baseURL}/categories`);
  }

  addBudget(reqBody: any): Observable<any> {
    return this.http.post(`${constants.baseURL}/budget`, reqBody);
  }

  updateBudget(reqBody: any, budgetId: string): Observable<any> {
    return this.http.put(`${constants.baseURL}/budget/${budgetId}`, reqBody);
  }

  deleteBudget(budgetId: string): Observable<any> {
    return this.http.delete(`${constants.baseURL}/budget/${budgetId}`);
  }
}
