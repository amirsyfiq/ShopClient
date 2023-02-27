import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{

  constructor(private authService: AuthService, private cartService: CartService, private router: Router, private _snackBar: MatSnackBar) {}

  carts: Array<Cart> | undefined;
  cartsSubcription: Subscription | undefined;

  isLogin: number | undefined;
  cartQuantity: number = 0;

  ngOnInit(): void {
    this.isLogin = this.authService.checkLogin();
    this.getAllItem();
  }

  // Get List of Items in Cart for User (Based on User ID)
  getAllItem(): void{
    if(this.isLogin){
      this.cartsSubcription = this.cartService.getAllItem(this.isLogin).subscribe((_carts) => {
        this.carts = _carts;
      });
    }
  }

  // Get Total Price of All Item in the Cart
  getTotal(carts: Array<Cart>): number{
    return carts.map((cart) => cart.total).reduce((prev, current) => prev + current, 0);
  }

  // Button Function to Increase Product Quantity in User Cart
  onIncreaseQuantity(id: number): void{
      if(this.cartService.increaseQuantity(id).subscribe()){
        // window.location.reload();
        this._snackBar.open('Cart has been updated!', 'OK', { duration: 3000});
      }
  }

  // Button Function to Increase Product Quantity in User Cart
  onDecreaseQuantity(id: number): void{
    if(this.cartService.decreaseQuantity(id).subscribe()){
      // window.location.reload();
      this._snackBar.open('Cart has been updated!', 'OK', { duration: 3000});
    }
  }

  // Button Function to Remove Specific Product from User Cart
  onRemoveItem(id: number): void{
    if (window.confirm('Are you sure you want to remove this product?')) {
      if(this.cartService.removeItem(id).subscribe()){
        window.location.reload();
        this._snackBar.open('Product has been removed!', 'OK', { duration: 3000});
      }
    }
  }

  // Button Function to Remove All Product from User Cart
  onRemoveAllItem(): void{
    if (window.confirm('Are you sure you want to clear your cart?')) {
      if(this.isLogin){
        if(this.cartService.removeAllItem(this.isLogin).subscribe()){
          window.location.reload();
          this._snackBar.open('All product has been removed!', 'OK', { duration: 3000});
        }
      }
    }
  }

  // Button Function to perform Checkout in User Cart
  onCheckout(): void{
    alert("Perform Checkout");
  }

  ngOnDestroy(): void {
    if(this.cartsSubcription){
      this.cartsSubcription.unsubscribe();
    }
  }
}
