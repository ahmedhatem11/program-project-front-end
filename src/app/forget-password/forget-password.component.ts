import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(body: {username: string}) {
    this.userService.forgotPassword(body).then( (response) => {
      console.log(response);
      alert('Done. Please check your email');

    }).catch((err) => {
      console.log(err);
      alert('invalid username');
    });

  }

}
