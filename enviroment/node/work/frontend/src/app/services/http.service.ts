import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly HOST_URL: string = 'http://' + window.location.host;
  readonly API_URL: string = this.HOST_URL + '/api';

  constructor(private client: HttpClient) { }

  private getHttpParams(data: Map<string, string>): HttpParams {
    let params: HttpParams = new HttpParams();

    data.forEach(
      (value: string, key: string) => {
        params = params.append(key, value);
      }
    );
    return params;
  }

  private handleErroraa(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T | HttpErrorResponse> => {
      console.log(error);
      let result: HttpErrorResponse;
      result = new HttpErrorResponse({ error });

      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred at ' + operation + ':', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // 空の結果を返して、アプリを持続可能にする
      return of(result);

    };
  }

  get<T>(path: string, data: Map<string, string> = new Map<string, string>()): Observable<T | HttpErrorResponse> {
    return this.client.get<T>(`${this.API_URL}${path}`, {
      params: this.getHttpParams(data)
    })
      .pipe(
        retry(3),
        catchError(this.handleError<T | HttpErrorResponse>('get'))
      );
  }

  post<T>(path: string, data: T): Observable<T | HttpErrorResponse> {

    return this.client.post<T>(`${this.API_URL}${path}`, data)
      .pipe(
        retry(3),
        catchError(this.handleError<T | HttpErrorResponse>('post'))
      );
  }

  put<T>(path: string, data: T): Observable<T | HttpErrorResponse> {

    return this.client.put<T>(`${this.API_URL}${path}`, data)
      .pipe(
        retry(3),
        catchError(this.handleError<T | HttpErrorResponse>('put'))
      );
  }

  delete<T>(path: string, data: string[]): Observable<T[] | HttpErrorResponse> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: new Array<string>(),
    };
    data.forEach(d => {
      options.body.push(d);
    });

    return this.client.delete<T[]>(`${this.API_URL}${path}`, options)
      .pipe(
        retry(3),
        catchError(this.handleError<T[] | HttpErrorResponse>('delete'))
      );
  }
}
