import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<any> {
    return this.http.post<any>('https://localhost:7009/ShopAPI/User/Register', user);
  }

  public login(user: User): Observable<string> {
    return this.http.post('https://localhost:7009/ShopAPI/User/Login', user, {responseType: 'text'});
  }

  // public login(user: User): Observable<any> {
  //   return this.http.post<any>('https://localhost:7009/ShopAPI/User/Login', user);
  // }

  public getUser(): Observable<string> {
    return this.http.get('https://localhost:7009/ShopAPI/User/GetUser', {responseType: 'text'});
  }

  public checkLogin(): Boolean{
    let isLogin;

    if(localStorage.getItem('authToken') === null)
      isLogin = false;
    else{
      isLogin = true;
    }

    return isLogin;
  }
}
