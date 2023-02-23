import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar, private cartService: CartService){}

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
    let id = Number(localStorage.getItem('userId'));

    if(id){
      this.cartsSubcription = this.cartService.getAllItem(id).subscribe((_carts) => {
        this.carts = _carts;
        for(let cart of _carts){
          this.cartQuantity = this.cartQuantity + cart.quantity;
        }
      });
    }
  }

  // Logout the User
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this._snackBar.open('You have successfully logged out!', 'OK', { duration: 3000});
  }

  // Get the User Details(ID)
  getUser(): any {
    this.authService.getUser().subscribe((userId: string) => {
      return userId;
    });
  }

  ngOnDestroy(): void {
    if(this.cartsSubcription){
      this.cartsSubcription.unsubscribe();
    }
  }
}
