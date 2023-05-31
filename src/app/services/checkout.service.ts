import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCheckout, Checkout } from '../models/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  // Add New Checkout for User Checkout Service
  public addCheckout(checkout: AddCheckout): Observable<any>{
    return this.http.post<any>('http://www.shop-api.somee.com/ShopAPI/Checkout/AddCheckout', checkout);
  }
}
