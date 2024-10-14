import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './models/Customer';
import { catchError, Observable, throwError } from 'rxjs';
import { Account } from './models/Account';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = "https://bank-render.onrender.com/api/v1/accounts";

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account> {
    return this.http.get<any>(this.url);
  }

  addAccount(body: any): Observable<any> {
    return this.http.post(this.url, body);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(this.url+`/id/${id}`)
  }

  getAccountById(id: string): Observable<Account> {
    return this.http.get<any>(this.url+`/id/search?id=${id}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          alert(`Account with ID ${id} not found`);
        }
        return throwError(error);
      })
    )
  }

  getAccountsByCity(city: string): Observable<Account> {
    console.log(this.url+`/${city}`);
    return this.http.get<any>(this.url+`/city/search?city=${city}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          alert(`No accounts with Customer City ${city} found`);
        }
        return throwError(error);
      })
    );
  }

  transaction(body: any, id: number): Observable<any> {
    console.log(this.url+`/${body.type}/${id}/${body.amount}`);
    return this.http.patch(this.url+`/${body.type}/${id}/${body.amount}`, body);
  }

  transferFrom(body: any): Observable<any> {
    return this.http.patch(this.url+`/withdraw/${body.fromAccountId}/${body.amount}`, body);
  }

  transferTo(body: any): Observable<any> {
    return this.http.patch(this.url+`/deposit/${body.toAccountId}/${body.amount}`, body);
  }
}
