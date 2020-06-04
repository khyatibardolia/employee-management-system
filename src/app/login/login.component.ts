import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = false;
  constructor(private formBuilder: FormBuilder,
              private route: Router,
              private router: ActivatedRoute,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loginService.getLoginUserInfo();
  }

  get getFormControls() {
    return this.loginForm.controls;
  }
  onLogin() {
    this.submitted = true;
    console.log(this.loginForm.value.email, this.loginForm.value.password);
    this.loginService.onEmployeeLogin(this.loginForm.value.email, this.loginForm.value.password);
    console.log('values-->>', this.loginForm.value.email);
  }
  onCancel() {
    this.loginForm.reset();
  }

}
