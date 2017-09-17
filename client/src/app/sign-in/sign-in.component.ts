import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService]
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  
  ngOnInit() {
  }

  signIn() {
    this.userService.login(this.username, this.password)
      .subscribe(
        user => {
          this.router.navigateByUrl('/');
        },
        err => {
          console.log(err);
        }
      )
  }
  
}
