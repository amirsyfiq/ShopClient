import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {}

  user = new User();

  // Register new User
  register(user: User){
    this.authService.register(user).subscribe();
    this.router.navigateByUrl('/login');
    this._snackBar.open('Registration Successful! Please Login into Your Account.', 'OK', { duration: 3000});
  }

  // Get the User Details(ID)
  getUser(){
    this.authService.getUser().subscribe((userId: string) => {
      console.log(userId);
    })
  }
}
