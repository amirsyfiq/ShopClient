import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  user = new User();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {

  }

  login(user: User){
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this.router.navigateByUrl('/homepage');
      this._snackBar.open('Logged in successfull!', 'OK', { duration: 3000});
    });
  }
}
