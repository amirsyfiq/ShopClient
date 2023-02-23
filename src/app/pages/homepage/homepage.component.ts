import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService, private authService: AuthService, private cartService: CartService, private _snackBar: MatSnackBar) { }

  products: Array<Product> | undefined;
  productsSubscription: Subscription | undefined;
  category: Array<Category> | undefined;
  categorySubscription: Subscription | undefined;
  categoryName: string | null = 'All Categories';

  // @ViewChild(PageHeaderComponent, {static : true}) pageChild! : PageHeaderComponent;

  ngOnInit(): void {
    this.getCategoryList();

    if(localStorage.getItem('categoryId')){
      let id = Number(localStorage.getItem('categoryId'));
      this.categoryName = localStorage.getItem('categoryName');
      this.getCategory(id);
    }
    else{
      this.categoryName = 'All Categories';
      this.getAllProduct();
    }
  }

  // Get the List of Products
  getAllProduct(): void{
    this.productsSubscription = this.productService.getAllProduct().subscribe((_products) => {
      this.products = _products;
    });
  }

  // Button Function on Get List of Products
  onGetAllProduct(): void{
    localStorage.removeItem('categoryId');
    localStorage.removeItem('categoryName');
    window.location.reload();
  }

  // Get the List of Category
  getCategoryList(): void{
    this.categorySubscription = this.productService.getCategoryList().subscribe((_category) => {
      this.category = _category;
    });
  }

  // Get the List of Products based on Category(ID)
  getCategory(id: number): void{
    this.productsSubscription = this.productService.getCategory(id).subscribe((_products) => {
      this.products = _products;
    });
  }

  // Button Function to Get List of Products based on Category(ID)
  onGetCategory(id: number, name: string): void{
    localStorage.setItem('categoryId', id.toString());
    localStorage.setItem('categoryName', name);
    window.location.reload();
  }

  // Button Function to Add Products into User Cart
  onAddItem(productId: number): void{
    let userId = this.authService.checkLogin();
    if(userId){
      var addItemObject = {userId, productId};
      this.cartService.addItem(addItemObject).subscribe();
      window.location.reload();
      this._snackBar.open('Product successfully added into the cart!', 'OK', { duration: 3000});
    }
    else{
      window.alert("Please Login to add product into your cart!");
    }
  }

  // Get the User Details(ID)
  getUser(): void{
    this.authService.getUser().subscribe((userId: string) => {
      window.alert(userId);
    });
  }

  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }

    if(this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }

    localStorage.removeItem('categoryId');
    localStorage.removeItem('categoryName');
  }
}
