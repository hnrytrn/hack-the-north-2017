import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService]
})
export class SignInComponent implements OnInit {
  username: String;
  password: String;
  constructor(userService: UserService){ 

  }
  ngOnInit() {
  }

  signIn() {
    userService.login(this.username, this.password)
      .subscribe(
        user => 
      )
    }
}
