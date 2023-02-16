import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar){}

  isLogin: Boolean = false;

  ngOnInit(): void {
    this.isLogin = this.authService.checkLogin();
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('/login');
    this._snackBar.open('You have successfully logged out!', 'OK', { duration: 3000});
  }

  getUser(){
    this.authService.getUser().subscribe((userId: string) => {
      console.log(userId);
    });
  }
}
