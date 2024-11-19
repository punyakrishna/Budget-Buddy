import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3434'; // Centralized base URL

  login(reqBody: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, reqBody)
    // .pipe(
    //   catchError((error) => {
    //     console.error('API Error:', error);
    //     return throwError(() => error); // Better error handling
    //   })
    // );
  }
}
