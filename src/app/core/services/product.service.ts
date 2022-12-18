import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  API_URL: string = 'http://localhost:5000/api/products';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) {}
  
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

  // search
  search(data: any): Observable<any> {
    const apiUrl = `${this.API_URL}/search`;
    return this.httpClient.post(apiUrl, data, this.httpOptions)
  }

  // getNew
  getNew(): Observable<any> {
    const apiUrl = `${this.API_URL}/get-new`;
    return this.httpClient.get(apiUrl)
  }

  // getBestSellers
  getBestSellers(): Observable<any> {
    const apiUrl = `${this.API_URL}/get-bestsellers`;
    return this.httpClient.get(apiUrl)
  }
  
  // getSales
  getSales(): Observable<any> {
    const apiUrl = `${this.API_URL}/get-sales`;
    return this.httpClient.get(apiUrl)
  }

  // create
  create(data: Product): Observable<any> {
    const apiUrl = `${this.API_URL}/`;
    return this.httpClient.post(apiUrl, data, this.httpOptions)
  }
  
  // update
  update(id: any, data: Product): Observable<any> {
    const apiUrl = `${this.API_URL}/${id}`;
    return this.httpClient.put(apiUrl, data, this.httpOptions)
  }
  // delete
  delete(id: any): Observable<any> {
    const apiUrl = `${this.API_URL}/${id}`;
    return this.httpClient.delete(apiUrl, this.httpOptions)
  }
 
  
}