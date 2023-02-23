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
    return this.http.post<any>('https://localhost:7009/ShopAPI/User/Register', user);
  }

  // Login Service for User
  public login(user: User): Observable<string> {
    return this.http.post('https://localhost:7009/ShopAPI/User/Login', user, {responseType: 'text'});
  }

  // Perform Logout for User
  public logout(): void{
    localStorage.clear();
  }

  // Get User Details(ID) for User
  public getUser(): Observable<string> {
    return this.http.get('https://localhost:7009/ShopAPI/User/GetUser', {responseType: 'text'});
  }

  // Check Login Status for User
  public checkLogin(): number | undefined{
    let loginID;

    if(localStorage.getItem('authToken') && localStorage.getItem('userId')){
      loginID = Number(localStorage.getItem('userId'));
    }

    return loginID;
  }
}
