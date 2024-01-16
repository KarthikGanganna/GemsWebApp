import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private route: Router, public sanitizer: DomSanitizer) { }

  loggedin: boolean = false;
  isView: boolean = false;
  isAdd: boolean = false;
  isdashboard: boolean = true;
  dashboardData: any;
  userData: any;
  view: string = "";
  loggedinUser: string = "";
  user: User = new User() ;
  sampleImage = "data:image/svg+xml+png;base64,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";


  ngOnInit() {

    this.loggedin = this.userService.getLoggedin();
    this.loggedinUser = this.userService.getLoggedinUser();


    if (this.loggedin == false) {
      this.route.navigate(["/login"]);
    }
    this.view = "View";
    this.dashboard();
  }

  Add() {
    this.view = "Add";
    this.user = new User();

  }

  Edit(data: any) {
    this.view = "Edit";
    this.user = data;

  }

  Delete(data: any) {



  }

  dashboard() {
    this.userService.getDashboard().subscribe((data: any) => {
      this.dashboardData = data;
      this.isdashboard = true;
    });
  }

  userManage() {
    this.isdashboard = false;
    this.userService.getUser().subscribe((data: any) => {
      this.userData = data;
      this.view = "View";
      //this.isdashboard = false;
    });
  }

  AddUser() {
    this.userService.AddUser(this.user).subscribe((data: any) => {
      //this.userData = data;
     var Status = data;
      if (Status == true) {
        this.view = "View";
        this.userManage();
      }
    });
  }

  EditUser() {
    this.userService.EditUser(this.user).subscribe((data: any) => {
      //this.userData = data;
      var Status = data;
      if (Status == true) {
        this.view = "View";
        this.userManage();
      }
    });
  }

 DeleteUser(i: User) {
   this.userService.DeleteUser(i.id).subscribe((data: any) => {
     //this.userData = data;
     var Status = data;
     if (Status == true) {
       this.view = "View";
       this.userManage();
     }
   });

  }

}

export class User {
  id: number = 0;
  username: string = "";
  emailId: string = "";
  firstName: string = "";
  lastName: string= "";
  customer: string = "";
  roles: Array<string> = [];
  trialUser: boolean = false;
}
