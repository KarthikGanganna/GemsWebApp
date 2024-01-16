import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private userService: UserService, private router : Router) {
  }
  loggedin: boolean = false;

  ngOnInit() {
    this.loggedin = this.userService.getLoggedin();

    if (this.loggedin) {
      this.router.navigate(["/dashboard"]);
    }
    else {
      this.router.navigate(["/login"]);
    }
  }

}
