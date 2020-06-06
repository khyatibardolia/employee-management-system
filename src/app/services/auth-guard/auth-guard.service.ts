import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    console.log('token-->>', this.authService.authToken);
    // check some condition
    if (!this.authService.authToken) {
      alert('You are not allowed to view this page');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
