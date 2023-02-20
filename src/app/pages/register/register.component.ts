import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) {}

  user = new User();

  // Register new User
  register(user: User){
    this.authService.register(user).subscribe();
  }

  // Get the User Details(ID)
  getUser(){
    this.authService.getUser().subscribe((userId: string) => {
      console.log(userId);
    })
  }
}
