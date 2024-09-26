import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from './models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = "http://localhost:8089/api/v1/customers";
  

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer> {
    return this.http.get<any>(this.url);
  }

  addCustomer(body: any): Observable<any> {
    return this.http.post(this.url, body);
  }

  updateCustomer(body: any, id: number): Observable<any> {
    return this.http.patch(this.url+`/id/${id}`, body);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.url+`/id/${id}`);
  }

  getCustomerById(id: string): Observable<Customer> {
    console.log(this.url+`/id/${id}`);
    return this.http.get<any>(this.url+`/id/search?id=${id}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          alert(`Customer with ID ${id} not found`);
        }
        return throwError(error);
      })
    );
  }

  getCustomersByCity(city: string): Observable<Customer> {
    console.log(this.url+`/${city}`);
    return this.http.get<any>(this.url+`/city/search?city=${city}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          alert(`No Customer with city ${city} found`);
        }
        return throwError(error);
      })
    );
  }
}
