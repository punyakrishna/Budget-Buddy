import { ISignupRequestBody } from './../../core/interfaces/authInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import constants from '../../core/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(reqBody: any): Observable<any> {
    return this.http.post(`${constants.baseURL}/login`, reqBody)
  }

  signup(reqBody: ISignupRequestBody): Observable<any> {
    return this.http.post(`${constants.baseURL}/signup`, reqBody)
  }
}
