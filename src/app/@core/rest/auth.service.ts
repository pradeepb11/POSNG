import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // baseUrl = 'http://localhost/pos-api/public/index.php/api/v1';
  baseUrl = 'https://testing.paynet.co.in/pos-api/public/index.php/api/v1';
  httpOptions: {};
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code: ' + error.status + ' body was: ' + error.message);
    }
    return throwError(
      'Something bad happened; please try again later.',
    );
  }

  login(data) {
    return this.http.post<any>(this.baseUrl + '/auth/login', data).pipe(
      retry(2),
      catchError(this.handleError),
    );
  }

  register(data) {
    return this.http.post<any>(this.baseUrl + '/auth/register', data).pipe(
      retry(2),
      catchError(this.handleError),
    );
  }
}
