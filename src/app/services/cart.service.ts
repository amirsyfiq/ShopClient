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

  // Add Product into User Cart Service (Based on User ID & Product ID)
  public addItem(request: AddCart): Observable<any>{
    return this.http.post<any>('https://localhost:7009/ShopAPI/Cart/AddItem', request);
  }

  // Increase Product Quantity in User Cart Service (Based on Cart ID)
  public increaseQuantity(id: number): Observable<any>{
    return this.http.put<any>('https://localhost:7009/ShopAPI/Cart/IncreaseQuantity', id);
  }

  // Decrease Product Quantity in User Cart Service (Based on Cart ID)
  public decreaseQuantity(id: number): Observable<Cart>{
    console.log(id);
    return this.http.put<Cart>('https://localhost:7009/ShopAPI/Cart/DecreaseQuantity', id);
  }

  // Remove Specific Product in User Cart Service (Based on Cart ID)
  public removeItem(id: number): Observable<any>{
    return this.http.delete<any>(`https://localhost:7009/ShopAPI/Cart/RemoveItem/${id}`);
  }

  // Remove All Product in User Cart Service (Based on User ID)
  public removeAllItem(id: number): Observable<any>{
    return this.http.delete<any>(`https://localhost:7009/ShopAPI/Cart/RemoveAllItem/${id}`);
  }
}
