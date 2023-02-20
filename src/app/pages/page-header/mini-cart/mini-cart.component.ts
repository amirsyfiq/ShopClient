import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css']
})
export class MiniCartComponent implements OnInit, OnDestroy {

  constructor() {}

  @Input() carts: Cart[] | undefined;
  @Input() cartQuantity: number | undefined;

  ngOnInit(): void {

  }

  // Get Total Price of All Item in the Cart
  getTotal(carts: Array<Cart>): number{
    return carts.map((cart) => cart.total).reduce((prev, current) => prev + current, 0);
  }

  ngOnDestroy(): void {

  }
}
