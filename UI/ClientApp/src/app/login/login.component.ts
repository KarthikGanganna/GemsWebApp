import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, public sanitizer: DomSanitizer) {
  }

  userName: string = ""; 
  password: string = "";
  loginStatus: boolean = false;
  logindetails: any;

  //sampleImage =    'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png';

  sampleImage = "data:image/svg+xml+png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBAwUEAv/EAD0QAAEDAwEFBQUFBQkAAAAAAAEAAgMEBREGBxIhMUETUWFxkSIyQoGhFBVSscEjU5Ki0SQzNENiY3KC8f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC8UREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEWCcIM8lrnnip4nzTysiiYMue9wa1o7ySodrXX9PYqllptdO653+fAhoouO6e95HLvxz8ua4dLs9vGqnsrtol1kkGd5lro3bkMfg4jn8uPig6152saTtchhjrJK+cco6JnaZPdngPqvDHtLvNY4/dmgr1Kz4Xzjss+ox9VNrPp+02SIR2q301K0fu4wD6810seKCuJNoWpaZu9V7Prru/wCzJvn0DSvuj2w6dfP9nu1PcbRPnBZWU+PqM/XCsTC89ZQ0tfEYa2nhqIz8MrA4fVBrtd1t92p/tFsraeqh/HDIHAeeOS9qrm67K6OGqNz0fWz2K5NHDsXEwv8ABze7y4eC1WPX9xs1zjsO0OlZRVjyG09wiH7Co6ZJ5Dpx5d4CCy0Xy1wc0OaQQeRB5r6QEREBERAREQEREBERAUE2h6urLfPT6e0zGKnUNf7jQeFOz8bu75+ak+przT6esdZdavjHTRF+6DxeejR4k4Ch+ymwVHY1Grb4zevN4Jky4cYYfhYO7IA+QA6IOxoXRNHpWmdI95rLrOd6qrpRl7yegJ5N/NSxEQEWMhQS+7TrTb7k622qkrL3XsO6+KgZviM5xgu789yCeIq4j2rQUtRHFqTT92s0byAKiohJjBJ6ngrBpKqnrKWOppJmTQSt3mSRuy1w7wUG5cvUVht2obXLb7rTtmgkGOPNh/E09CF1EQVXpm61+gb9DpTUk7p7RUEi13KQ9Sf7tx6cTj06K01wNcaXpdW2CotlU1oeRv08pHGKQcnfofAlcfZVqKpu9mlt13DmXi1SGmqmvPF2OT/ny+SCcIiICIiAiIgIiICFFg8kFZ7Uu0v+pdNaQjJ7CpnNVXAdYmdPn7XzwrKiY1jGtYAGtGAB0CrexkXLbZfqh4OLbQxwMJ5Auwf1PorLHJAREQQfa/fKuzaU7K2vLK641DKOBw+Euzk+gI+a7GjNKW/SdnhoKCJokDQZ5se1K/qSfyHRR7bXbamr0rDcKFnaT2mrjrNz8TW5B9Mg/IqXadvdFqC0U9zt0gfBO3PPi09WnxBQeqvoaa4UklJXQRz08rS18cjchwVc7PO00vre9aJ7Rz7e2MVtvDjksYSN5ufN30PerMlkbHG6R7g1jAS5xOAB3qsNESjVG0++aopcm2U1OKCmkxwlPAkjw4H+IILSREQFWF3Y7TG2G2XKL2aG/wAJpqkDl2rfdPn7n1Vnqt9uLOw0xRXVrSZLdcIZQRzAzg/ogscLK1wP7SFkg5OaHeq2ICIiAiIgIiICIsHkgrbQXDahrxrvfMlOR5Yd/UKygq1twFq233ONw3W3a3Nlac8C5mAfyVlBARFgnCDDw1zS12CDzBVMaktlk0pdpqnS2uILBO45ntw/bRE/8ATu/MH5Lq3m73nX2oKnT+l6p1DZaN25cLmz3pHdY4z/AOcu7nKNP7OdLWGFraW1Qyy49qepHaPd68B8sIKyiq4NVzspdS7Tqc0G8N+lp4zTibwLnYGPPKuix2+3Wm1U9HaIooqKNv7MRHIOeOc9c88rxXPRunLrTugrrNRvYRjLYgxw8nNwQoBcrXdtlU33pYZZq/TG9/a7dId51OCeL2Hu/rx55AW6i8lruFNdLfT11DIJaeoYHxvHUFetAUA25kDZrcw7mZIcefaNU/VbbbXfa7NaLI1pc+43KKPdB47ozlBPrQCLVRh3vCBgPnuhetfETQyNrByaAAvtAREQEREBERAQoiCtdrsE1qq7DrCkaSbTVbtSGjnC8gH9R/2ViUdRHV0sVRA8PilYHscOoPELTd7dT3a2VNvrGb9PUxOjkHgRj1VebM7pUaeudRoK/P3Z6PL7fO88KiEnIAPeM8vMdEFnqL7TLvJZNEXatgeWT9gY4nD4XP8AZB8xnKk4IK5uorHQ6itclsukb5KWQtLmseWnIORxHkg5Wzawxae0bbaKMZkdH2sz+rnv9o+mcDwAUoXxDG2GJkUYwxgDWjuAX2gLVUQRVML4Z2CSKRpa9juTgeBC2ogrTY6JLTPqHSz5XSMtdaTAXcxG8Zx9M+ZKstcm3aft9uvFwutLE9tXcN37Q4vJB3RgYHRdbIQYyqwGdWbY2PjO/b9NwEOcBwdUOyMfLP8AL4qRbSNWt0tZc0re2utW7saKnaMuc8/FjuH54HVfWzXSztK6dZBVO37jUuM9bIXbxMh5jPXH9UErCyiICIiAiIgIiICIiAohtC0bHqmiilpZvsl3o3b9FVtOCw/hJHQnHkpeiCAaH14+tqzYNUxfd+oYPZdHJhranh7zPE93op8DlRzWOjLTq6lay4xFlRGP2FXFwlhPPge7wKiEVw11oTMN0pHakszB7FXT/wCIjYPxDr9fNBaaKG2LabpS9NAiubaaf4oKsdk5vrwPyJUrgrKapAdT1EUoPLs3goN6LXJLHEMyvYwd7jhcG8a40zZmOdX3mlYR8DHdo70bkoJCSo3rTWds0lQdrWO7WrlGKekjOZJneA6DOOKicuvNRarzT6CscrYX+z953ABkbPEDr9fJdjSGzymtNd99Xyqfd76/DnVU/ERn/QOnn6YQeDRGl7lcrydZaybm5SDFFRH3aNnTh+LH5558rIWByWUBERAREQEREBERAREQEREBYKyiDh3nSOn724vudopJ5DzlMYD/AOIcVGJtjekXvLoYKynJ/c1TgB6qw0QVyNjOlf8AONxmHc+rOF3LVs70nayHU1jpHPbyfM3tD/NlSpEGGtDQAOACyiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg//2Q==";

  sizes = 24;

  ngOnInit() {
    this.userName = "";
    this.password = "";

    //this.LoginCheck();
  }

  LoginCheck() {

    this.logindetails = {
      UserName: this.userName,
      Password: this.password
    };

    this.userService.getLoginCheck(this.logindetails).subscribe((data: any) => {
      this.loginStatus = data.islogin;
      if (this.loginStatus == true) {
        this.userService.setLoggedin(true);
        this.userService.setLoggedinUser(this.userName);
        this.userService.setToken(data.token);
        this.router.navigate(["/dashboard"]);
      }
      else {
        this.router.navigate(["/login"]);
      }
    });



  }

}
