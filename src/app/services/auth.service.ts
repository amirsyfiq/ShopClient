import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Register Service for User
  public register(user: User): Observable<any> {
    return this.http.post<any>('http://www.shop-api.somee.com/ShopAPI/User/Register', user);
  }

  // Login Service for User
  public login(user: User): Observable<string> {
    return this.http.post('http://www.shop-api.somee.com/ShopAPI/User/Login', user, {responseType: 'text'});
  }

  // Perform Logout for User
  public logout(): void{
    localStorage.clear();
  }

  // Get User Details(ID) for User
  public getUser(): Observable<string> {
    return this.http.get('http://www.shop-api.somee.com/ShopAPI/User/GetUser', {responseType: 'text'});
  }

  // Check Login Status for User
  public checkLogin(): boolean{
    let isLogin: boolean = false;

    if(localStorage.getItem('authToken')){
      isLogin = true
    }

    return isLogin;
  }
}
