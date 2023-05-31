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
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}

  products: Array<Product> | undefined; //Product Data
  productsSubscription: Subscription | undefined;
  category: Array<Category> | undefined; //Category Data
  categorySubscription: Subscription | undefined;
  categoryName: string | null = 'All Categories';

  // @ViewChild(PageHeaderComponent, {static : true}) pageChild! : PageHeaderComponent; //Link to Call Child Method
  @ViewChild(PageHeaderComponent) childComponent!: PageHeaderComponent; //Link to Call Child Method

  ngOnInit(): void {
    this.getCategoryList();
    this.categoryName = 'All Categories';
    this.getAllProduct();
  }

  // Get the List of Products Service
  getAllProduct(): void {
    this.productsSubscription = this.productService
      .getAllProduct()
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  // Button Function on Get List of Products
  onGetAllProduct(): void {
    this.categoryName = 'All Categories';
    this.getAllProduct();
  }

  // Get the List of Category Service
  getCategoryList(): void {
    this.categorySubscription = this.productService
      .getCategoryList()
      .subscribe((_category) => {
        this.category = _category;
      });
  }

  // Get the List of Products based on Category(ID) Service
  getCategory(id: number): void {
    this.products = undefined;
    this.productsSubscription = this.productService
      .getCategory(id)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  // Button Function to Get List of Products based on Category(ID)
  onGetCategory(id: number, name: string): void {
    this.categoryName = name;
    this.getCategory(id);
  }

  // Button Function to Add Products into User Cart
  onAddItem(productId: number): void {
    let userId = this.authService.checkLogin();

    if (userId) {
      if (this.cartService.addItem(productId).subscribe()) {
        // window.location.reload();
        this.childComponent.cartQuantity = 0;
        this.childComponent.getAllItem();
        this._snackBar.open('Product successfully added into the cart!', 'OK', {
          duration: 3000,
        });
      }
    } else {
      window.alert('Please Login to add product into your cart!');
    }
  }

  // Get the User Details(ID)
  getUser(): void {
    this.authService.getUser().subscribe((userId: string) => {
      window.alert(userId);
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
