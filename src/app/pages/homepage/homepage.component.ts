import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
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
  productsSubscription: Subscription | undefined;
  category: Array<Category> | undefined;
  categorySubscription: Subscription | undefined;
  categoryName: string | null = 'ALL CATEGORIES';

  ngOnInit(): void {
    this.getCategoryList();

    if(localStorage.getItem('categoryId')){
      let id = Number(localStorage.getItem('categoryId'));
      this.categoryName = localStorage.getItem('categoryName');
      this.getCategory(id);
    }
    else{
      this.categoryName = 'ALL CATEGORIES';
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

  // Button Function on Get List of Products based on Category(ID)
  onGetCategory(id: number, name: string): void{
    localStorage.setItem('categoryId', id.toString());
    localStorage.setItem('categoryName', name);
    window.location.reload();
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
  }
}
