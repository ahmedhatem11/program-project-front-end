import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  resetPassword(body: {username: string, oldPassword: string, newPassword: string}) {
    this.userService.resetPassword(body).then( (response) => {
      console.log(response);
      alert('Password changed successfully');

    }).catch((err) => {
      console.log(err);
      alert('A problem happened while changing password');
    });

  }

}
