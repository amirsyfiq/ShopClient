import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // Get List of Items in Cart Service for User (Based on User ID)
  public getAllItem(): Observable<Array<Cart>>{
    return this.http.get<Array<Cart>>(`http://www.shop-api.somee.com/ShopAPI/Cart/GetAllItem`);
  }

  // Add Product into User Cart Service (Based on User ID & Product ID)
  public addItem(productId: number): Observable<any>{
    return this.http.post<any>(`http://www.shop-api.somee.com/ShopAPI/Cart/AddItem?productId=${productId}`, productId);
  }

  // Increase Product Quantity in User Cart Service (Based on Cart ID)
  public increaseQuantity(cartId: number): Observable<Cart>{
    return this.http.put<Cart>(`http://www.shop-api.somee.com/ShopAPI/Cart/IncreaseQuantity?cartId=${cartId}`, cartId);
  }

  // Decrease Product Quantity in User Cart Service (Based on Cart ID)
  public decreaseQuantity(cartId: number): Observable<Cart>{
    return this.http.put<Cart>(`http://www.shop-api.somee.com/ShopAPI/Cart/DecreaseQuantity?cartId=${cartId}`, cartId);
  }

  // Remove Specific Product in User Cart Service (Based on Cart ID)
  public removeItem(cartId: number): Observable<any>{
    return this.http.delete<any>(`http://www.shop-api.somee.com/ShopAPI/Cart/RemoveItem?cartId=${cartId}`);
  }

  // Remove All Product in User Cart Service (Based on User ID)
  public removeAllItem(): Observable<any>{
    return this.http.delete<any>(`http://www.shop-api.somee.com/ShopAPI/Cart/RemoveAllItem`);
  }
}
