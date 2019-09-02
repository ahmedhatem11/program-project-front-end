import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  user: unknown;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(credentials: {username: string, password: string }) {

    this.userService.login(credentials).then( (response) => {
      this.user = response;

      // @ts-ignore
      const role = this.user.role;
      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }

    }).catch((err) => {
      console.log(err);
    });
  }

}
