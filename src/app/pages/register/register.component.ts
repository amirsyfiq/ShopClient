import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = new User();

  constructor(private authService: AuthService) {}

  register(user: User){
    this.authService.register(user).subscribe();
  }

  getUser(){
    this.authService.getUser().subscribe((userId: string) => {
      console.log(userId);
    })
  }

}
