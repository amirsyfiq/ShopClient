import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCart, Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // Get List of Items in Cart Service for User (Based on User ID)
  public getAllItem(id: number): Observable<Array<Cart>>{
    return this.http.get<Array<Cart>>(`https://localhost:7009/ShopAPI/Cart/GetAllItem/${id}`);
  }

  // Get List of Items in Cart Service for User (Based on User ID)
  public addItem(request: AddCart): Observable<any>{
    return this.http.post<any>('https://localhost:7009/ShopAPI/Cart/AddItem', request);
  }
}
