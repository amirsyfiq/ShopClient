import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService, private authService: AuthService) { }

  products: Array<Product> | undefined;
  productsSubcription: Subscription | undefined;

  ngOnInit(): void {
      this.getAllProduct();
  }

  // Get the List of Products
  getAllProduct(): void{
    this.productsSubcription = this.productService.getAllProduct().subscribe((_products) => {
      this.products = _products;
    });
  }

  // Get the User Details(ID)
  getUser(): void{
    this.authService.getUser().subscribe((userId: string) => {
      window.alert(userId);
    });
  }

  ngOnDestroy(): void {
    if(this.productsSubcription){
      this.productsSubcription.unsubscribe();
    }
  }
}
