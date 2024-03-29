import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root',
})

export class PaymentService {
  API_URL: string = 'http://localhost:5000/api/payments';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  
  constructor(private httpClient: HttpClient) {}
  
  // checkout
  checkout(data: any): Observable<any> {
    const apiUrl = `${this.API_URL}/checkout`;
    return this.httpClient.post(apiUrl, data, this.httpOptions)
  }

  // callback
  callback() {
    const apiUrl = `${this.API_URL}/vnpay/callback`;
    return this.httpClient.get(apiUrl)
  }

  // get
  get() {
    const apiUrl = `${this.API_URL}/`;
    return this.httpClient.get(apiUrl);
  }

  // get by id
  getById(id: any): Observable<any> {
    const apiUrl = `${this.API_URL}/${id}`;
    return this.httpClient.get(apiUrl);
  }

  // create
  create(data: Payment): Observable<any> {
    const apiUrl = `${this.API_URL}/`;
    return this.httpClient.post(apiUrl, data, this.httpOptions)
  }
  
  // update
  update(id: any, data: Payment): Observable<any> {
    const apiUrl = `${this.API_URL}/${id}`;
    return this.httpClient.put(apiUrl, data, this.httpOptions)
  }
  // delete
  delete(id: any): Observable<any> {
    const apiUrl = `${this.API_URL}/${id}`;
    return this.httpClient.delete(apiUrl, this.httpOptions)
  }
 
  
}