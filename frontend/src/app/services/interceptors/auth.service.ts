import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage or sessionStorage
    const authToken = localStorage.getItem('authToken'); // Or use sessionStorage
    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM4MzE1NTBmNmIwM2JlY2Q3MTBiNDkiLCJpYXQiOjE3MzE5OTc1MDYsImV4cCI6MTczMjA4MzkwNn0.zMWieeSG-2G1xDzMkiF3hEOSvsxP_d3JJar96AVXWOg"
    // Clone the request and add the Authorization header if the token exists
    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authReq); // Pass the modified request
    }

    return next.handle(req); // Pass the original request if no token
  }
}
