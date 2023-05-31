import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  user = new User();

  ngOnInit(): void {}

  // Login the User
  login(user: User): void {
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);

      if (token) {
        this.router.navigateByUrl('/homepage').then(() => {
          // window.location.reload();
        });

        this._snackBar.open('You have successfully logged in!', 'OK', {
          duration: 3000,
        });
      }
    });
  }
}
