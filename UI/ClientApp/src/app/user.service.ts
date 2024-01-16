import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loggedin: boolean = false;
  loggedinUser: string = "";
  token: string = "";

  private readonly url: string = "http://localhost:5276/api/";

  getLoginCheck(data: any): Observable<any> {
    return this.http.post<any>(this.url + "Login", data);
  }

  AddUser(data: any): Observable<any> {
    return this.http.post<any>(this.url + "User",data);
  }

  EditUser(data: any): Observable<any> {
    return this.http.put<any>(this.url + "User",data);
  }

  DeleteUser(data: any): Observable<any> {
    return this.http.delete<any>(this.url + "User"+"?&id="+data);
  }

  getDashboard(): Observable<any> {
    return this.http.get<any>(this.url + "User/GetDashboard");
  }

  getUser() {
    return this.http.get(this.url + "User");
  }

  setLoggedin(flag: boolean) {
    this.loggedin = flag;
  }
  getLoggedin() {
    return this.loggedin;
  }
  setLoggedinUser(flag: string) {
    this.loggedinUser = flag;
  }
  getLoggedinUser() {
    return this.loggedinUser;
  }
  setToken(flag: string) {
    this.token = flag;
  }
  getToken() {
    return this.token;
  }


}
