import {ActivatedRoute, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {
  constructor( private route: Router,
               private router: ActivatedRoute) {}

  getLoginUserInfo() {
   return localStorage.setItem('employees' , JSON.stringify({email: 'admin@gmail.com', password: '123456'}));
  }

  onEmployeeLogin(email: string, password: string) {
    const emp = JSON.parse(localStorage.getItem('employees'));
    if (email === emp.email && password === emp.password) {
      this.route.navigate(['employees'], {relativeTo: this.router, queryParams: {currentPage: 1}});
    } else {
      console.log('login failed!');
    }
  }
}
