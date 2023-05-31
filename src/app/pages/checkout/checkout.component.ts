import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private checkoutService: CheckoutService, private cartService: CartService, private router: Router, private _snackBar: MatSnackBar) {}

  checkouts: Array<Checkout> | undefined;
  checkoutsSubcription: Subscription | undefined;

  checkout = new Checkout();

  isLogin: boolean = false;
  cartQuantity: number = 0;

  ngOnInit(): void {
    this.isLogin = this.authService.checkLogin();
  }

  // Button Function to Add Checkout for User
  onAddCheckout(checkout: Checkout): void{
    let userId = this.authService.checkLogin();
    let address = checkout.address1 + ', ' + checkout.address1 + ', ' + checkout.city + ', ' + checkout.postalCode + ' ' + checkout.state;
    console.log(address);
    if(userId){
      let name = checkout.name, email = checkout.email;
      var addCheckoutObject = {name, email, address, userId};
      console.log(addCheckoutObject);
      // if(this.checkoutService.addCheckout(addCheckoutObject).subscribe()){
      //   window.location.reload();
      //   this._snackBar.open('Product successfully added into the cart!', 'OK', { duration: 3000});
      // }
    }
    else{
      window.alert("Please Login to proceed the Checkout!");
    }
  }

  ngOnDestroy(): void {

  }
}
