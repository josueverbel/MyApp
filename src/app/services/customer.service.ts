import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private rutabase = 'https://cors-anywhere.herokuapp.com/' + 'http://apiprueba.trend2.net/api/customers';
  private rutaTrip = 'https://cors-anywhere.herokuapp.com/' + 'http://apiprueba.trend2.net/api/trips';
  constructor(private http: HttpClient) {

   }


  public get(): Observable<any> {
    return this.http
      .get(this.rutabase, {headers : {
        Accept: 'application/json',
        rejectUnauthorized: 'false',
        'Content-Type': 'application/json',
        requestCert: 'false',
        insecure: 'true'

      }})
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  public getByPhone(phone): Observable<any> {
    return this.http
      .get(this.rutabase + '/phone/' + phone)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  public getById(id): Observable<any> {
    return this.http
      .get(this.rutabase + '/' + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  public store(data): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
   
    let options = { headers: headers, withCredentials: false };
    return this.http
      .post(this.rutabase, data, {headers})
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  public storeTrip(data): Observable<any> {
    return this.http
      .post(this.rutaTrip, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  
}
