import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from '../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/index';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router){}
  isLoginMode = true;
  isLoading = false;

  ngOnInit() {
    console.log('route-->', this.router.url);
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if(this.isLoginMode) {
      // login code
      authObs = this.authService.onLogin(email, password);
      this.authService.onLogin(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
      this.authService.signUp(email, password);
      console.log(form.value);
    }
    authObs.subscribe(
      (response) => {
        console.log('response-->>', response);
        this.isLoading = false;
        this.router.navigate(['/employees']);
      }, errorMessage => {
        console.log('errorMessage', errorMessage);
        this.toastr.error(errorMessage, '');
        this.isLoading = false;
      });
    form.reset();
  }
}
