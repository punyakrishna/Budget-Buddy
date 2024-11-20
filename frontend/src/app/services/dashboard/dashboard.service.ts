import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import constants from '../../core/constants';
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private http: HttpClient, private loadingService: LoaderService) { }

  getData(): Observable<any> {
    this.loadingService.showLoading();
    return this.http.get(`${constants.baseURL}/dashboard`).pipe(
      finalize(() => this.loadingService.hideLoading())
    );;

  }
}
